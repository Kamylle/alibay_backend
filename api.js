const alibay = require('./alibay');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.raw({ type: 'image/*', limit: '20mb' })); // To allow for image uploads.
app.use(bodyParser.json());
app.use(express.static('images'));

function generateUUID(){
    var d = new Date().getTime(),
        pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  
    return pattern.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0
      d = Math.floor(d/16)
      return (c=='x' ? r : (r&0x3|0x8)).toString(16)
    })
}

app.use(session({
    genid: function(req) {
      return generateUUID() // use UUIDs for session IDs
    },
    secret: 'mimainkabooskifu',
    cookie: {
        maxAge: 3600000 // 1 hour
    }
}))

app.get('/check', (req, res) => {
    if (req.session.uid) {
        res.send(JSON.stringify(req.session.uid));
    }
    else {
        res.send(JSON.stringify("no cookies"));
    }
});

/* Login */

app.post('/signUp', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    res.send(JSON.stringify(alibay.signUp(username, password)));
    req.session.uid = alibay.login(username, password);
})

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    req.session.uid = alibay.login(username, password);
    res.send(JSON.stringify(alibay.login(username, password)));
})

app.post('/logout', (req, res) => {
    req.session.destroy();
});


/*This function is for testing purposes only*/
app.get('/itemsBought', (req, res) => {
    let uid = req.query.uid;
    res.send(JSON.stringify(alibay.getItemsBought(uid)));
});

app.get('/allItemsBought', (req, res) => {
    let uid = req.query.uid;
    res.send(JSON.stringify(alibay.allItemsBought(uid)));
});

app.post('/createListing', (req, res) => {
    let sellerID = req.body.sellerID;
    let price = req.body.price;
    let blurb = req.body.blurb;
    res.send(JSON.stringify(alibay.createListing(sellerID, price, blurb)));
});

app.post('/uploadedPictures', (req, res) => {
    // Splits on all dots, but returns (pop) the extension (last piece)
    // const extension = req.query.ext.split('.').pop(); 
    // const randomString = '' +  Math.floor(Math.random() * 9999999999999);
    // const randomFilename = randomString + '.' + extension;
    // fs.writeFileSync('images/' + randomFilename, req.body);
    // res.send(randomFilename);
    const extension = req.query.ext.split('.').pop(); 
    const requestBody = req.body;
    res.send(JSON.stringify(alibay.uploadImage(extension, requestBody)));

})

app.post('/getItemDescription', (req, res) => {
    let listingID = req.body.listingID;
    res.send(JSON.stringify(alibay.getItemDescription(listingID)));
});

app.post('/buy', (req, res) => {
    let buyerID = req.body.buyerID;
    let listingID = req.body.listingID;

    res.send(JSON.stringify(alibay.buy(buyerID, listingID)));
});

app.get('/allItemsSold', (req, res) => {
    let uid = req.query.uid; /*Should we change Query for Body?*/
    res.send(JSON.stringify(alibay.allItemsSold(uid)));
});

app.get('/allListings', (req, res) => {
    let uid = req.query.uid;
    res.send(JSON.stringify(alibay.allListings(uid)));
});

app.post('/searchForListings', (req, res) => {
    let searchTerm = req.body.searchTerm; /*Should we change Query for Body?*/
    // console.log(searchTerm)
    res.send(JSON.stringify(alibay.searchForListings(searchTerm)));
});

app.get('/getUsername', (req, res) => {
    let userID = req.query.userID;
    res.send(JSON.stringify(alibay.getUsername(userID)));
});

app.get('/removedItems', (req, res) => {
    let uid = req.query.uid;
    res.send(JSON.stringify(alibay.removeItem(uid)));
});

app.listen(4000, () => console.log('Listening on port 4000!'))