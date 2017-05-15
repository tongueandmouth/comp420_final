var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var db

app.set('port', (process.env.PORT || 4000))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

var dbaddr = 'mongodb://bsing:73@ds143221.mlab.com:43221/elfpubliclibrary'

MongoClient.connect(dbaddr, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(app.get('port'), function() {
    console.log('I am listening on port ' + app.get('port'));
  })
})

app.get('/', (req, res) => {
    var cursor = db.collection('library').find().toArray(function(err, result) {
            if (err) return console.log(err)

            res.render('index.ejs', {library: result})
    })
})

app.post('/freedom', (req, res) => {
	req.body.done = false
    db.collection('library').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Successfully saved to database')
        res.redirect('/')
    })
})