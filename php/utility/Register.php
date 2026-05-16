<?php
declare(strict_types=1);

// SatelliteTleData SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

SatelliteTleDataUtility::setRegistrar(function (SatelliteTleDataUtility $u): void {
    $u->clean = [SatelliteTleDataClean::class, 'call'];
    $u->done = [SatelliteTleDataDone::class, 'call'];
    $u->make_error = [SatelliteTleDataMakeError::class, 'call'];
    $u->feature_add = [SatelliteTleDataFeatureAdd::class, 'call'];
    $u->feature_hook = [SatelliteTleDataFeatureHook::class, 'call'];
    $u->feature_init = [SatelliteTleDataFeatureInit::class, 'call'];
    $u->fetcher = [SatelliteTleDataFetcher::class, 'call'];
    $u->make_fetch_def = [SatelliteTleDataMakeFetchDef::class, 'call'];
    $u->make_context = [SatelliteTleDataMakeContext::class, 'call'];
    $u->make_options = [SatelliteTleDataMakeOptions::class, 'call'];
    $u->make_request = [SatelliteTleDataMakeRequest::class, 'call'];
    $u->make_response = [SatelliteTleDataMakeResponse::class, 'call'];
    $u->make_result = [SatelliteTleDataMakeResult::class, 'call'];
    $u->make_point = [SatelliteTleDataMakePoint::class, 'call'];
    $u->make_spec = [SatelliteTleDataMakeSpec::class, 'call'];
    $u->make_url = [SatelliteTleDataMakeUrl::class, 'call'];
    $u->param = [SatelliteTleDataParam::class, 'call'];
    $u->prepare_auth = [SatelliteTleDataPrepareAuth::class, 'call'];
    $u->prepare_body = [SatelliteTleDataPrepareBody::class, 'call'];
    $u->prepare_headers = [SatelliteTleDataPrepareHeaders::class, 'call'];
    $u->prepare_method = [SatelliteTleDataPrepareMethod::class, 'call'];
    $u->prepare_params = [SatelliteTleDataPrepareParams::class, 'call'];
    $u->prepare_path = [SatelliteTleDataPreparePath::class, 'call'];
    $u->prepare_query = [SatelliteTleDataPrepareQuery::class, 'call'];
    $u->result_basic = [SatelliteTleDataResultBasic::class, 'call'];
    $u->result_body = [SatelliteTleDataResultBody::class, 'call'];
    $u->result_headers = [SatelliteTleDataResultHeaders::class, 'call'];
    $u->transform_request = [SatelliteTleDataTransformRequest::class, 'call'];
    $u->transform_response = [SatelliteTleDataTransformResponse::class, 'call'];
});
