/*
 * Module Dependencies
 */

const { app, BrowserWindow, screen } = require('electron');
const config = require('./config');

/*
 * Variables
 */

const INDEX_HTML = './frontend_sources/index.html';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

/*
 * Functions
 */

function getScreenSize() {
  const displays = screen.getAllDisplays();
  let width = 0;
  let height = 0;
  displays.forEach(display => {
    if (typeof display.bounds === 'undefined') {
      return;
    }
    width += display.bounds.width;
    if (height < display.bounds.height) {
      height = display.bounds.height;
    }
  });
  return { width, height };
}

function createWindow() {
  // Get full screen size
  const screenSizeObj = getScreenSize();

  // Create the browser window.
  win = new BrowserWindow({
    x: screenSizeObj.width - config.windowSize.widthPixels,
    y: screenSizeObj.height,
    height: screenSizeObj.height,
    width: config.windowSize.widthPixels,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile(INDEX_HTML);

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

/*
 * Main
 */

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
