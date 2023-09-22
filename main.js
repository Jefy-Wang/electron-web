// app  模块，它控制着应用程序的事件生命周期
// BrowserWindow 模块，它创建和管理应用程序窗口
const { app, BrowserWindow } = require('electron')

// 将 index.html 加载进一个新的 BrowserWindow 实例
// 紧接着打开一个新窗口
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

// 在 Electron 中，只有在 app 模块的 ready 事件被激发后
// 才能创建浏览器窗口。您可以通过使用 app.whenReady() API来监听此事件
// 在 whenReady() 成功后调用 createWindow()
app.whenReady().then(() => {
  createWindow()
})
