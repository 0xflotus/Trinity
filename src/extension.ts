// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { stringify } from 'querystring';


const fs=require("fs");
const parseExtract=require("./modules/parseExtract.js");
const { OutlineProvider }=require("./modules/OutlineProvider.js");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "trinity" is now active!');

  const tChannel=vscode.window.createOutputChannel('trinity');

  const OP=new OutlineProvider();
  vscode.window.registerTreeDataProvider("package-dependencies", OP);


  let newThing=vscode.commands.registerCommand('package-dependencies.executeTask', task => {
    vscode.tasks.executeTask(task).then(function (value) {
      return value;
    }, function (e) {
      console.error('Error');
    });
  });

  context.subscriptions.push(newThing);


  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable=vscode.commands.registerCommand('extension.helloWorld', () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World! This is trinity!');
  });

  context.subscriptions.push(disposable);
  // In the context of this extension-
  // On a Save of a text document in a workspace (which is an event listener)
  // We pass the event into handle save
  context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(event => handleSave(event)));

}

// We recieve the event from the file that is being saved in the onDidSavetextDocument listener
function handleSave(event: vscode.TextDocument) {

  // console logging and reading the file that we have saved and converting it to string 
  const result=parseExtract(fs.readFileSync(event.fileName).toString());

  console.log(result);

}

// this method is called when your extension is deactivated
export function deactivate() { }
