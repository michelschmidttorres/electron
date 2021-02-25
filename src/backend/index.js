const { ipcMain } = require('electron')

const pathsToRows = require('./pathsToRows')
const prepareData = require('./prepareData')
const groupWords = require('./groupWords')

ipcMain.on('process-subtitles', (event, paths) => {
  //  console.log(paths)
try {
    pathsToRows(paths)
    .then(rows => prepareData(rows))
    .then(words => groupWords(words))
    .then(groupedWords => event.reply('process-subtitles', groupedWords))
} catch (error) {
    console.log(error)
}

})
