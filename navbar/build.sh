#!/bin/bash

js_location=files/tpl/js
scss_location=files/tpl/scss
template_location=templates

mkdir -p $js_location
mkdir -p $scss_location
mkdir -p $template_location

# Templates
if [ ! -f "$template_location/mod_navigation.html5" ]; then
    cp archive/files/mod_navigation.html5 "$template_location/mod_navigation.html5"
else
    echo "templates/mod_navigation.html5 already exists, skipping..."
fi

if [ ! -f "$template_location/nav_default.html5" ]; then
    cp archive/files/nav_default.html5 "$template_location/nav_default.html5"
else
    echo "templates/nav_default.html5 already exists, skipping..."
fi

# Assets
cp archive/files/header_nav.js "$js_location/{module_name}.js"
cp archive/files/navigation.scss "$scss_location/_{module_name}.scss"


# Adds import to main.scss
main_scss_file="$scss_location/main.scss"

if [ ! -f "$main_scss_file" ]; then
    touch "$main_scss_file"
fi

echo '@import "{module_name}";' | cat - "$main_scss_file" > temp && mv temp "$main_scss_file"

