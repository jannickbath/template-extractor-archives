"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper.js");
const controllerDir = "src/Lupcom/{bundle_name}/Controller";
const templateDir = "src/Lupcom/{bundle_name}/Resources/contao/templates";
const configDir = "src/Lupcom/{bundle_name}/Resources/config";
const servicesFile = "src/Lupcom/{bundle_name}/Resources/config/services.yml";
const registerString = "Lupcom\\CustomElementsBundle\\Controller\\:\n    resource: ../../Controller\n    public: true\n";
// Create necessary directories
[controllerDir, templateDir, configDir].forEach(path => {
    (0, helper_1.createDir)(path, { recursive: true });
});
(0, helper_1.copyFile)("archive/Controller.php", controllerDir + "/{controller_name}.php");
(0, helper_1.copyFile)("archive/controller_template.html5", templateDir + "/{template_name}.html5");
if (!(0, helper_1.exists)(servicesFile)) {
    (0, helper_1.createFile)(servicesFile);
}
if (!(0, helper_1.stringExistsInFile)(servicesFile, "Lupcom\\CustomElementsBundle\\Controller\\:")) {
    (0, helper_1.appendStringToFile)(servicesFile, registerString);
}
