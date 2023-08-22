import { copyFile, createDir, exists, insertStringAfterMatch, stringExistsInFile, readFileContents, createFile, prependStringToFile, appendStringToFile } from "helper";

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
    createDir(path, {recursive: true});
})

// Handle Module.php
copyFile(files + "/Module.php", moduleDir + "/{module_name}.php");

// Handle template
copyFile(files + "/template.html5", templateDir + "/{template_name}.html5");

// Handle assets
const mainScssFile = scssDir + "/main.scss";
copyFile(files + "/template.scss", scssDir + "/_{template_name}.scss");
copyFile(files + "/navigation.js", jsDir + "/{template_name}.js");

if (!exists(mainScssFile)) {
    createFile(mainScssFile);
}

// Import into main.scss
// Regex: (@import[\^;]\;) # Selects all import statements
//        (?![\s\S]\*@import[\^;]\*;) # Discards match if theres another preceeding valid import
// Goal: Places the new import statement after the last valid import.
const regex = /(@import[\^;]\*;)(?![\s\S]\*@import[\^;]\*;)/g;
if (stringExistsInFile(mainScssFile, regex)) {
    insertStringAfterMatch(mainScssFile, "\n" + '@import "{template_name}";', regex);
}else {
    prependStringToFile(mainScssFile, '@import "{template_name}";');
}

// Handle tl_module.php
if (!exists(tl_module)) {
    copyFile(files + "/tl_module.php", tl_module);

    const myStr = `<?php

use Contao\\ArticleModel;
use Contao\\PageModel;
use Lupcom\\{bundle_name}\\Modules\\{module_name};

$strName = "tl_module";

`;
    prependStringToFile(tl_module, myStr);
}else {
    appendStringToFile(tl_module, readFileContents(files + "/tl_module.php"));

    const searchStrings = ["use Contao\\ArticleModel;", "use Contao\\PageModel;", "use Lupcom\\{bundle_name}\\Modules\\{module_name};", '$strName = "tl_module";'];

    // Make sure searchStrings are in tl_module.php
    searchStrings.forEach((str, index) => {
        if (!stringExistsInFile(tl_module, str)) {
            if (index === 0) {
                insertStringAfterMatch(tl_module, "\n\n" + str, "<?php");
            }else {
                const last = index === searchStrings.length - 1;
                insertStringAfterMatch(tl_module, "\n" + str + (last ? "\n\n" : ""), searchStrings[index - 1]);
            }
        }
    })
}
