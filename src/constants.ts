export const EXTENSION_NAME = "latitude-vscode";

export const buildCommandId = ({ key }: { key: string }) =>
  `${EXTENSION_NAME}.${key}`;
