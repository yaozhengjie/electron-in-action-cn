const { app, BrowserWindow } = require('electron');
const { dialog } = require('electron');

const fs = require('fs');

const windows = new Set();
// require('@electron/remote/main').initialize();

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true, //增加该配置，默认是false，新版本不能使用remote
        },
        show: false
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    require('@electron/remote/main').initialize();
    require('@electron/remote/main').enable(mainWindow.webContents);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        console.log('ready-to-show');
        // dialog.showOpenDialog(mainWindow, {
        //         properties: ['openFile']
        //     }).then(result => {
        //         console.log(result.canceled)
        //         console.log(result.filePaths)
        //     }).catch(err => {
        //         console.log(err)
        //     })
        // getFileFromUser();
    });

    mainWindow.on('closed', () => {
        // windows.delete(mainWindow);
        mainWindow = null;
    });

    mainWindow.webContents.openDevTools();
});


exports.getFileFromUser = () => {
    const files = dialog.showOpenDialogSync(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Text Files', extensions: ['txt'] },
            { name: 'Markdown Files', extensions: ['md', 'markdown'] }
        ]
    });
    console.log('4444');
    //阻塞
    if (!files) { return; }
    console.log(files[0]);

    if (files) { openFile(files[0]); } // 有的话，就传文件名进来，return 数据流
};

const openFile = (file) => {
    const content = fs.readFileSync(file, 'utf-8').toString(); // chang to string get wrong
    console.log(content);
    mainWindow.webContents.send('file-opened', file, content); // B

};