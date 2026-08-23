<?php
declare(strict_types=1);

// SatelliteTleData SDK configuration

class SatelliteTleDataConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "SatelliteTleData",
                "slug" => "satellite-tle-data",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://tle.ivanstanojevic.me/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "tle" => [],
                ],
            ],
            "entity" => [
        'tle' => [
          'fields' => [
            [
              'name' => 'date',
              'req' => true,
              'short' => 'Date and time of the TLE data',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier URI for the TLE resource',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'line1',
              'req' => true,
              'short' => 'First line of the Two-Line Element set',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'line2',
              'req' => true,
              'short' => 'Second line of the Two-Line Element set',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'short' => 'Name of the satellite',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'satelliteId',
              'req' => true,
              'short' => 'NORAD catalog ID of the satellite',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'type',
              'short' => 'Resource type',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'tle',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'page_size',
                        'orig' => 'page_size',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => '*',
                        'kind' => 'query',
                        'name' => 'search',
                        'orig' => 'search',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'popularity',
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'desc',
                        'kind' => 'query',
                        'name' => 'sort_dir',
                        'orig' => 'sort_dir',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tle/',
                  'parts' => [
                    'tle',
                  ],
                  'select' => [
                    'exist' => [
                      'page',
                      'page_size',
                      'search',
                      'sort',
                      'sort_dir',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 25544,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'satellite_id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tle/{satelliteId}',
                  'parts' => [
                    'tle',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'satelliteId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return SatelliteTleDataFeatures::make_feature($name);
    }
}
