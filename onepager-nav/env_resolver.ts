import { exists, listDirectories } from "helper";

function getBundles() {
    const lupDir = "src/Lupcom";
    let bundles: Array<string> = []

    // Doesnt work, throws error if Bundles there
    if (exists(lupDir)) {
        bundles = listDirectories(lupDir);
    }

    return arrToStdoutList(bundles);
}

function arrToStdoutList(arr: Array<string>) {
    return arr.map(item => item + "\n").join("");
}

export { getBundles };