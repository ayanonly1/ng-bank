const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 8080);
app.get('/*', function (req, res){
  res.sendfile(path.join(__dirname + '/dist/index.html'));
});

console.log('Listening');