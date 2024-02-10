import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "latitude-vscode.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World from latitude-vscode!");
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
