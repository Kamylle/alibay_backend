const assert = require('assert');
const fs = require('fs');

let itemsBought = new Map(); // map that keeps track of all the items a user has bought
let itemsSold = new Map();
let listing;

let loginInfos = {};

/*Converting Maps into Json*/
function mapToJson(map) {
    let arr = [];
    var loopTrough = (value, key, map) => {
        arr.push([key, value]);
    }
    listing.forEach(loopTrough);
    return JSON.stringify(arr);
}

/*File write and read*/
let listingData = fs.readFileSync('listing-infos.txt');
let parsedData = JSON.parse(listingData);
listing = new Map(parsedData);


let loginData = fs.readFileSync('login-infos.txt').toString();
loginInfos = JSON.parse(loginData);


/*
Before implementing the login functionality, use this function to generate a new UID every time.
*/
function genUID() {
    var random = Math.floor(Math.random() * 1000000000000);
    return random.toString();
    //return random;
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
    let uID = genUID();
    try {
        if(loginInfos[username] !== undefined) {
            return "Username not available";
        }
        else {
            loginInfos[username] = {};
            loginInfos[username].password = password;
            loginInfos[username].userID = uID;
            fs.writeFileSync('login-infos.txt', JSON.stringify(loginInfos));
            return "success";
        }
    }
    catch(err) {
        return "Signup Failed"
    }
}

function login(username, password) {
    try {
        if (loginInfos[username].password === password) {
            // console.log(loginInfos[username]);
            return loginInfos[username].userID;
        }
        else {
            return "fail";
        }
    }
    catch(err) {
        return "Login Failed"
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
function createListing(sellerID, price, blurb, imagePath, description) {

    let listingID = genUID();

    let listingItem = {
        "seller": sellerID,
        "price": price,
        "blurb": blurb,
        "buyer": false,
        "imagePath": imagePath,
        "description": description
    };
  listing.set(listingID, listingItem);
  fs.writeFileSync('listing-infos.txt', mapToJson(listing));
  return listingID;
}
/* 
getItemDescription returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: An object containing the price and blurb properties.
*/
function getItemDescription(listingID) {
    // console.log(listing, listingID);
    var item = listing.get(listingID);
    var price = item.price;
    var blurb = item.blurb;
    var seller = item.seller;
    var description = item.description;
    var imagePath = item.imagePath;

    let itemGot = {
        "price": price,
        "blurb": blurb,
        "seller": seller,
        "description": description,
        "imagePath": imagePath
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
function buy(buyerID, listingID) {
    var item = listing.get(listingID);
    var buyer = item.buyer;
    var seller = item.seller;
    
    if (seller === buyerID) {
        return "You can't buy your own items";
    }
    if(!buyer) {
        item["buyer"] = buyerID;
        //item.buyer = buyerID;
        //listing.set(listingID, {...item, buyer: buyerID});
        itemsSold.set(listingID, item);
        itemsBought.set(listingID, item);
        fs.writeFileSync('listing-infos.txt', mapToJson(listing));
        return "Purchase successful!";
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
        if (value.buyer != false && value.seller === userID) {
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
        if (!value.buyer && userID !== value.seller) {
            availableItems.push(key);
        }
    }
    listing.forEach(logElements);
    // console.log(listing, availableItems)
    return availableItems;
}

/*returns the IDs of all items put to sell by user */
function itemsToSell(userID) {
    let itemsToSell = [];
    var logElements = (value, key, map) => {
        if (!value.buyer && userID === value.seller) {
            itemsToSell.push(key);
        }
    }
    listing.forEach(logElements);
    // console.log(listing, availableItems)
    return itemsToSell;
}

/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: an array of listing IDs
*/
function searchForListings(searchTerm) {
    let searchedItems = [];

    var logElements = (value, key, map) => {
        if (value.buyer == false) {
            if (value.blurb.includes(searchTerm)) {
            searchedItems.push(key);
            }
        }
    }
    listing.forEach(logElements);
    return searchedItems;
}

/*
getUsername takes a userID as a parameter and returns the username related
*/
function getUsername(uID) {
    for (var key in loginInfos) {
        if (loginInfos[key].userID === uID && uID !== undefined) {
            return key;
        }
    }
}

/*
Image upload
*/
function uploadImage(extension, requestBody) {
    const randomString = '' +  Math.floor(Math.random() * 9999999999999);
    const filename = randomString + '.' + extension;
    fs.writeFileSync('img/' + filename, requestBody);
    return filename;
}

/*
Remove Item 
*/

// function removeItem(userID) {
//     var arrayOfListings = [];

//     var logElements = (value, key, map) => {
//         if (value.seller === userID && value.buyer === userID) {
//             arrayOfListings.pop(key);
//         }
//     }
//     listing.forEach(logElements);
//     return arrayOfListings;
// }

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
    searchForListings,
    signUp,
    login,
    getUsername,
    uploadImage,
    itemsToSell



    // Add all the other functions that need to be exported
}
