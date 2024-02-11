import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export async function isFilePresent(filePath: string): Promise<boolean> {
  if (!vscode.workspace.workspaceFolders) {
    return false;
  }

  for (const folder of vscode.workspace.workspaceFolders) {
    const fullPath = path.join(folder.uri.fsPath, filePath);
    if (fs.existsSync(fullPath)) {
      return true;
    }
  }

  return false;
}
