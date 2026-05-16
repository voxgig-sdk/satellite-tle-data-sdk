# SatelliteTleData SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

SatelliteTleDataUtility.registrar = ->(u) {
  u.clean = SatelliteTleDataUtilities::Clean
  u.done = SatelliteTleDataUtilities::Done
  u.make_error = SatelliteTleDataUtilities::MakeError
  u.feature_add = SatelliteTleDataUtilities::FeatureAdd
  u.feature_hook = SatelliteTleDataUtilities::FeatureHook
  u.feature_init = SatelliteTleDataUtilities::FeatureInit
  u.fetcher = SatelliteTleDataUtilities::Fetcher
  u.make_fetch_def = SatelliteTleDataUtilities::MakeFetchDef
  u.make_context = SatelliteTleDataUtilities::MakeContext
  u.make_options = SatelliteTleDataUtilities::MakeOptions
  u.make_request = SatelliteTleDataUtilities::MakeRequest
  u.make_response = SatelliteTleDataUtilities::MakeResponse
  u.make_result = SatelliteTleDataUtilities::MakeResult
  u.make_point = SatelliteTleDataUtilities::MakePoint
  u.make_spec = SatelliteTleDataUtilities::MakeSpec
  u.make_url = SatelliteTleDataUtilities::MakeUrl
  u.param = SatelliteTleDataUtilities::Param
  u.prepare_auth = SatelliteTleDataUtilities::PrepareAuth
  u.prepare_body = SatelliteTleDataUtilities::PrepareBody
  u.prepare_headers = SatelliteTleDataUtilities::PrepareHeaders
  u.prepare_method = SatelliteTleDataUtilities::PrepareMethod
  u.prepare_params = SatelliteTleDataUtilities::PrepareParams
  u.prepare_path = SatelliteTleDataUtilities::PreparePath
  u.prepare_query = SatelliteTleDataUtilities::PrepareQuery
  u.result_basic = SatelliteTleDataUtilities::ResultBasic
  u.result_body = SatelliteTleDataUtilities::ResultBody
  u.result_headers = SatelliteTleDataUtilities::ResultHeaders
  u.transform_request = SatelliteTleDataUtilities::TransformRequest
  u.transform_response = SatelliteTleDataUtilities::TransformResponse
}
