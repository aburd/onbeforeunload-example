const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    const indexFile = path.join(__dirname, './index.html')
    res.sendFile(indexFile)
})
app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Got a post')
})
app.listen(3000, () => console.log('ポート3000にアプリを開いてみてください!'))
