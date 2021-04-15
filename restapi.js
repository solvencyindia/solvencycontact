
const express = require('express');
const app = express();
const port = process.env.PORT || 7300;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoUrl = "mongodb+srv://solvency:solvency2021@cluster0.yvtn2.mongodb.net/Solvency?retryWrites=true&w=majority";
const cors = require('cors');
const bodyParser = require('body-parser');
let db;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get("/", function(req,res){
    res.send("express is working")
}) 

//orders
app.get('/contactsplace',(req,res) => {
    db.collection('Contact').find({}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
});

//placeorder
app.post('/contacts',(req,res) => {
    db.collection('Contact').insertOne(req.body,(err,result) => {
        if(err){
            throw err
        }else{
            res.send('Data Added')
        }
    })
});

app.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/contactplace');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});


MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log(err);
    db = client.db('Solvency');
    app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Server is running on port ${port}`)
    })
})
