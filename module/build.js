"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper.js");
const moduleDir = "src/Lupcom/{bundle_name}/Modules";
const templateDir = "src/Lupcom/{bundle_name}/Resources/contao/templates";
const configDir = "src/Lupcom/{bundle_name}/Resources/config";
const dcaDir = "src/Lupcom/{bundle_name}/Resources/contao/dca";
const scssDir = "files/tpl/scss";
const mainScssFile = scssDir + "/main.scss";
const files = "archive/files";
const servicesFile = "src/Lupcom/{bundle_name}/Resources/config/services.yml";
const registerString = "Lupcom\\{bundle_name}\\Modules\\:\n    resource: ../../Modules\n    public: true\n";
// Create necessary directories
[moduleDir, templateDir, configDir, scssDir, dcaDir].forEach(path => {
    (0, helper_1.createDir)(path, { recursive: true });
});
(0, helper_1.copyFile)(files + "/Module.php", moduleDir + "/{module_name}.php");
(0, helper_1.copyFile)(files + "/module_template.html5", templateDir + "/{template_name}.html5");
// services.yml
if (!(0, helper_1.exists)(servicesFile)) {
    (0, helper_1.createFile)(servicesFile);
}
if (!(0, helper_1.stringExistsInFile)(servicesFile, "Lupcom\\{bundle_name}\\Modules\\:")) {
    (0, helper_1.appendStringToFile)(servicesFile, registerString);
}
// SCSS
const importStatement = '@import "{template_name}";\n';
if (!(0, helper_1.exists)(scssDir + "/_{template_name}.scss")) {
    (0, helper_1.copyFile)(files + "/template.scss", scssDir + "/_{template_name}.scss");
}
if (!(0, helper_1.exists)(mainScssFile)) {
    (0, helper_1.createFile)(mainScssFile);
}
// Checks if already imported
if (!(0, helper_1.stringExistsInFile)(mainScssFile, importStatement)) {
    (0, helper_1.prependStringToFile)(mainScssFile, importStatement);
}
// DCA
if (!(0, helper_1.exists)(dcaDir + "/tl_module.php")) {
    (0, helper_1.copyFile)(files + "/tl_module.php", dcaDir + "/tl_module.php");
}
const tableDefinition = `$GLOBALS['TL_DCA'][$strName]['palettes'][{module_name}::TYPE] = '
    {type_legend},type;
    {headline_legend},headline;
    {description_legend},text;
    {pic_legend},singleSRC;
    {expert_legend:hide},cssID;
    {invisible_legend:hide},invisible,start,stop;';\n\n`;
(0, helper_1.appendStringToFile)(dcaDir + "/tl_module.php", tableDefinition);
if ((0, helper_1.stringExistsInFile)(dcaDir + "/tl_module.php", '$strName = "tl_module";')) {
    (0, helper_1.insertStringAfterMatch)(dcaDir + "/tl_module.php", "\n\nuse Lupcom\\{bundle_name}\\Modules\\{module_name};", '$strName = "tl_module";');
}
