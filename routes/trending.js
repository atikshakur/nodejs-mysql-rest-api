const express = require('express')
const mysql = require('mysql')
const router = express.Router()

//Get all data
router.get("/trending", (req, res) => {
    console.log("Responding to TRENDING NEWS route");

    getConnection().query("SELECT * FROM trending", (error, rows, fields) => {
        console.log('Running sql queries')
        if (error) throw error

        res.json(rows)
    })
})

//Get data by id
router.get("/trending/:id", (req, res) => {
    const userId = req.params.id
    const queryString = "SELECT * FROM latest WHERE id = ?"
    getConnection().query(queryString, [userId], (error, rows, fields) => {
        res.json(rows)
    })
})

//Post data using html form
router.post('/post-trending-submitted', (req, res) => {
    console.log('title:' + req.body.submit_title);

    let title = req.body.submit_title
    let writter = req.body.submit_writter
    let category = req.body.submit_category
    let imageLink = req.body.submit_image_link
    let news1 = req.body.submit_news1
    let news2 = req.body.submit_news2
    let news3 = req.body.submit_news3

    const queryString = "INSERT INTO trending (title, writter, category, image_link, news1, news2, news3) VALUES (?, ?, ?, ?, ?, ?, ?)"
    getConnection().query(queryString, [title, writter, category, imageLink, news1, news2, news3], (error, results, fields) => {
        if (error) {
            console.log("Inserting error: " + error);
            res.sendStatus(500)
            return
        }
        else
            res.send("Submitted")
        res.end()
    })
})

//Delete data by id
router.delete("/trending/:id", (req, res) => {
    const queryString = "DELETE FROM trending WHERE id = ?";
    const userID = req.params.id
    getConnection().query(queryString, [userID], (error, rows, fields) => {
        if (error)
            console.log(error);
        else
            res.send("Deleted")
    })
})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'Schema here',
    user: 'root',
    password: 'root',
    database: 'DB link here'
})

function getConnection() {
    return pool
}

module.exports = router