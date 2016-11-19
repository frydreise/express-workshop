var express = require("express");
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var postsFile;

fs.readFile(__dirname + '/data/posts.json', function (error, file) {
  postsFile = JSON.parse(file);
});


app.post('/create-post', function (req, res) {

  var time = Math.round(new Date().getTime());
  postsFile[time] = req.body.blogpost;
  var str = JSON.stringify(postsFile);
  fs.writeFile(__dirname + '/data/posts.json', str, function (error) {

	});
  res.redirect('/');

});

app.get('/get-posts', function (req, res) {

    var str = JSON.stringify(postsFile);

    var options = {
	    root: __dirname + '/data/',
	    dotfiles: 'deny',
	    headers: {
	        'x-timestamp': Date.now(),
	        'x-sent': true
	    }
	  };

    res.sendFile('posts.json', options, function (err) {
	    if (err) {
	      console.log(err);
	      res.status(err.status).end();
	    }
    });

});

app.listen(8080, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});