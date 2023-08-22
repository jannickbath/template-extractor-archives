"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper.js");
const files = "./archive/files";
const bundleDir = "src/Lupcom/{bundle_name}";
const dcaDir = bundleDir + "/Resources/contao/dca";
const moduleDir = bundleDir + "/Modules";
const templateDir = bundleDir + "/Resources/contao/templates";
const jsDir = "files/tpl/js";
const scssDir = "files/tpl/scss";
const tl_module = dcaDir + "/tl_module.php";
[dcaDir, moduleDir, templateDir, jsDir, scssDir].forEach(path => {
    // Creates necessary directories if they dont exist
    (0, helper_1.createDir)(path, { recursive: true });
});
// Handle Module.php
(0, helper_1.copyFile)(files + "/Module.php", moduleDir + "/{module_name}.php");
// Handle template
(0, helper_1.copyFile)(files + "/template.html5", templateDir + "/{template_name}.html5");
// Handle assets
const mainScssFile = scssDir + "/main.scss";
(0, helper_1.copyFile)(files + "/template.scss", scssDir + "/_{template_name}.scss");
(0, helper_1.copyFile)(files + "/navigation.js", jsDir + "/{template_name}.js");
if (!(0, helper_1.exists)(mainScssFile)) {
    (0, helper_1.createFile)(mainScssFile);
}
// Import into main.scss
// Regex: (@import[\^;]\;) # Selects all import statements
//        (?![\s\S]\*@import[\^;]\*;) # Discards match if theres another preceeding valid import
// Goal: Places the new import statement after the last valid import.
const regex = /(@import[\^;]\*;)(?![\s\S]\*@import[\^;]\*;)/g;
if ((0, helper_1.stringExistsInFile)(mainScssFile, regex)) {
    (0, helper_1.insertStringAfterMatch)(mainScssFile, "\n" + '@import "{template_name}";', regex);
}
else {
    (0, helper_1.prependStringToFile)(mainScssFile, '@import "{template_name}";');
}
// Handle tl_module.php
if (!(0, helper_1.exists)(tl_module)) {
    (0, helper_1.copyFile)(files + "/tl_module.php", tl_module);
    const myStr = `<?php

use Contao\\ArticleModel;
use Contao\\PageModel;
use Lupcom\\{bundle_name}\\Modules\\{module_name};

$strName = "tl_module";

`;
    (0, helper_1.prependStringToFile)(tl_module, myStr);
}
else {
    (0, helper_1.appendStringToFile)(tl_module, (0, helper_1.readFileContents)(files + "/tl_module.php"));
    const searchStrings = ["use Contao\\ArticleModel;", "use Contao\\PageModel;", "use Lupcom\\{bundle_name}\\Modules\\{module_name};", '$strName = "tl_module";'];
    // Make sure searchStrings are in tl_module.php
    searchStrings.forEach((str, index) => {
        if (!(0, helper_1.stringExistsInFile)(tl_module, str)) {
            if (index === 0) {
                (0, helper_1.insertStringAfterMatch)(tl_module, "\n\n" + str, "<?php");
            }
            else {
                const last = index === searchStrings.length - 1;
                (0, helper_1.insertStringAfterMatch)(tl_module, "\n" + str + (last ? "\n\n" : ""), searchStrings[index - 1]);
            }
        }
    });
}
