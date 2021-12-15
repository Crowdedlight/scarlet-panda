var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {

    // load json files
    let dataColour = require('../public/colours.json');
    let dataAnimal = require('../public/animals.json');

    let colour = null
    let animal = null

    // find colour not used
    let filteredAry = dataColour.filter(e => e.used !== true)
    colour = filteredAry[Math.floor(Math.random() * filteredAry.length)];

    // find animal
    filteredAry = dataAnimal.filter(e => e.used !== true)
    animal = filteredAry[Math.floor(Math.random() * filteredAry.length)];

    let finalName = colour.data + " " + animal.data

    // find the elements in the original array
    let foundIndex = dataColour.findIndex(x => x.data === colour.data);
    dataColour[foundIndex].used = true;

    foundIndex = dataAnimal.findIndex(x => x.data === animal.data);
    dataAnimal[foundIndex].used = true;

    // check if we need to reset entire list
    let unusedListCol = dataColour.filter(e => e.used !== true)
    let unusedListAni = dataAnimal.filter(e => e.used !== true)

    // if no unused, then we reset everyone
    if (unusedListCol.length === 0) {
        dataColour.forEach(element => element.used = false)
    }

    if (unusedListAni.length === 0) {
        dataAnimal.forEach(element => element.used = false)
    }

    // persist data
    let fs = require('fs');
    fs.writeFileSync('public/colours.json', JSON.stringify(dataColour));
    fs.writeFileSync('public/animals.json', JSON.stringify(dataAnimal));

    res.render('index', {title: 'Lets Play:', name: finalName});
});
module.exports = router;
