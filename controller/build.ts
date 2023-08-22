import { appendStringToFile, copyFile, createDir, createFile, exists, stringExistsInFile } from "helper";

const controllerDir = "src/Lupcom/{bundle_name}/Controller";
const templateDir = "src/Lupcom/{bundle_name}/Resources/contao/templates";
const configDir = "src/Lupcom/{bundle_name}/Resources/config";

const servicesFile = "src/Lupcom/{bundle_name}/Resources/config/services.yml";
const registerString = "Lupcom\\CustomElementsBundle\\Controller\\:\n    resource: ../../Controller\n    public: true\n";

// Create necessary directories
[controllerDir, templateDir, configDir].forEach(path => {
    createDir(path, {recursive: true});
})

copyFile("archive/Controller.php", controllerDir + "/{controller_name}.php");
copyFile("archive/controller_template.html5", templateDir + "/{template_name}.html5");

if (!exists(servicesFile)) {
    createFile(servicesFile);
}

if (!stringExistsInFile(servicesFile, "Lupcom\\CustomElementsBundle\\Controller\\:")) {
    appendStringToFile(servicesFile, registerString);
}

