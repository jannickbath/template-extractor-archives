import { appendStringToFile, copyFile, createDir, createFile, exists, insertStringAfterMatch, prependStringToFile, stringExistsInFile } from "helper";

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
    createDir(path, {recursive: true});
})

copyFile(files + "/Module.php", moduleDir + "/{module_name}.php");
copyFile(files + "/module_template.html5", templateDir + "/{template_name}.html5");

// services.yml
if (!exists(servicesFile)) {
    createFile(servicesFile);
}

if (!stringExistsInFile(servicesFile, "Lupcom\\{bundle_name}\\Modules\\:")) {
    appendStringToFile(servicesFile, registerString);
}

// SCSS
const importStatement = '@import "{template_name}";\n';

if (!exists(scssDir + "/_{template_name}.scss")) {
    copyFile(files + "/template.scss", scssDir + "/_{template_name}.scss");
}

if (!exists(mainScssFile)) {
    createFile(mainScssFile);
}

// Checks if already imported
if (!stringExistsInFile(mainScssFile, importStatement)) {
    prependStringToFile(mainScssFile, importStatement);
}

// DCA
if (!exists(dcaDir + "/tl_module.php")) {
    copyFile(files + "/tl_module.php", dcaDir + "/tl_module.php");
}

const tableDefinition = `\n$GLOBALS['TL_DCA'][$strName]['palettes'][{module_name}::TYPE] = '
    {type_legend},type,name;
    {headline_legend},headline;
    {description_legend},text;
    {pic_legend},singleSRC;
    {expert_legend:hide},cssID;
    {invisible_legend:hide},invisible,start,stop;';\n\n`;

appendStringToFile(dcaDir + "/tl_module.php", tableDefinition);

if (stringExistsInFile(dcaDir + "/tl_module.php", '$strName = "tl_module";')) {
    insertStringAfterMatch(dcaDir + "/tl_module.php", "\n\nuse Lupcom\\{bundle_name}\\Modules\\{module_name};", '$strName = "tl_module";');
}


