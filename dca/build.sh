#!/bin/bash

dca_location="src/Lupcom/{bundle_name}/Resources/contao/dca"
lang_location="src/Lupcom/{bundle_name}/Resources/contao/languages/de"

mkdir -p "$dca_location"
mkdir -p "$lang_location"

cp archive/tl_table.php "$dca_location/{table_name}.php"

if [ ! -f "$lang_location/{table_name}.php" ]; then
    cp archive/tl_table_lang.php "$lang_location/{table_name}.php"
fi