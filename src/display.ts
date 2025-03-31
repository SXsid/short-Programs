import chalk from "chalk";
import Table from "cli-table3";
interface fileDetailsInterface {
  name: string;
  extention: string | undefined;
  size: string;
  byte: number;
  line: number;
}
interface Idata {
  allfileclub: Record<string, number>;
  totalSize: string;
  totalLineofCode: number;
  largestFile: fileDetailsInterface;
  duplicateFiles: fileDetailsInterface[];
}

export function displayAnalysisReport(data: Idata): void {
  console.log(chalk.cyan.bold("\n📊 FILE SYSTEM ANALYSIS REPORT 📊"));
  console.log(chalk.green(`\nTotal Size: ${chalk.bold(data.totalSize)}`));
  console.log(chalk.green(`\nTotal Size: ${chalk.bold(data.totalLineofCode)}`));

  // Create tables
  const fileTypesTable = new Table({
    head: [chalk.white.bold("Extension"), chalk.white.bold("Count")],
  });

  const largestFileTable = new Table({
    head: [chalk.white.bold("Property"), chalk.white.bold("Value")],
    style: { head: [] },
  });

  // Fill tables
  Object.entries(data.allfileclub).forEach(([ext, count]) => {
    fileTypesTable.push([ext, count]);
  });

  largestFileTable.push(
    ["Name", data.largestFile.name],
    ["Extension", data.largestFile.extention || "N/A"],
    ["Size", `${data.largestFile.size} (${data.largestFile.byte} bytes)`],
    ["No.of Lines", data.largestFile.line]
  );

  // Split tables into lines
  const fileTypesLines = fileTypesTable.toString().split("\n");
  const largestFileLines = largestFileTable.toString().split("\n");
  const maxLines = Math.max(fileTypesLines.length, largestFileLines.length);

  // Print tables side by side
  console.log(
    chalk.yellow("\n📁 FILE TYPES") +
      " ".repeat(40) +
      chalk.magenta("🏆 LARGEST FILE")
  );
  for (let i = 0; i < maxLines; i++) {
    const fileLine =
      fileTypesLines[i] ||
      " ".repeat(fileTypesTable.toString().split("\n")[0].length);
    const largeLine =
      largestFileLines[i] ||
      " ".repeat(largestFileTable.toString().split("\n")[0].length);
    console.log(fileLine + "    " + largeLine);
  }

  // Print duplicate files table separately
  if (data.duplicateFiles.length > 0) {
    console.log(chalk.red("\n🔄 DUPLICATE FILES:"));
    const duplicateFilesTable = new Table({
      head: [
        chalk.white.bold("Name"),
        chalk.white.bold("Extension"),
        chalk.white.bold("Size"),
      ],
      style: { head: [] },
    });
    data.duplicateFiles.forEach((file) => {
      duplicateFilesTable.push([
        file.name,
        file.extention || "N/A",
        `${file.size} (${file.byte} bytes)`,
      ]);
    });
    console.log(duplicateFilesTable.toString());
  }
}
