"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBundles = void 0;
const helper_1 = require("./helper.js");
function getBundles() {
    const lupDir = "src/Lupcom";
    let bundles = [];
    if ((0, helper_1.exists)(lupDir)) {
        bundles = (0, helper_1.listDirectories)(lupDir);
    }
    return arrToStdoutList(bundles);
}
exports.getBundles = getBundles;
function arrToStdoutList(arr) {
    return arr.map(item => item + "\n").join("");
}
