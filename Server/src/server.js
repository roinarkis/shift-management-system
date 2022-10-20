const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const PORT = 3000;
const MONGO_URL ='mongodb+srv://roinarkis:y7A2IFN9Ae5zxhFJ@shiftusermanagment.au1gxh5.mongodb.net/?retryWrites=true&w=majority';
const server = http.createServer(app);

mongoose.connection.once('open',()=>{
    console.log('DB is ready')
})
async function startServer(){
   await mongoose.connect(MONGO_URL);
    server.listen(PORT,()=>{
        console.log(`Listening on port ... ${PORT}`);
    })
}
startServer();