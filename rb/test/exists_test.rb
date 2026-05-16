# SatelliteTleData SDK exists test

require "minitest/autorun"
require_relative "../SatelliteTleData_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = SatelliteTleDataSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
