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
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "format" => "date-time",
              "name" => "date",
              "req" => true,
              "short" => "Date and time of the TLE data",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "id",
              "short" => "Unique identifier URI for the TLE resource",
              "type" => "`$STRING`",
            },
            {
              "name" => "line1",
              "req" => true,
              "short" => "First line of the Two-Line Element set",
              "type" => "`$STRING`",
            },
            {
              "name" => "line2",
              "req" => true,
              "short" => "Second line of the Two-Line Element set",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "req" => true,
              "short" => "Name of the satellite",
              "type" => "`$STRING`",
            },
            {
              "name" => "satelliteId",
              "req" => true,
              "short" => "NORAD catalog ID of the satellite",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "type",
              "short" => "Resource type",
              "type" => "`$STRING`",
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
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 20,
                        "kind" => "query",
                        "name" => "page_size",
                        "orig" => "page_size",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "*",
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "popularity",
                        "kind" => "query",
                        "name" => "sort",
                        "orig" => "sort",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "desc",
                        "kind" => "query",
                        "name" => "sort_dir",
                        "orig" => "sort_dir",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/tle/",
                  "segments" => [
                    {
                      "lit" => "tle",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "page",
                      "page_size",
                      "search",
                      "sort",
                      "sort_dir",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "tle",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 25544,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "satellite_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/tle/{satelliteId}",
                  "rename" => {
                    "param" => {
                      "satelliteId" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "tle",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "tle",
                    "{id}",
                  ],
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
