"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveFile = exports.getFileSize = exports.rename = exports.exists = exports.writeFile = exports.stringExistsInFile = exports.readFileContents = exports.listDirectories = exports.listFiles = exports.deletePath = exports.searchAndReplaceFileContents = exports.insertStringAfterMatch = exports.insertStringBeforeMatch = exports.prependStringToFile = exports.appendStringToFile = exports.searchAndReplaceFileContentsRegex = exports.createFile = exports.createDir = exports.copyFile = void 0;
//@ts-ignore
const helper = require('./helper.js');
exports.copyFile = helper.copyFile;
exports.createDir = helper.createDir;
exports.createFile = helper.createFile;
exports.searchAndReplaceFileContentsRegex = helper.searchAndReplaceFileContentsRegex;
exports.appendStringToFile = helper.appendStringToFile;
exports.prependStringToFile = helper.prependStringToFile;
exports.insertStringBeforeMatch = helper.insertStringBeforeMatch;
exports.insertStringAfterMatch = helper.insertStringAfterMatch;
exports.searchAndReplaceFileContents = helper.searchAndReplaceFileContents;
exports.deletePath = helper.deletePath;
exports.listFiles = helper.listFiles;
exports.listDirectories = helper.listDirectories;
exports.readFileContents = helper.readFileContents;
exports.stringExistsInFile = helper.stringExistsInFile;
exports.writeFile = helper.writeFile;
exports.exists = helper.exists;
exports.rename = helper.rename;
exports.getFileSize = helper.getFileSize;
exports.moveFile = helper.moveFile;
