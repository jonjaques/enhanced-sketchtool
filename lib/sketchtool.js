import { execSync, spawn, spawnSync } from 'child_process'
import Path from 'path'

const finderCmd = "mdfind kMDItemCFBundleIdentifier == 'com.bohemiancoding.sketch3' | head -n 1"
export const sketchApp = execSync(finderCmd)
  .toString('utf8')
  .trim()

const bin = Path.join(sketchApp, 'Contents/Resources/sketchtool/bin/sketchtool')

export function sketchtoolSync (args, opts) {
  const format = 'utf8'
  const proc = getChildProcess(args, opts, true)

  const result = {
    status: proc.status,
    stdout: proc.stdout && proc.stdout.toString(format),
    stderr: proc.stderr && proc.stderr.toString(format)
  }

  if (proc.status !== 0) {
    const error = new Error(`sketchtool process exited with code ${proc.status}`)
    Object.assign(error, result)
    throw error
  }

  return result
}

export function sketchtool (args, opts, cb) {
  const format = 'utf8'
  const proc = getChildProcess(args, opts)
  let buffer = ''
  let errBuffer = ''

  if (cb) {
    return processResult(null, null, cb)
  }

  return new Promise(processResult)

  function processResult (resolve, reject, callbackFn) {
    proc.stdout.on('data', (data) => {
      if (data) {
        buffer += data.toString(format)
      }
    })

    proc.stderr.on('data', (data) => {
      if (data) {
        errBuffer += data.toString(format)
      }
    })

    proc.on('close', (code) => {
      let error = null

      if (code !== 0) {
        error = new Error(`sketchtool process exited with code ${code}`)
      }

      let result = {
        code,
        stdout: buffer,
        stderr: errBuffer
      }

      console.log(error, result)
      if (callbackFn) {
        return callbackFn(error, result)
      }

      if (error) {
        return reject({ ...result, error })
      }

      return resolve(result)
    })
  }
}

export function getChildProcess (args, opts = {}, sync = false) {
  const proc = sync ? spawnSync : spawn
  const o = { stdio: 'pipe', ...opts }

  if (!sync) {
    o.detached = true
  }

  const p = proc(bin, args, o)

  if (!sync) {
    p.unref()
  }

  return p
}
