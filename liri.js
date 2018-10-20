require("dotenv").config();
const keys = require("./keys");
//const spotify = new Spotify(keys.spotify);
const fs = require('fs');
var inquirer = require('inquirer');
var moment = require('moment');
var bandsintown = require('bandsintown')(process.env.BANDS_IN_TOWN);

switch(process.argv[2]) {
    case "concert-this":  
     //   let url = `"https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp"`;
        inquirer
        .prompt([
            // Here we create a basic text prompt.
            {
            type: "input",
            message: "For which artist/band do you want to see events?",
            name: "artist"
            },
            
        ])
        .then(function(inquirerResponse) {
            bandsintown
            .getArtistEventList(inquirerResponse.artist)
            .then(function(events) {
            events.forEach(event => {
                let parsedDate = moment(event.datetime, moment.ISO_8601).format('MM/DD/YYYY');
                console.log(`Artist: ${inquirerResponse.artist}`);
                console.log(`Playing at: ${event.venue.name}`);
                console.log(`Location: ${event.venue.city}, ${event.venue.region}`);
                console.log(`Date: ${parsedDate}`);
            })
            });

        });
        
        break;
    case "spotify-this-song":
        let songName = process.argv[3];
        break;
    case "movie-this":
        let movieName = process.argv[3];
        break;
    case "do-what-it-says":


}