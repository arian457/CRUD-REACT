const bodyParser = require('body-parser')
const express = require ('express')
const cors = require ('cors')
const app = express()
const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '$Antiari601',
    database: 'crudbdd'
})
app.use(cors())
app.use(express.json())
//app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM friends"
    pool.query(sqlSelect, (err, result) => {
       res.send(result)
    })
})
app.post('/api/insert', (req, res) => {
    const friendName = req.body.friendName.trim()
    const friendSur = req.body.friendSur.trim()
    const sqlInsert = "INSERT INTO friends (friendName, friendSur) VALUES (?, ?)"
  pool.query(sqlInsert, [friendName, friendSur], (err, result) => {
  
  })
})
app.put('/api/update/:name/:surname', (req, res) => {
    const name = req.params.name
    const surname = req.params.surname
    const newName = req.body.friendName.trim()
    const newSur = req.body.friendSur.trim()
    console.log(newSur)
    const sqlUpdate = "UPDATE friends SET friendName = ? WHERE friendName = ?"
    const sqlsurUpdate = "UPDATE friend SET friendSur = ? WHERE friendSur = ?"
    pool.query(sqlUpdate, [newName,name], (err, result) => {
        console.log("actualizado!")
    })
    if(newSur){ pool.query(sqlsurUpdate, [newSur, surname], (err, result) => {
        console.log("doblemente actualizado!")
    })}
})
app.delete('/api/delete/:name', (req, res) => {
    const sqlDelete = "DELETE FROM friends WHERE friendName = ?";
    const name = req.params.name
 
    pool.query(sqlDelete, name, (err, result) => {
      if(err) console.log(err)
    })
})

app.listen(3001, () => {
    console.log("Server on port 3001")
})