const alibay = require('./alibay')
const express = require('express')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


/*This function is for testing purposes only*/
app.get('/itemsBought', (req, res) => {
    let uid = req.query.uid;
    res.send(JSON.stringify(alibay.getItemsBought(uid)));
});



app.get('/allItemsBought', (req, res) => {
    let uid = req.body.uid; /*Should we change Query for Body?*/
    res.send(JSON.stringify(alibay.allItemsBought(uid)));
});

app.post('/createListing', (req, res) => {
    let sellerID = req.body.sellerID;
    let price = req.body.price;
    let blurb = req.body.blurb;

    res.send(JSON.stringify(alibay.createListing(sellerID, price, blurb)));
});

app.get('/getItemDescription', (req, res) => {
    let listingID = req.body.listingID; /*Should we change Query for Body?*/
    res.send(JSON.stringify(alibay.getItemDescription(listingID)));
});

app.post('/buy', (req, res) => {
    let buyerID = req.body.buyerID;
    let sellerID = req.body.sellerID;
    let listingID = req.body.listingID;

    res.send(JSON.stringify(alibay.buy(buyerID, sellerID, listingID)));
});

app.get('/allItemsSold', (req, res) => {
    let uid = req.body.uid; /*Should we change Query for Body?*/
    res.send(JSON.stringify(alibay.allItemsSold(uid)));
});

app.get('/allListings', (req, res) => {
    let uid = req.query.uid; /*Should we change Query for Body?*/
    res.send(JSON.stringify(alibay.allListings(uid)));
});

app.get('/searchForListings', (req, res) => {
    let searchTerm = req.query.uid; /*Should we change Query for Body?*/
    res.send(JSON.stringify(alibay.searchForListings(searchTerm)));
});



app.listen(3000, () => console.log('Listening on port 3000!'))
