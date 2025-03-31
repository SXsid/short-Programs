import { fileStats, formatSize } from "./collector.js";
import { calculateHash } from "./hasher.js";
import { allFilesinTheDir } from "./scanner.js";
import * as fs from "fs";

class Stats {
  private filePaths: string[];

  constructor(dirPath: string) {
    try {
      this.filePaths = allFilesinTheDir(dirPath);
    } catch (error) {
      console.error("Error initializing Stats:", error);
      this.filePaths = [];
    }
  }

  async getfileDetails() {
    try {
      const data = await Promise.all(
        this.filePaths
          .filter(
            (data) =>
              !["node_modules", ".git", ".vscode"].includes(data) &&
              fs.existsSync(data) &&
              fs.statSync(data).isFile()
          )
          .map((filepath) => fileStats(filepath))
      );

      const fileByType: { [key: string]: number } = {};
      data.forEach((value) => {
        if (value.extention) {
          fileByType[value.extention] = (fileByType[value.extention] || 0) + 1;
        } else {
          fileByType[value.name] = 1;
        }
      });

      let largestFile = data[0];
      for (const value of data) {
        if (largestFile.size < value.size) largestFile = value;
      }

      const totalSize = data.reduce(
        (acc, value) => acc + Number(value.byte),
        0
      );
      const totalLineofCode = data.reduce(
        (acc, value) => acc + Number(value.line),
        0
      );

      return {
        allfileclub: fileByType,
        largestFile,
        totalSize: formatSize(totalSize),
        totalLineofCode,
      };
    } catch (error) {
      console.error("Error in getfileDetails:", error);
      throw error;
    }
  }

  async getDublicate() {
    try {
      const duplicateFiles: { [key: string]: number } = {};
      const hashedFiles: { hash: string; filePath: string }[] =
        await Promise.all(
          this.filePaths
            .filter(
              (data) =>
                !["node_modules", ".git", ".vscode"].includes(data) &&
                fs.existsSync(data) &&
                fs.statSync(data).isFile()
            )
            .map(async (filePath) => {
              const hash = await calculateHash(filePath);
              return {
                hash,
                filePath,
              };
            })
        );

      hashedFiles.forEach((data) => {
        duplicateFiles[data.hash] = (duplicateFiles[data.hash] || 0) + 1;
      });

      return hashedFiles
        .filter((file) => duplicateFiles[file.hash] > 1)
        .map((file) => fileStats(file.filePath));
    } catch (error) {
      console.error("Error in getDublicate:", error);
      throw error;
    }
  }
}

export default Stats;
