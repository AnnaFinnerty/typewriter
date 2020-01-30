const express = require('express');

const port = 3005;

const app = express();

const path = require('path');

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, function () {
    console.log("Server is running on "+ port +" port");
});