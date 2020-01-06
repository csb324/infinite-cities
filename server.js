// clara says
//     __          __    __             
//    / /_  ____  / /___/ /  __  ______ 
//   / __ \/ __ \/ / __  /  / / / / __ \
//  / / / / /_/ / / /_/ /  / /_/ / /_/ /
// /_/ /_/\____/_/\__,_/   \__,_/ .___/ 
//                             /_/      
// don't worry about this 
// It's a web server.
// if you want to know more, => notes/whats-a-web-server.md

var express = require('express');
var app = express();

app.use(express.static('dist'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});


app.get("/style.css", function (request, response) {
  response.set({
    'Content-Type': 'text/css'
  });
  response.sendFile(__dirname + '/public/style.css');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  console.log('change');
});