<?php
declare(strict_types=1);

// SatelliteTleData SDK utility: result_headers

class SatelliteTleDataResultHeaders
{
    public static function call(SatelliteTleDataContext $ctx): ?SatelliteTleDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
