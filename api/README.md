# Azure Functions API

This project is an Azure Functions app, that responds to GET, POST, PUT, and DELETE endpoints for heroes.

## Getting Started

1. Create a repository from this template repository <https://github.com/johnpapa/vue-heroes/generate>

1. Enter the name of your new repository as _vue-heroes_

1. Clone your new repository

   ```bash
   git clone https://github.com/your-github-organization/vue-heroes
   cd vue-heroes/api
   ```

1. Create the file `api/local.setting.json` and modify its contents as follows:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  },
  "Host": {
    "CORS": "http://localhost:8080"
  }
}
```

1. Run the app

   ```bash
   npm start
   ```

## Resources

- [Azure Free Trial](https://azure.microsoft.com/free/?wt.mc_id=javascript-0000-jopapa)
- [VS Code](https://code.visualstudio.com?wt.mc_id=javascript-0000-jopapa)
- [VS Code Extension for Node on Azure](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack&WT.mc_id=javascript-0000-jopapa)
- Azure Functions [local.settings.json](https://docs.microsoft.com/azure/azure-functions/functions-run-local#local-settings-file?WT.mc_id=javascript-0000-jopapa) file

### Debugging Resources

- [Debugging Angular in VS Code](https://code.visualstudio.com/docs/nodejs/angular-tutorial?wt.mc_id=javascript-0000-jopapa)
- [Debugging React in VS Code](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial?wt.mc_id=javascript-0000-jopapa)
- [Debugging Vue in VS Code](https://code.visualstudio.com/docs/nodejs/vuejs-tutorial?wt.mc_id=javascript-0000-jopapa)
