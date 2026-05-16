<?php
declare(strict_types=1);

// SatelliteTleData SDK utility: feature_add

class SatelliteTleDataFeatureAdd
{
    public static function call(SatelliteTleDataContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
