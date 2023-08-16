#!/bin/bash

# Example: Converts tl_content_groups to ContentGroupsModel
convert_to_model_name() {
    # 1. Remove the 'tl_' prefix.
    # 2. Convert each word's first character to uppercase.
    # 3. Remove underscores.
    # 4. Append 'Model' at the end.

    echo "$1" | sed 's/tl_//' | awk 'BEGIN{FS=OFS="_"} {for (i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1' | sed 's/_//g' | sed 's/$/Model/'
}

dca_location="src/Lupcom/{bundle_name}/Resources/contao/dca"
language_location="src/Lupcom/{bundle_name}/Resources/contao/languages/de"
config_location="src/Lupcom/{bundle_name}/Resources/contao/config"
model_location="src/Lupcom/{bundle_name}/Models"
child_model_name="$(convert_to_model_name {child_table_name})"
parent_model_name="$(convert_to_model_name {parent_table_name})"

mkdir -p $dca_location
mkdir -p $language_location
mkdir -p $config_location
mkdir -p $model_location

# Dca
cp archive/files/tl_child.php "$dca_location/{child_table_name}.php"
cp archive/files/tl_parent.php "$dca_location/{parent_table_name}.php"

# Languages
cp archive/files/tl_child_lang.php "$language_location/{child_table_name}.php"
cp archive/files/tl_parent_lang.php "$language_location/{parent_table_name}.php"

# Replace [model_name] in Model files, before moving them
sed -i "s/\[model_name\]/$child_model_name/g" archive/files/ChildModel.php
sed -i "s/\[model_name\]/$parent_model_name/g" archive/files/ParentModel.php

# Models
cp archive/files/ChildModel.php "$model_location/$child_model_name.php"
cp archive/files/ParentModel.php "$model_location/$parent_model_name.php"

# Modify config file to include backend module
config_file="$config_location/config.php"

if [ ! -f "$config_file" ]; then
    touch "$config_file"
    echo "<?php" >> $config_file
    echo "" >> $config_file
fi

echo "\$GLOBALS['TL_MODELS']['{child_table_name}'] = $child_model_name::class;" >> "$config_file"
echo "" >> "$config_file" # This will add a newline for separation.

echo "\$GLOBALS['TL_MODELS']['{parent_table_name}'] = $parent_model_name::class;" >> "$config_file"
echo "" >> "$config_file"  # This will add a newline for separation.


echo "\$GLOBALS['BE_MOD']['{bundle_name}']['{backend_name}'] = array(" >> "$config_file"
echo "    'tables' => array('{parent_table_name}', '{child_table_name}')" >> "$config_file"
echo ");" >> "$config_file"

