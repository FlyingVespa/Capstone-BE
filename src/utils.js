import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON } = fs;

export const getCurrentFolderPath = (currentFile) =>
  dirname(fileURLToPath(currentFile));
