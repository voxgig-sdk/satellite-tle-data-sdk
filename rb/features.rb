# SatelliteTleData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module SatelliteTleDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      SatelliteTleDataBaseFeature.new
    when "test"
      SatelliteTleDataTestFeature.new
    else
      SatelliteTleDataBaseFeature.new
    end
  end
end
