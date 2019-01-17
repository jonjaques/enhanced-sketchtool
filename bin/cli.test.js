import './cli'
import { sketchtoolSync } from '../index'

jest.mock('../index')

// const args = process.argv.slice(2)

describe('cli', () => {
  it('should call the sync api', () => {
    expect(sketchtoolSync).toHaveBeenCalledTimes(1)
  })
})
