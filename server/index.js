var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
const routes = require('./routes/routes');
var app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/taskManager');

mongoose.connection.on('connected', ()=>{
    console.log('mongodb connected on port 27017');
});

mongoose.connection.on('error', (error)=>{
    console.log('failed to connect:', error)
});

const port = 3000;

//adding middleware
app.use(cors());

app.use(bodyParser.json());

app.use('/api', routes);

app.get('/', (requst, response)=>{
    response.send('hello')
})

app.listen(port, ()=>{
    console.log('server has started at port ', port);
})
