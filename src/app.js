//Importing dependencies/modules
const express = require('express');
var app = express();
var port = 3000 || process.env.PORT;
var hbs = require('hbs');
var path = require('path');

//Registering Paths to work with
var static_path = path.join(__dirname, '../public');
var template_path = path.join(__dirname, '../templates/views');
var partials_path = path.join(__dirname, '../templates/partials');

//Setting Paths using express
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set('views', template_path);
hbs.registerPartials(partials_path);

//To accept input data from user in the forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Importing Database connection file
require('./db/conn');

//Importing Collection Schema
const BloodCharges = require('./model/register');

//Handling get and post Requests
app.get('/', (req, res) => {
    res.render('BloodForum');
})

app.get('/BloodForum', (req, res) => {
    res.render('BloodForum');
})

app.get('/BloodDetails', async (req, res) => {
    try {
        const charges = await BloodCharges.find().sort({_id:-1}).limit(1);
        const total = charges[0].CBC + charges[0].Platelet + charges[0].Bilirubin;
        const Final = total + (18/100)*total;
        res.render("BloodDetails", {
            CBC: charges[0].CBC,
            Platelet : charges[0].Platelet,
            Bilirubin : charges[0].Bilirubin,
            Final : Final
        });

    } catch (error) {
        console.log(error);
    }
})

app.post('/BloodForum', async (req, res) => {
    try {
        const chargesBlood = new BloodCharges({
            CBC: req.body.CBC,
            Platelet: req.body.Platelet,
            Bilirubin: req.body.Bilirubin
        })
        const SaveDetails = await chargesBlood.save();
        console.log("Charges saved to db");
        res.render("Show");
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})