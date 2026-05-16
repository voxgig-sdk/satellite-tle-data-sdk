<?php
declare(strict_types=1);

// SatelliteTleData SDK utility: prepare_body

class SatelliteTleDataPrepareBody
{
    public static function call(SatelliteTleDataContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
