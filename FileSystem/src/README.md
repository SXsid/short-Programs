# File Management System

## Overview

The File Management System is a tool designed to analyze and manage files in a given directory. It generates detailed reports on the file system, including statistics such as file types, their count, and the largest files. Additionally, it identifies duplicate files, helping you clean up unnecessary duplicates in your project.

## Features

- **Checksum Generation**: Ensures data integrity by generating and comparing checksums.
- **File System Analysis**: Provides an overview of file types, their count, and sizes.
- **Duplicate File Detection**: Identifies duplicate files based on their names, extensions, and sizes.

## Sample Output

### 1) Checksum

Checksum generation helps ensure the integrity of files and helps identify any corruption or changes made to the files.

### 2) File System Analysis

📊 **File System Analysis Report** 📊

- **Total Size**: 570.07 KB
- **Total Files**: 17,496

#### File Types
| Extension     | Count |
|---------------|-------|
| `.dockerignore` | 1     |
| `.env`         | 1     |
| `.eslintignore`| 1     |
| `.json`        | 6     |
| `.yml`         | 2     |
| `.gitignore`   | 1     |
| `.sh`          | 1     |
| `.prettierignore` | 1 |
| `.md`          | 2     |
| `.ts`          | 70    |

#### Largest File
- **Name**: `nodemon.json`
- **Extension**: `.json`
- **Size**: 94.00 B
- **Lines**: 6

---

📊 **File System Analysis Report** 📊

- **Total Size**: 211.24 MB
- **Total Files**: 439,425

#### File Types
| Extension     | Count |
|---------------|-------|
| `.env`         | 1     |
| `.json`        | 31    |
| `.js`          | 87    |
| `.css`         | 3     |
| `.ts`          | 61    |
| `.tsx`         | 166   |

#### Largest File
- **Name**: `page.tsx`
- **Extension**: `.tsx`
- **Size**: 975.00 B
- **Lines**: 26

---

### 3) Duplicate Files

#### Duplicate File List:
| Name                                     | Extension | Size              |
|------------------------------------------|-----------|-------------------|
| `adminAvatar.png`                        | `.png`    | 83.29 KB (85292 B)|
| `admission_graphics.png`                 | `.png`    | 64.67 KB (66223 B)|
| `arrow.png`                              | `.png`    | 631.00 B (631 B)  |
| `react-loadable-manifest.json`           | `.json`   | 2.00 B (2 B)      |
| `pages-manifest.json`                    | `.json`   | 2.00 B (2 B)      |
| `arrow.6e4d1060.png`                     | `.png`    | 631.00 B (631 B)  |
| `backarrow.cffb5af9.png`                 | `.png`    | 894.00 B (894 B)  |
| `adminAvatar.f0544dc8.png`               | `.png`    | 83.29 KB (85292 B)|
| `movingforward.e9adf098.png`             | `.png`    | 13.33 KB (13645 B)|
| `squiggly.13942f61.png`                  | `.png`    | 5.88 KB (6023 B)  |
| `savingMoney.19b758b3.png`               | `.png`    | 36.97 KB (37860 B)|

---

## Usage

1. **Install dependencies**:

   ```bash
   npm install
2. **build dist folder**:

   ```bash
   tsc -b
3. **Run it locally**:
    ```bash
    node dist/index.js <you folder bath wrt to current folder>



