var sqlite3 = require('sqlite3')
var path = require('path')

const db = new sqlite3.Database(path.join(__dirname, './gcs.db'), (err) => {
    console.log(err)
})

module.exports = db