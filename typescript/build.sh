#!/bin/bash

js_location=files/tpl/js
ts_location=files/tpl/ts

ts_config_location=tsconfig.json
lupi_location="$ts_location/lupi.ts"
lupi_types_location="$ts_location/types.d.ts"

mkdir -p $js_location
mkdir -p $ts_location

if [ ! -f "$ts_config_location" ]; then
    cp archive/files/tsconfig.json "$ts_config_location"
else
    echo "tsconfig.json already exists, skipping..."
fi

if [ ! -f "$lupi_location" ]; then
    cp archive/files/lupi.ts "$lupi_location"
else
    echo "lupi.ts already exists, skipping..."
fi

if [ ! -f "$lupi_types_location" ]; then
    cp archive/files/lupi.ts "$lupi_types_location"
else
    echo "types.d.ts already exists, skipping..."
fi

if ! which tsc > /dev/null 2>&1; then
    echo "tsc could not be found. Please make sure to install typescript."
    exit
fi

tsc