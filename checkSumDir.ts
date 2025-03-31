import * as fs from "fs";
import * as path from "path";
import crypto from "crypto";
const calculateFileHash = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("md5");
    const stream = fs.createReadStream(filePath);
    stream.on("error", (err) => reject(err));
    stream.on("data", (data) => hash.update(data));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
};

const getAllFiles = (dirPath: string): string[] => {
  const filePaths: string[] = [];
  const dataList = fs.readdirSync(dirPath);

  for (const data of dataList) {
    const fullPath = path.join(dirPath, data);
    const fileStats = fs.statSync(fullPath);
    if (fileStats.isFile()) filePaths.push(fullPath);
    if (data === "node_modules" || data === ".git" || data === ".vscode")
      continue;
    else if (fileStats.isDirectory()) {
      filePaths.push(...getAllFiles(fullPath));
    }
  }
  return filePaths;
};
const calculateDirHash = async (dirPath: string): Promise<string> => {
  const hash = crypto.createHash("md5");
  const files = getAllFiles(dirPath).sort();

  const fileHashes = await Promise.all(
    files.map(async (file) => await calculateFileHash(file))
  );

  fileHashes.forEach((fileHash) => hash.update(fileHash));

  return hash.digest("hex");
};

const checkIfDirsAreEqual = async (
  dir1: string,
  dir2: string
): Promise<boolean> => {
  //parallel execution
  const [hash1, hash2] = await Promise.all([
    calculateDirHash(dir1),
    calculateDirHash(dir2),
  ]);
  return hash1 === hash2;
};

checkIfDirsAreEqual("..", "..").then((data) => console.log(data));
