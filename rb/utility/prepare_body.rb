# SatelliteTleData SDK utility: prepare_body
require_relative 'media'
module SatelliteTleDataUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return SatelliteTleDataUtilities.raw_body(ctx.reqdata) if SatelliteTleDataUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
