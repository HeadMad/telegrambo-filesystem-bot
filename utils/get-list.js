import path from "path";

export default getList;


const rootdDirPath = path.join(import.meta.url, '..');


/**
 * Generates a list of files in a directory.
 *
 * @param {string} currentPath - The path of the current directory.
 * @param {Array} dirFiles - An array of files in the directory.
 * @return {string} The generated list of files.
 */
function getList(currentPath, dirFiles) {
  const dirPath = path.join(rootdDirPath, currentPath);
  const dirBasename = path.basename(dirPath);
  let list = dirBasename + '/';

  for (let file of dirFiles) {
    list += `\n└─ <code>${file}</code>`;
  }

  return list;
}