var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb');
    var db = '';

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));


//Rendering Index.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

//Insert
app.post('/dbPost', function(req, res) {
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
      noerrFlag = false;
    }
  }

  if(!noerrFlag) {
    res.send(noerrFlag);
  } else {
    db.collection('users').insertOne(data, function(err, data) {
      if(!err) {res.send(noerrFlag)}
    })
  }

})

//Returning Data
app.get('/getData', function(req, res) {
  db.collection('users').find({}).toArray(function(err, data) {
    if(!err) {
      res.send(data);
    }
  })
})

//Delete Operations
app.post('/remData', function(req, res) {

  // var obId = new mongodb.ObjectID(req.body.id)

  db.collection('users').deleteOne({"_id" : new mongodb.ObjectID(req.body.id)}, function(err, data) {
    if(err) {
      console.log(err)
    } else {
      res.send(true);
    }
  });

  // db.collection('users').findOneAndDelete({"_id": obId}, function(err, data) {
  //   if(err) {
  //     console.log('Error is there');
  //   } else {
  //     console.log(data);
  //     res.send(true);
  //   }
  // })
})

//Mongo and App.Listen
mongodb.connect('mongodb://localhost/3000', function(err, client) {
  if(!err) {
      app.listen(3000, function() {
      console.log('Server is running!!');
    });
    db = client.db('app1'); //Loading the database
  } else {
  }
});
