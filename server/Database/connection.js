const mongoose = require('mongoose')

function RunServer(){
    try {
        mongoose.connect('mongodb+srv://root:mynameisjack77950@jobapp.1s8es.mongodb.net/?retryWrites=true&w=majority&appName=JobApp');
        console.log("MongoDb Connected");
        
    } catch (error) {
        console.log("Not Connected");
        
    }
}

module.exports = RunServer;