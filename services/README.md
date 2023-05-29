# ./services Folder

This folder will be the muscle of this application. You will most definitely need at least two service files in here, likely named `startggService.ts` to get the data from start.gg and `matchService.ts` to write the received data to a file.

Because this is programmed in TypeScript, you will likely find that you need a `/models` directory to contain your custom types based on your start.gg API queries. You may also need a `/axiosService` directory to contain additional configurations for your API calls (especially making sure your _Authorization_ header token is passed).

The hardest part will be `startggService.ts` and understanding how to get the data. Once you get that, the rest _should_ be smooth sailing.
