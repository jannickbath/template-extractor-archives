#!/bin/bash

mkdir -p src/Lupcom/{bundle_name}/Controller
mkdir -p src/Lupcom/{bundle_name}/Resources/contao/templates
mkdir -p src/Lupcom/{bundle_name}/Resources/config

cp archive/Controller.php src/Lupcom/{bundle_name}/Controller/{controller_name}.php
cp archive/controller_template.html5 src/Lupcom/{bundle_name}/Resources/contao/templates/{template_name}.html5

services_file="src/Lupcom/{bundle_name}/Resources/config/services.yml"

if [ ! -f "$services_file" ]; then
    touch "$services_file"
fi

if ! grep -qF "Lupcom\\CustomElementsBundle\\Controller\\:" "$services_file"; then
    printf "Lupcom\\CustomElementsBundle\\Controller\\:\n    resource: ../../Controller\n    public: true\n" >> "$services_file"
fi
