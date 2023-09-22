// app  模块，它控制着应用程序的事件生命周期
// BrowserWindow 模块，它创建和管理应用程序窗口
const { app, BrowserWindow } = require('electron')
const path = require('node:path')

// 将 index.html 加载进一个新的 BrowserWindow 实例
// 紧接着打开一个新窗口
const createWindow = () => {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload/index.js')
    }
  })

  // 加载 index.html
  mainWindow.loadFile('index.html')

  // 打开开发工具
  // mainWindow.webContents.openDevTools()
}

// 在 Electron 中，只有在 app 模块的 ready 事件被激发后
// 才能创建浏览器窗口。您可以通过使用 app.whenReady() API来监听此事件
// 在 whenReady() 成功后调用 createWindow()
app.whenReady().then(() => {
  createWindow()

  // 如果没有窗口打开，则打开一个新窗口
  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 监听 app 模块的 window-all-closed 事件
// 在关闭所有窗口时，退出应用
// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
