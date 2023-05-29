# ./app Folder

The code inside this directory should be the driving code behind your application. There should be NO API calls or data filtering in this code as that will take place in the `../services` directory.

I'd recommend creating an `app.ts` file that requires a valid tournament from `../index.js` and the team name(s) the broadcaster is looking to store.

In short, this directory should likely be only one file that is very simple, but open to extensibility.
