
import { Context } from './Context'


class SatelliteTleDataError extends Error {

  isSatelliteTleDataError = true

  sdk = 'SatelliteTleData'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  SatelliteTleDataError
}

