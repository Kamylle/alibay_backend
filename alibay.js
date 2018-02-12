const assert = require('assert');
const fs = require('fs');

let itemsBought = new Map(); // map that keeps track of all the items a user has bought
let itemsSold = new Map();
let listing = new Map();

let loginInfo = {};

/*
Temporary Fake items
*/

listing.set('123', {
    "seller": "sellerNo1",
    "price": "5000000",
    "blurb": "A very nice boat"
});

listing.set('456', {
    "seller": "sellerNo2",
    "price": "1000",
    "blurb": "Faux fur gloves"
});

listing.set('789', {
    "seller": "sellerNo3",
    "price": "100",
    "blurb": "Running shoes",
    "buyer": "buyerNo1"
});

/*
Before implementing the login functionality, use this function to generate a new UID every time.
*/
function genUID() {
    return Math.floor(Math.random() * 100000000)
}

function putItemsBought(userID, value) {
    itemsBought[userID] = value;
}

function getItemsBought(userID) {
    var ret = itemsBought[userID];
    if(ret == undefined) {
        return null;
    }
    return ret;
}
/*
initializeUserIfNeeded adds the UID to our database unless it's already there
parameter: [uid] the UID of the user.
returns: undefined
*/
function initializeUserIfNeeded(uid) {
    var items = getItemsBought[uid];
    if(items == undefined) {
        putItemsBought(uid, {});
    }
}

/* Login */

function signUp(username, password) {
    if(!loginInfos[username] && !undefined) {
        loginInfos[username] = password;
        //fs.writeFileSync('login-infos.txt', JSON.stringify(loginInfos));
        res.send("success");
        console.log("Signed in!")
    }
}
function login(username, password) {
    if (loginInfos[username] === password) {
        res.send("success");
    }
    else {
        res.send("fail");
    }
}
/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: an array of listing IDs
*/
function allItemsBought(buyerID) {
    let arrayOfListings = [];

    var logElements = (value, key, map) => {
        if (value.buyer == buyerID) {
            arrayOfListings.push(key);
        }
    }
    listing.forEach(logElements);
    return arrayOfListings;
}

/* 
createListing adds a new listing to our global state.
This function is incomplete. You need to complete it.
    parameters: 
      [sellerID] The ID of the seller
      [price] The price of the item
      [blurb] A blurb describing the item
    returns: The ID of the new listing
*/
function createListing(sellerID, price, blurb) {
    let listingID = genUID();

    let listingItem = {
        "seller": sellerID,
        "price": price,
        "blurb": blurb
    };
  listing.set(listingID, listingItem);
  return listingID;
}
/* 
getItemDescription returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: An object containing the price and blurb properties.
*/
function getItemDescription(listingID) {
    var item = listing.get(listingID);
    var price = item.price;
    var blurb = item.blurb;

    let itemGot = {
        "price": price,
        "blurb": blurb
    };
    return itemGot;
}
/* 
buy changes the global state.
Another buyer will not be able to purchase that listing
The listing will no longer appear in search results
The buyer will see the listing in his history of purchases
The seller will see the listing in his history of items sold
    parameters: 
     [buyerID] The ID of buyer
     [sellerID] The ID of seller
     [listingID] The ID of listing
    returns: undefined
*/
function buy(buyerID, sellerID, listingID) {
    var item = listing.get(listingID);
    var buyer = item.buyer;
    var seller = item.seller;
    
    if(buyer === undefined && seller != buyerID) {
        item["buyer"] = buyerID;
        itemsSold.set(listingID, item);
        itemsBought.set(listingID, item);
    }
    if (seller === buyerID) {
        return "You can't buy your own items";
    }
}
/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs
*/
function allItemsSold(userID) {
    var arrayOfListings = [];

    var logElements = (value, key, map) => {
        if (value.buyer && value.seller === userID) {
            arrayOfListings.push(key);
        }
    }
    listing.forEach(logElements);
    return arrayOfListings;
}
/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: an array of listing IDs
*/
function allListings(userID) {
    let availableItems = [];

    var logElements = (value, key, map) => {
        if (value.buyer == undefined && value.seller != userID) {
            availableItems.push(key);
        }
    }
    listing.forEach(logElements);
    return availableItems;
}

/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: an array of listing IDs
*/
function searchForListings(searchTerm, userID) {
    let searchedItems = [];

    var logElements = (value, key, map) => {
        if (value.buyer == undefined && value.seller != userID) {
            if (value.blurb.includes(searchTerm)) {
            searchedItems.push(key);
            }
        }
    }
    listing.forEach(logElements);
    return searchedItems;
}
module.exports = {
    genUID, // This is just a shorthand. It's the same as genUID: genUID. 
    initializeUserIfNeeded,
    putItemsBought,
    getItemsBought,
    allItemsBought,
    createListing,
    getItemDescription,
    buy,
    allItemsSold,
    allListings,
    searchForListings


    // Add all the other functions that need to be exported
}
