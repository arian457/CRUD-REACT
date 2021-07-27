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
app.use(bodyParser.urlencoded({extended: true}))

app.post('/api/insert', (req, res) => {
    const friendName = req.body.friendName
    const friendSur = req.body.friendSur
    const sqlInsert = "INSERT INTO friends (friendName, friendSur) VALUES (?, ?)"
  pool.query(sqlInsert, [friendName, friendSur], (err, result) => {
  
  })
})

app.listen(3001, () => {
    console.log("Server on port 3001")
})