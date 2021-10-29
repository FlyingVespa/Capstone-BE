import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJson, writeJson } = fs;

// const usersJSONPath = join(dirname, fileURLToPath(import.meta.url), "/")

export const getCurrentFolderPath = (currentFile) => {
  dirname(fileURLToPath(currentFile));
};
