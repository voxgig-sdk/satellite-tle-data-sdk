<?php
declare(strict_types=1);

// SatelliteTleData SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class SatelliteTleDataFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new SatelliteTleDataBaseFeature();
            case "test":
                return new SatelliteTleDataTestFeature();
            default:
                return new SatelliteTleDataBaseFeature();
        }
    }
}
