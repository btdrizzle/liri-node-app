# Node App: Liri

## Description

This app searches three different things depending on your interests: musical artist concert dates, song info via Spotify, and movie info via IMDB(via OMDB).  

To make the app work, make sure you download all node modules.  You will also need your own API Key for three modules in NPM: Bands in Town, Spotify, and OMDB-Client.

## Functionality

To use the app, run "node liri.js" in your command prompt in the cloned repo followed by your choice:

* concert-this (for Bands in Town)
* spotify-this-song (for Spotify)
* movie-this (for OMDB movie query)

The prompts will ask which artist/song/movie for which you'd like to search and return information to the command line.

There is another option to run "do-what-it-says".  This will take values in the random.txt file in the repo and run whichever search is defined.  Parameters in random.txt must be formatted as per example: spotify-this-song,"I want it that way" with a choice for which search you want to make, followed by the title in quotes if any spaces exist within.

I hope you enjoy the app!