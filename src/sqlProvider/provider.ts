import * as vscode from "vscode";
import { parseMarkdown, writeCellsToMarkdown, RawNotebookCell } from "./parser";

// there are globals in workers and nodejs
declare class TextDecoder {
  decode(data: Uint8Array): string;
}
declare class TextEncoder {
  encode(data: string): Uint8Array;
}

function rawToNotebookCellData(data: RawNotebookCell): vscode.NotebookCellData {
  return <vscode.NotebookCellData>{
    kind: data.kind,
    languageId: data.language,
    metadata: {
      leadingWhitespace: data.leadingWhitespace,
      trailingWhitespace: data.trailingWhitespace,
      indentation: data.indentation,
    },
    outputs: [],
    value: data.content,
  };
}

export const SQL_PROVIDER_OPTIONS = {
  transientMetadata: {
    runnable: true,
    editable: true,
    custom: true,
  },
  transientOutputs: true,
};
type Options = typeof SQL_PROVIDER_OPTIONS;

// TODO: implement this as a NotebookContentProvider instead of
// a NotebookSerializer
// The reason is that the serializer is only used when saving the
// notebook, and we want to be able to edit the notebook in the
// editor and also to be able to run the cells.
export default class SqlProvider implements vscode.NotebookSerializer {
  private readonly decoder = new TextDecoder();
  private readonly encoder = new TextEncoder();

  deserializeNotebook(
    data: Uint8Array,
    _token: vscode.CancellationToken,
  ): vscode.NotebookData | Thenable<vscode.NotebookData> {
    const content = this.decoder.decode(data);

    const cellRawData = parseMarkdown(content);
    const cells = cellRawData.map(rawToNotebookCellData);

    return {
      cells,
    };
  }

  serializeNotebook(
    data: vscode.NotebookData,
    _token: vscode.CancellationToken,
  ): Uint8Array | Thenable<Uint8Array> {
    const stringOutput = writeCellsToMarkdown(data.cells);
    return this.encoder.encode(stringOutput);
  }
}
