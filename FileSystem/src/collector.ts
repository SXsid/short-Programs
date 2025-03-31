import * as fs from "fs";
import * as path from "path";
export function fileStats(filePath: string) {
  const fileDetails = fs.statSync(filePath);
  const fileName = path.basename(filePath);
  return {
    name: fileName,
    extention: fileDetails.isDirectory() ? undefined : path.extname(filePath),
    size: formatSize(fileDetails.size),
    byte: fileDetails.size,
    line: fileDetails.isDirectory()
      ? 0
      : fs.readFileSync(filePath, "utf-8").split("\n").length,
  };
}

export function formatSize(byte: number) {
  const unit = ["B", "KB", "MB", "GB", "TB"];
  let size = byte;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < unit.length) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${unit[unitIndex]}`;
}
