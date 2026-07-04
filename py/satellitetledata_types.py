# Typed models for the SatelliteTleData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Tle:
    date: str
    line1: str
    line2: str
    name: str
    satellite_id: int
    id: Optional[str] = None
    type: Optional[str] = None


@dataclass
class TleLoadMatch:
    id: int


@dataclass
class TleListMatch:
    date: Optional[str] = None
    id: Optional[str] = None
    line1: Optional[str] = None
    line2: Optional[str] = None
    name: Optional[str] = None
    satellite_id: Optional[int] = None
    type: Optional[str] = None

