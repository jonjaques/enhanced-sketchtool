
const c = {
  execSync: jest.fn(),
  spawnSync: jest.fn(),
  spawn: jest.fn()
}

c.execSync.mockReturnValue(Buffer.from('/sketchtool_lib'))

c.spawnSync.mockReturnValue({
  status: 0,
  stdout: Buffer.from('<stdout>'),
  stderr: Buffer.from('<stderr>')
})

c.spawn.mockImplementation((...spawnArgs) => {
  const stdout = Buffer.from('<stdout>')
  const stderr = Buffer.from('<stderr>')
  stdout.on = jest.fn()
  stderr.on = jest.fn()

  return {
    status: 0,
    stdout,
    stderr,
    unref: jest.fn(),
    on: jest.fn()
  }
})

module.exports = c
