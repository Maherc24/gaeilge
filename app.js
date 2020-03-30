var express = require('express');
var app = express();
var loginController = require('./controller/loginController');
var path = require('path');
var EJS  = require('ejs');

app.get('/home', function (req, res) {
    res.render('home', {title: 'title'});
  });
app.engine('html', EJS.renderFile);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./public'));
loginController(app);

app.listen(3000);