# SatelliteTleData SDK configuration

module SatelliteTleDataConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "SatelliteTleData",
        "slug" => "satellite-tle-data",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://tle.ivanstanojevic.me/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "tle" => {},
        },
      },
      "entity" => {
        "tle" => {
          "fields" => [
            {
              "name" => "date",
              "title" => "Date",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Date and time of the TLE data",
              "format" => "date-time",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "short" => "Unique identifier URI for the TLE resource",
              "format" => "uri",
            },
            {
              "name" => "line1",
              "title" => "Line1",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "First line of the Two-Line Element set",
            },
            {
              "name" => "line2",
              "title" => "Line2",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Second line of the Two-Line Element set",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Name of the satellite",
            },
            {
              "name" => "satelliteId",
              "title" => "Satellite Id",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "NORAD catalog ID of the satellite",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$STRING`",
              "short" => "Resource type",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "tle",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/tle/",
                  "segments" => [
                    {
                      "lit" => "tle",
                    },
                  ],
                  "parts" => [
                    "tle",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1,
                      },
                      {
                        "name" => "page_size",
                        "orig" => "page-size",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 20,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "*",
                      },
                      {
                        "name" => "sort",
                        "orig" => "sort",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "popularity",
                      },
                      {
                        "name" => "sort_dir",
                        "orig" => "sort-dir",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "desc",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "page",
                      "page_size",
                      "search",
                      "sort",
                      "sort_dir",
                    ],
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/tle/{satelliteId}",
                  "segments" => [
                    {
                      "lit" => "tle",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "tle",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "satelliteId" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "satelliteId",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => 25544,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    SatelliteTleDataFeatures.make_feature(name)
  end
end
