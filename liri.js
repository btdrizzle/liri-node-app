require("dotenv").config();
const fs = require('fs');
const inquirer = require('inquirer');
const moment = require('moment');
const bandsintown = require('bandsintown')(process.env.BANDS_IN_TOWN);
const Spotify = require('node-spotify-api');
const spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
const omdb = require('omdb-client');

switch(process.argv[2]) {
    case "concert-this":  
     //   let url = `"https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp"`;
        inquirer
        .prompt([
            // Here we create a basic text prompt.
            {
            type: "input",
            message: "For which artist/band do you want to see events?",
            name: "artist",
            default: "Drake"
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
        inquirer
        .prompt([
            // Here we create a basic text prompt.
            {
            type: "input",
            message: "For which song do you want to search?",
            name: "song",
            default: "The Sign Ace of Base"
            },
            
        ])
            .then(function(inquirerResponse) {
                spotify
            .search({ type: 'track', query: inquirerResponse.song, limit: 2 })
            .then(function(response) {
                searchNum = 1;
                response.tracks.items.forEach(item => {
                    console.log(`Search result number ${searchNum}`)
                    console.log(`Artist name: ${item.album.artists[0].name}`);
                    console.log(`Song Name: ${item.name}`);
                    console.log(`Preview Link: ${item.preview_url}`);
                    console.log(`Album: ${item.album.name}`);
                    console.log("====================");
                    searchNum++;
              })
            })
            .catch(function(err) {
                console.log(err);
            });
        });
        break;
        
    case "movie-this":
        inquirer
        .prompt([
            {
                type: "input",
                message: "For which movie do you want to search?",
                name: "movie",
                default: "Mr. Nobody"
                },

        ])
        .then(function(inquirerResponse) {
            omdb.get({ apiKey: process.env.OMDB_KEY,title: inquirerResponse.movie,plot:'full',incTomatoes:true},function(err, movie) {
                if(err) {
                    return console.error(err);
                }
                console.log(`Movie: ${movie.Title}`); 
                console.log(`Released: ${movie.Released}`);
                console.log(`IMDB Rating: ${movie.imdbRating}`);
                console.log(`Country: ${movie.Country}`);
                console.log(`Rotten Tomatoes Rating: ${movie.tomatoRating}`);
                console.log(`Actors: ${movie.Actors}`);
                console.log(`Full Plot: ${movie.Plot}`);
            });
        });
        break;
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function(error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
            return console.log(error);
            }
            // Then split it by commas (to make it more readable)
            const dataArr = data.split(",");
        
            //Use switch case from above here to perform any operation
            switch(dataArr[0]) {
                case "concert-this":
                    bandsintown
                    .getArtistEventList(dataArr[1])
                    .then(function(events) {
                    events.forEach(event => {
                        let parsedDate = moment(event.datetime, moment.ISO_8601).format('MM/DD/YYYY');
                        console.log(`Artist: ${dataArr[1]}`);
                        console.log(`Playing at: ${event.venue.name}`);
                        console.log(`Location: ${event.venue.city}, ${event.venue.region}`);
                        console.log(`Date: ${parsedDate}`);
                    })
                    });
                    break;
                case "spotify-this-song":
                    spotify
                    .search({ type: 'track', query: dataArr[1], limit: 2 })
                    .then(function(response) {
                        searchNum = 1;
                        response.tracks.items.forEach(item => {
                            console.log(`Search result number ${searchNum}`)
                            console.log(`Artist name: ${item.album.artists[0].name}`);
                            console.log(`Song Name: ${item.name}`);
                            console.log(`Preview Link: ${item.preview_url}`);
                            console.log(`Album: ${item.album.name}`);
                            console.log("====================");
                            searchNum++;
                    })
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
                    break;
                case "movie-this":
                    omdb.get({ apiKey: process.env.OMDB_KEY,title: dataArr[1],plot:'full',incTomatoes:true},function(err, movie) {
                        if(err) {
                            return console.error(err);
                        }
                        console.log(`Movie: ${movie.Title}`); 
                        console.log(`Released: ${movie.Released}`);
                        console.log(`IMDB Rating: ${movie.imdbRating}`);
                        console.log(`Country: ${movie.Country}`);
                        console.log(`Rotten Tomatoes Rating: ${movie.tomatoRating}`);
                        console.log(`Actors: ${movie.Actors}`);
                        console.log(`Full Plot: ${movie.Plot}`);
                    });
            }
        
        });


}