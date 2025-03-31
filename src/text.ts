import * as fs from "fs";
import * as path from "path";
export const allFilesinTheDir = (dirPath: string): string[] => {
  const filePaths: string[] = [];
  const dataList = fs.readdirSync(dirPath);
  for (const data of dataList) {
    const filePath = path.join(dirPath, data);
    const fileStats = fs.statSync(filePath);
    if (fileStats.isFile()) filePaths.push(filePath);
    if (data === "node_modules" || data === ".git" || data === ".vscode")
      filePaths.push(filePath);
    else if (fileStats.isDirectory()) {
      filePaths.push(...allFilesinTheDir(filePath));
    }
  }

  return filePaths;
};
