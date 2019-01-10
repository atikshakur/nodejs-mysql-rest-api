const express = require("express")
const app = express()
const morgan = require("morgan")
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(morgan("short"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('./post-news'))

app.get("/", (req, res) => {
    console.log("Hello from root");
    res.sendfile('index.html')
})

const latestNewsRoute = require('./routes/latest.js')
app.use(latestNewsRoute)

const trendingNewsRoute = require('./routes/trending.js')
app.use(trendingNewsRoute)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => console.log("Server is up and running..."))
