<?php
declare(strict_types=1);

// SatelliteTleData SDK exists test

require_once __DIR__ . '/../satellitetledata_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = SatelliteTleDataSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
