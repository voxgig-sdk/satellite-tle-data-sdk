<?php
declare(strict_types=1);

// SatelliteTleData SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class SatelliteTleDataMakeContext
{
    public static function call(array $ctxmap, ?SatelliteTleDataContext $basectx): SatelliteTleDataContext
    {
        return new SatelliteTleDataContext($ctxmap, $basectx);
    }
}
