import * as vscode from "vscode";
import ColorsViewProvider from "./ColorsProvider";
import { buildCommandId } from "./constants";
import { CatCodingPanel, getWebviewOptions } from "./CatCodingPanel";

function registerCatCodingPanel(context: vscode.ExtensionContext) {
  if (!vscode.window.registerWebviewPanelSerializer) {
    return;
  }
  vscode.window.registerWebviewPanelSerializer(CatCodingPanel.viewType, {
    async deserializeWebviewPanel(
      webviewPanel: vscode.WebviewPanel,
      state: any,
    ) {
      console.log(`Got state: ${state}`);
      // Reset the webview options so we use latest uri for `localResourceRoots`.
      webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
      CatCodingPanel.revive(webviewPanel, context.extensionUri);
    },
  });
}

export function activate(context: vscode.ExtensionContext) {
  // Hello world command example
  context.subscriptions.push(
    vscode.commands.registerCommand(
      buildCommandId({ key: "helloWorld" }),
      () => {
        vscode.window.showInformationMessage(
          "Hello World from latitude-vscode!",
        );
      },
    ),
  );

  // ColorsViewProvider example
  const provider = new ColorsViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      ColorsViewProvider.viewType,
      provider,
    ),
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(buildCommandId({ key: "addColor" }), () => {
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

  // Cat Coding Panel example
  registerCatCodingPanel(context);
  context.subscriptions.push(
    vscode.commands.registerCommand(
      buildCommandId({ key: "startCatCodingSession" }),
      () => {
        CatCodingPanel.createOrShow(context.extensionUri);
      },
    ),
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      buildCommandId({ key: "doRefactor" }),
      () => {
        if (!CatCodingPanel.currentPanel) {
          return;
        }

        CatCodingPanel.currentPanel.doRefactor();
      },
    ),
  );
}

// You can unload things when the extension is
// desactivated with this function
export function deactivate() {}
