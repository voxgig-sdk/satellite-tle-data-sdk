-- SatelliteTleData SDK error

local SatelliteTleDataError = {}
SatelliteTleDataError.__index = SatelliteTleDataError


function SatelliteTleDataError.new(code, msg, ctx)
  local self = setmetatable({}, SatelliteTleDataError)
  self.is_sdk_error = true
  self.sdk = "SatelliteTleData"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function SatelliteTleDataError:error()
  return self.msg
end


function SatelliteTleDataError:__tostring()
  return self.msg
end


return SatelliteTleDataError
