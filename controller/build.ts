import { appendStringToFile, copyFile, createDir, createFile, exists, prependStringToFile, stringExistsInFile } from "helper";

const controllerDir = "src/Lupcom/{bundle_name}/Controller";
const templateDir = "src/Lupcom/{bundle_name}/Resources/contao/templates";
const configDir = "src/Lupcom/{bundle_name}/Resources/config";
const dcaDir = "src/Lupcom/{bundle_name}/Resources/contao/dca";
const scssDir = "files/tpl/scss";
const mainScssFile = scssDir + "/main.scss";
const files = "archive/files";

const servicesFile = "src/Lupcom/{bundle_name}/Resources/config/services.yml";
const registerString = "Lupcom\\CustomElementsBundle\\Controller\\:\n    resource: ../../Controller\n    public: true\n";

// Create necessary directories
[controllerDir, templateDir, configDir, scssDir, dcaDir].forEach(path => {
    createDir(path, {recursive: true});
})

copyFile(files + "/Controller.php", controllerDir + "/{controller_name}.php");
copyFile(files + "/controller_template.html5", templateDir + "/{template_name}.html5");

// services.yml
if (!exists(servicesFile)) {
    createFile(servicesFile);
}

if (!stringExistsInFile(servicesFile, "Lupcom\\CustomElementsBundle\\Controller\\:")) {
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
if (!exists(dcaDir + "/tl_content.php")) {
    copyFile(files + "/tl_content.php", dcaDir + "/tl_content.php");
}

const tableDefinition = `$GLOBALS['TL_DCA'][$strName]['palettes'][{controller_name}::TYPE] = '
    {type_legend},type;
    {headline_legend},headline;
    {description_legend},text;
    {pic_legend},singleSRC;
    {expert_legend:hide},cssID;
    {invisible_legend:hide},invisible,start,stop;';\n\n`;

appendStringToFile(dcaDir + "/tl_content.php", tableDefinition);

