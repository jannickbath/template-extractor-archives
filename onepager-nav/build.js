const { copyFile, createDir, exists, stringExistsInFile, prependStringToFile, readFileContents, appendStringToFile } = require('./helper.js');

const files = "./archive/files";
const bundleDir = "src/Lupcom/{bundle_name}";
const dcaDir = bundleDir + "/Resources/contao/dca";
const moduleDir = bundleDir + "/Modules";
const templateDir = bundleDir + "/Resources/contao/templates";

const tl_module = dcaDir + "/tl_module.php";

[dcaDir, moduleDir, templateDir].forEach(path => {
    // Creates necessary directories if they dont exist
    createDir(path, {recursive: true});
})

// Handle Module.php
copyFile(files + "/Module.php", moduleDir + "/{module_name}.php");

// Handle template
copyFile(files + "/template.html5", templateDir + "/{template_name}.html5");

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
                prependStringToFile(tl_module, "\n\n" + str, "<?php");
            }else {
                const last = index === searchStrings.length - 1;
                prependStringToFile(tl_module, "\n" + str + (last ? "\n\n" : ""), searchStrings[index - 1]);
            }
        }
    })
}
