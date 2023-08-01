const mongoose = require('mongoose')
const app = require('./app')
const http = require('http');

const server  = http.createServer(app);
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://aniroycr7:aniroycr7@cluster0.5kuxqud.mongodb.net/newdata?retryWrites=true&w=majority")
    // mongoose.set('strictQuery', true)

.then(()=>{
    console.log("connection with database succes")
}).catch((err)=>{
    console.log(err)
})


const port = process.env.PORT || 5000;
server.listen(port,()=>{
    console.log('server is up')
});