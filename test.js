const alibay = require('./alibay');
var assert = require('assert');

function test() {
    let sellerID = alibay.genUID();
    let buyerID = alibay.genUID();

    // alibay.initializeUserIfNeeded(sellerID)
    // alibay.initializeUserIfNeeded(buyerID)

    // let listing1ID = alibay.createListing(sellerID, 500000, "A very nice boat")
    // let listing2ID = alibay.createListing(sellerID, 1000, "Faux fur gloves")
    // let listing3ID = alibay.createListing(sellerID, 100, "Running shoes")
    // let product2Description =  alibay.getItemDescription(listing2ID)

    // alibay.buy(buyerID, sellerID, listing2ID)
    // alibay.buy(buyerID, sellerID, listing3ID)

    // let allSold = alibay.allItemsSold(sellerID)
    // let soldDescriptions = allSold.map(alibay.getItemDescription)
    // let allBought = alibay.allItemsBought(buyerID)
    // let allBoughtDescriptions = allBought.map(alibay.getItemDescription)
    // let listings =  alibay.allListings()
    // let boatListings = alibay.searchForListings("boat")
    // let shoeListings = alibay.searchForListings("shoes")
    // let boatDescription = alibay.getItemDescription(listings[0])
    // let boatBlurb = boatDescription.blurb;
    // let boatPrice = boatDescription.price;
    // assert(allSold.length == 2); // The seller has sold 2 items
    // assert(allBought.length == 2); // The buyer has bought 2 items
    // assert(listings.length == 1); // Only the boat is still on sale
    // assert(boatListings.length == 1); // The boat hasn't been sold yet
    // assert(shoeListings.length == 0); // The shoes have been sold
    // assert(boatBlurb == "A very nice boat");
    // assert(boatPrice == 500000);

    //let signupTry1 = alibay.signUp("b", "b");
    //let loginTry1 = alibay.login("b", "b");
    //let loginTry2 = alibay.login("d", "d");
    let signupTry2 = alibay.signUp(" ", " ");
    let signupTry3 = alibay.signUp("123");

    //assert(signupTry1 == "success");
    //assert(loginTry1 == "22226308");
    //assert(loginTry2 == "fail");
    console.log(signupTry2);
    console.log(signupTry3);
    assert(signupTry2 == "Username is not defined");
    assert(signupTry3 == "Password is not defined");

}
test();
