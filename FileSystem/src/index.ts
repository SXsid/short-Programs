import { displayAnalysisReport } from "./display.js";
import Stats from "./stats.js";
import path from "path";
import fs from "fs";
function validateDirPath(dirPath: string): string {
  const resolvedPath = path.resolve(dirPath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`The directory at ${resolvedPath} does not exist.`);
    process.exit(1);
  }
  if (!fs.statSync(resolvedPath).isDirectory()) {
    console.error(`The path ${resolvedPath} is not a directory.`);
    process.exit(1);
  }
  return resolvedPath;
}

async function init() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Please provide a directory path.");
    process.exit(1);
  }

  const dirPath = args[0];
  const finalPath = validateDirPath(dirPath);
  console.log(finalPath);

  const statObject = new Stats(finalPath);

  const statsData = await statObject.getfileDetails();
  const duplicateFiles = await statObject.getDublicate();

  displayAnalysisReport({ ...statsData, duplicateFiles });
}
init();
