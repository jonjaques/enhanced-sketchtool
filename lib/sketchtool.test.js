jest.mock('child_process')
const childProcess = jest.requireMock('child_process')

const {
  sketchApp,
  sketchtoolSync,
  sketchtool,
  getChildProcess
} = require('./sketchtool')

describe('const sketchApp: string', () => {
  it('should export a valid path', () => {
    expect(sketchApp).toBeDefined()
    expect(typeof sketchApp).toBe('string')
    expect(sketchApp).toBe('/sketchtool_lib')
  })
})

describe('function sketchtoolSync(): ChildProcessResult', () => {
  it('should export a valid function', () => {
    expect(sketchtoolSync).toBeDefined()
    expect(typeof sketchtoolSync).toBe('function')
  })

  it('should call spawnSync() with the right options', () => {
    sketchtoolSync(['help'])
    const binPath = '/sketchtool_lib/Contents/Resources/sketchtool/bin/sketchtool'
    expect(childProcess.spawnSync).toHaveBeenCalled()
    expect(childProcess.spawnSync).toHaveBeenCalledWith(
      binPath,
      ['help'],
      { stdio: 'pipe' }
    )
  })

  it('should return a process like object', () => {
    const result = sketchtoolSync(['help'])
    expect(result.status).toBe(0)
    expect(result.stdout).toBe('<stdout>')
    expect(result.stderr).toBe('<stderr>')
  })
})

describe(`function sketchtool(): 
Promise<ChildProcessResult> | callback<ChildProcessResult>
`, () => {
  it('should export a valid function', () => {
    expect(sketchtool).toBeDefined()
    expect(typeof sketchtoolSync).toBe('function')
  })

  describe('if called in the Promise form', () => {
    it('should return a promise like object', () => {
      const result = sketchtool(['help'])
      expect(result.then).toBeDefined()
    })
  })
})

describe('function getChildProcess(): spawn | spawnSync', () => {
  it('should export a valid function', () => {
    expect(getChildProcess).toBeDefined()
    expect(typeof getChildProcess).toBe('function')
  })

// it('should return a process like object', () => {
// const run = getChildProcess()
// expect(run.status).toBe(0)
// expect(run.stdout).toBe('<stdout>')
// expect(run.stderr).toBe('<stderr>')
// })
})
