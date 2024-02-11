import * as vscode from "vscode";
import ColorsViewProvider from "./ColorsProvider";
import { buildCommandId } from "./constants";

export function activate(context: vscode.ExtensionContext) {
  // Webview view example
  const provider = new ColorsViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      ColorsViewProvider.viewType,
      provider,
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(buildCommandId({ key: "addColor" }), () => {
      vscode.window.showInformationMessage("Adding COLOR");
      provider.addColor();
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      buildCommandId({ key: "clearColors" }),
      () => {
        provider.clearColors();
      },
    ),
  );

  // Hello world command
  let disposable = vscode.commands.registerCommand(
    buildCommandId({ key: "helloWorld" }),
    () => {
      vscode.window.showInformationMessage("Hello World from latitude-vscode!");
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
