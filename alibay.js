const assert = require('assert');
const fs = require('fs');

let itemsBought = {}; // map that keeps track of all the items a user has bought
let itemsSold = {};
let listing = {};


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

/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: an array of listing IDs
*/
function allItemsBought(buyerID) {
    return itemsBought[buyerID];    
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
        "sellerID": sellerID,
        "price": price,
        "blurb": blurb,
    };

  listing[listingID] = listingItem;

  return listingID;
}

/* 
getItemDescription returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: An object containing the price and blurb properties.
*/
function getItemDescription(listingID) {
    let itemGot = {
        "price": listing[listingID].price,
        "blurb": listing[listingID].blurb 
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
    console.log("BUYING!")
    if(listing[listingID].buyer === undefined /*&& buyerID != sellerID*/) {
        console.log("In the loop!")
        listing[listingID].buyer = buyerID;
        itemsSold[sellerID].concat(listing[listingID]);
        itemsBought[buyerID].concat(listing[listingID]);
    }
    console.log("BOUGHT!")
}


/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs
*/
function allItemsSold(sellerID) {
    return itemsSold[sellerID];
}

/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: an array of listing IDs
*/
function allListings() {
    let availableItems = []

    for (let item in listing) {
        if (!listing[item].buyer) {
          availableList.concat(item);
        }
    }

    return availableItems;
}

/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: an array of listing IDs
*/
function searchForListings(searchTerm) {
    let searchedItems = [];

    for (let item in listing) {
        if (!listing[item].buyer) {
            if (listing[item].blurb.includes(searchTerm)) {
                searchedItems.push(item);
            }
        }
    }
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
