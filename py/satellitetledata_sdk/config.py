# SatelliteTleData SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "SatelliteTleData",
            "slug": "satellite-tle-data",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://tle.ivanstanojevic.me/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "tle": {},
            },
        },
        "entity": {
      "tle": {
        "fields": [
          {
            "format": "date-time",
            "name": "date",
            "req": True,
            "short": "Date and time of the TLE data",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "id",
            "short": "Unique identifier URI for the TLE resource",
            "type": "`$STRING`",
          },
          {
            "name": "line1",
            "req": True,
            "short": "First line of the Two-Line Element set",
            "type": "`$STRING`",
          },
          {
            "name": "line2",
            "req": True,
            "short": "Second line of the Two-Line Element set",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "short": "Name of the satellite",
            "type": "`$STRING`",
          },
          {
            "name": "satelliteId",
            "req": True,
            "short": "NORAD catalog ID of the satellite",
            "type": "`$INTEGER`",
          },
          {
            "name": "type",
            "short": "Resource type",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "tle",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "*",
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "popularity",
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "desc",
                      "kind": "query",
                      "name": "sort_dir",
                      "orig": "sort_dir",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/tle/",
                "segments": [
                  {
                    "lit": "tle",
                  },
                ],
                "select": {
                  "exist": [
                    "page",
                    "page_size",
                    "search",
                    "sort",
                    "sort_dir",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "tle",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": 25544,
                      "kind": "param",
                      "name": "id",
                      "orig": "satellite_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/tle/{satelliteId}",
                "rename": {
                  "param": {
                    "satelliteId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "tle",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "tle",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
