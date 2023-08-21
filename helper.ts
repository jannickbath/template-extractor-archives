import * as HelperType from 'helper';  // Importing just for type information
//@ts-ignore
const helper: typeof HelperType = require('./helper.js');

export const copyFile = helper.copyFile;
export const createDir = helper.createDir;
export const createFile = helper.createFile;
export const searchAndReplaceFileContentsRegex = helper.searchAndReplaceFileContentsRegex;
export const appendStringToFile = helper.appendStringToFile;
export const prependStringToFile = helper.prependStringToFile;
export const insertStringBeforeMatch = helper.insertStringBeforeMatch;
export const insertStringAfterMatch = helper.insertStringAfterMatch;
export const searchAndReplaceFileContents = helper.searchAndReplaceFileContents;
export const deletePath = helper.deletePath;
export const listFiles = helper.listFiles;
export const listDirectories = helper.listDirectories;
export const readFileContents = helper.readFileContents;
export const stringExistsInFile = helper.stringExistsInFile;
export const writeFile = helper.writeFile;
export const exists = helper.exists;
export const rename = helper.rename;
export const getFileSize = helper.getFileSize;
export const moveFile = helper.moveFile;
