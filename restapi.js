
const express = require('express');
const app = express();
const port = process.env.PORT;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoUrl = "mongodb+srv://solvency:solvency2021@cluster0.yvtn2.mongodb.net/Solvency?retryWrites=true&w=majority";
const cors = require('cors');
const bodyParser = require('body-parser');
let db;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
    res.send(`<div><a href='https://solvencycontact.herokuapp.com/contacts'>Contacts</a></div>`)
})

//orders
app.get('/contacts',(req,res) => {
    db.collection('Contact Form').find({}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
});

//placeorder
app.post('/placeorder',(req,res) => {
    db.collection('Contact Form').insertOne(req.body,(err,result) => {
        if(err){
            throw err
        }else{
            res.send('Data Added')
        }
    })
});


MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log(err);
    db = client.db('Solvency');
    app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Server is running on port ${port}`)
    })
})
