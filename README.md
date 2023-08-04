# The start.gg API & OBS

This project is designed to allow developers new to JavaScript/TypeScript to grasp basic concepts of the programming language and its core libraries. While the project itself seems simple, developers can expect to learn several critical skills and have the ability to directly apply material learned in early Computer Science courses.

## How To Use

1. Clone this repository.
2. Inside the root project directory, run `npm install` in a terminal to install all the required dependencies.
3. Go to [start.gg](https://start.gg). Create an account or log in if you already have one.
4. Go back to the [homepage](https://start.gg). You will see your profile icon/picture in the bottom left corner. Click on it and select `Developer Settings` from the menu that appears.
5. Create a new `Personal Access Token`. Make sure to copy this as you won't be able to see it after you close the modal.
6. Inside the root project directory, create a new file named `.env`.
7. Inside the `.env` file you created, write the following line: `STARTGG_KEY=[YOUR_KEY_HERE]`. Replace `[YOUR-KEY_HERE]` with what you copied earlier in step 5.
8. You are now ready to use the application! See below for some example commands for Rocket League tournaments.

## Example Commands & Use Cases

The general usage of the program follows this structure:
`npm start "FULL_SCHOOL_NAME" "SCHOOL_ABBREVIATION" "SLUG" "OUTPUT_FILE_PATH" "INITIAL_TEXT_MESSAGE`

A breakdown:

1. `FULL_SCHOOL_NAME` = The full name of the school/college/university you want to write the output for.
2. `SCHOOL_ABBREVIATION` = The abbreviation of the school/college/university you want to write the output for.
3. `SLUG` = The event slug. This is part of the start.gg URL when viewing the bracket. You do NOT need to copy and paste the entire URL. Only the part containing `tournament/TOURNAMENT-NAME/event/EVENT-NAME`.

Example:
URL: https://www.start.gg/tournament/cca-open-2022-23/event/west-spring-open-2/...
Slug: tournament/cca-open-2022-23/event/west-spring-open-2

4. `OUTPUT_FILE_PATH` = The location you want the program to write the output file to. This should always be the same so OBS can always be looking at this file while the program updates it.
5. `INITIAL_TEXT_MESSAGE` = For some broadcasts, you may want to have an initial message before showing all stats (promote socials, welcome message, etc.). Write that out here wrapped in double quotes.

Example:
`"Welcome to Gopher Esports, your home for all things esports at the University of Minnesota. |  Follow us on Twitter @GopherEsports  |  "`

Here are some example commands from two CCA tournaments through start.gg:

- CCA Summer Series 2023 West Qualifier 2
  `npm start "University of Minnesota" UMN "tournament/cca-summer-series-2023/event/west-qualifier-2" output.txt "Welcome to Gopher Esports!"`

- CCA Opens 2022-23 West Spring Open 2
  `npm start "University of Minnesota" UMN "tournament/cca-open-2022-23/event/west-spring-open-2" output-2.txt "Welcome to Gopher Esports!"`

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
