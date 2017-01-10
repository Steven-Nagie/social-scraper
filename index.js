var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan');


app.use(bodyParser.json());
app.use(express.static('./public'))
app.use(morgan('dev'))

app.listen(3000, function () {
  console.log(`listening on port ${this.address().port}`);
})