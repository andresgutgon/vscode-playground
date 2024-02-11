# VSCode extension playground

Play with the APIs for developing a VSCode extension

## Development

This extension is done with Typescript. For compiling and running it inside
VSCode do:

1. Go to VSCode (If you are a real dev and use Vim)
2. Open `src/extension.ts`
3. Press `F5`.

# Refresh Extension Host

When developing a VSCode extension you do in a safe environment that is a VSCode
but sandboxed. It's called [VSCode Development Host](https://code.visualstudio.com/api/advanced-topics/extension-host). Just do

Do `⌘r` when you modify some files to compile the code. This will refreh the
vscode dev environment and compile the Typescript code.

## Examples

This repo is a collection of examples that are available in VSCode documentation
and GitHub repo but run by me. You know? Learn by example.

### 1. Hello world

Press `⇧⌘P` to run the **Hello word** command. Is a simple message that will
appear in the right bottom corner of your VSCode editor

### 2. Colors example

Press `⇧⌘P` and look for **addColor** command. This will open a view in the
sidebar where you can add some colors. Then open for example a markdow file and
click on one of the colors in the sidebar called `COLORINES`.

### 3. Cat Coding

Press `⇧⌘P` and look for **startCatCodingSession** this will show a webview with
`*.gif` of a cat on keyboard. Aditionally you can press `⇧⌘P` and look for
**doRefactor** and that will change the number of lines done by the cat. The
number of lines is the number that appears under the gif.
