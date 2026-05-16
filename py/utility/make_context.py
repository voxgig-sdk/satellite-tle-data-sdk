# SatelliteTleData SDK utility: make_context

from core.context import SatelliteTleDataContext


def make_context_util(ctxmap, basectx):
    return SatelliteTleDataContext(ctxmap, basectx)
