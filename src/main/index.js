'use strict'

import { app, BrowserWindow, screen, Menu, shell, nativeImage } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

var image = nativeImage.createFromPath(path.join(__dirname, 'src/img/mdSlite.ico'));
// where public folder on the root dir
image.setTemplateImage(true);

function createMainWindow() {
    const window = new BrowserWindow({
        x: screen.getPrimaryDisplay().workAreaSize.width - 300,
        y: 0,
        fullscreen: false,
        resizable: false,
        width: 400,
        height: 400,
        frame: false,
        icon: image
    })

    if (isDevelopment) {
        window.webContents.openDevTools()
    }

    if (isDevelopment) {
        window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
    }
    else {
        window.loadURL(formatUrl({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }))
    }

    window.on('closed', () => {
        mainWindow = null
    })

    window.webContents.on('devtools-opened', () => {
        window.focus()
        setImmediate(() => {
            window.focus()
        })
    })

    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {
                    label: 'Readme', click() {
                        shell.openExternal('https://github.com/MoshiLi95/MDSlite.git')
                    }
                },
                {
                    label: 'Open DevTool',
                    click() {
                        window.webContents.openDevTools()
                    }
                },
                {
                    label: 'Quit',
                    click() {
                        app.quit()
                    }
                }
            ]
        }
    ])
    Menu.setApplicationMenu(menu);

    return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    /*
    if (process.platform !== 'darwin') {
        app.quit()
    }*/
    app.quit()
})

app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow()
    }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
    mainWindow = createMainWindow()
})