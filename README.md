# The start.gg API & OBS

This project is designed to allow developers new to JavaScript/TypeScript to grasp basic concepts of the programming language and its core libraries. While the project itself seems simple, developers can expect to learn several critical skills and have the ability to directly apply material learned in early Computer Science courses.

## Development Team

- Matt "TitanHawk17" Dixey -- _Project Mentor_

## Installation and Setup

1. Clone this repository
2. Execute `npm install`
3. You will need to create a `.env` file that contains your start.gg API key and other environment variables. Please only share this file with other developers as it contains secrets that can compromise the security of the project!
4. Execute `node index.js` when ready to test locally

## Introduction & Overview

start.gg (formerly known as smash.gg) is one of the most popular competitive gaming tournament hosting platforms. While known to many gamers for hosting a variety of tournaments for almost every known competitive gaming title, it has an API for developers to access its data.

At the University of Minnesota, our GopherEsports broadcasts contain a ticker on the bottom of viewers' screens with recent match results. The broadcast team uses OBS to stream club events to Twitch. Within the OBS application, broadcasters can have text being displayed to viewers be read directly from a file of choice.

The goal for this project is to query the start.gg API for recently concluded matches involving University of Minnesota (UMN) teams and write it to a file that is being read by OBS. It will be simple, but highly extensible for the development team to add custom features to make for a less-stressful time for the broadcaster behind GopherEsports.

## Tech Stack

Developers can expect to learn the following from this project

1.  JavaScript/TypeScript syntax -- creating custom types, common functions, modulating code
2.  File IO
3.  Communicating with APIs via the Axios library
4.  Beginner Data Science Concepts -- filtering data, data searching
    and more...

## Project Structure

The basic project structure is already in place for the development team. Scattered throughout the various directories are other `README.md` files that contain hints and guidance. These directories include `./services` and `./app`. Development should only take place in these files AND `index.js` unless specifically stated otherwise by the _Project Mentor_.

As always, ask questions, have fun, and happy hacking!
