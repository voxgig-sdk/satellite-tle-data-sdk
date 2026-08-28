<?php
declare(strict_types=1);

// Typed models for the SatelliteTleData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Tle entity data model. */
class Tle
{
    public string $date;
    public ?string $id = null;
    public string $line1;
    public string $line2;
    public string $name;
    public int $satelliteId;
    public ?string $type = null;
}

/** Request payload for Tle#load. */
class TleLoadMatch
{
    public int $id;
}

/** Request payload for Tle#list. */
class TleListMatch
{
    public ?int $page = null;
    public ?int $page_size = null;
    public ?string $search = null;
    public ?string $sort = null;
    public ?string $sort_dir = null;
}

