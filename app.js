var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb').MongoClient;
    var db = '';

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.post('/dbPost', function(req, res) {
  console.log(req.body);
  var data = req.body;
  var val = {
    fname: data['fname'],
    lname: data['lname'],
    email: data['email'],
    location: data['location'],
    company: data['company'],
    gender: data['gender'],
  }

  var noerrFlag = true;
  for(let ele in val) {
    if(val[ele] == undefined) {
      console.log(val[ele]);
      noerrFlag = false;
    }
  }

  console.log('sending')

  if(!noerrFlag) {
    res.send(noerrFlag);
  } else {
    db.collection('users').insertOne(data, function(err, data) {
      if(!err) {res.send(noerrFlag)}
    })
  }

  // db.collection('users').insert(data, function(err, data) {
  //   if(!err) {
  //     flg = 'true'
  //     res.send(flg);
  //   }
  // });
})

app.get('/getData', function(req, res) {
  db.collection('users').find({}).toArray(function(err, data) {
    if(!err) {
      res.send(data);
    }
  })
})

mongodb.connect('mongodb://localhost/3000', function(err, client) {
  if(!err) {
      app.listen(3000, function() {
      console.log('Server is running!!');
    });
    db = client.db('app1'); //Loading the database
    console.log(db);
  } else {
    console.log(err);
  }
});
