# SatelliteTleData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module SatelliteTleDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      SatelliteTleDataBaseFeature.new
    when "ratelimit"
      SatelliteTleDataRatelimitFeature.new
    when "retry"
      SatelliteTleDataRetryFeature.new
    when "test"
      SatelliteTleDataTestFeature.new
    when "timeout"
      SatelliteTleDataTimeoutFeature.new
    else
      SatelliteTleDataBaseFeature.new
    end
  end
end
