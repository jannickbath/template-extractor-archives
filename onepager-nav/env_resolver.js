const { listDirectories, exists } = require('./helper.js');

function getBundles() {
    const lupDir = "src/Lupcom";
    let bundles = []

    // Doesnt work, throws error if Bundles there
    if (exists(lupDir)) {
        bundles = listDirectories(lupDir);
    }

    return arrToStdoutList(bundles);
}

function arrToStdoutList(arr) {
    return arr.map(item => item + "\n").join("");
}

exports.getBundles = getBundles;