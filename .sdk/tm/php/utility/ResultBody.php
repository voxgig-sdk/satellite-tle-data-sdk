<?php
declare(strict_types=1);

// SatelliteTleData SDK utility: result_body

class SatelliteTleDataResultBody
{
    public static function call(SatelliteTleDataContext $ctx): ?SatelliteTleDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
