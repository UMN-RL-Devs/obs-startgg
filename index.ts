// We need to get arguments/input from the command line/user
// 1st: Full School Name --- University of Minnesota
// 2nd: School Abbreviation --- UMN
// 3rd: Slug --- tournament/cca-summer-series-2023/event/west-qualifier-2
//      Alternatively, this could be the URL of one of the brackets???
// 4th: [OPTIONAL] Output File --- ./output.txt
// 5th: [OPTIONAL] Initial Message --- Welcome to GopherEsports, the home for all things esports at the U of MN!

import { OutputService } from "./services/outputService";
import { StartggService } from "./services/startggService";

const getHelpMessage = (): string => {
  return "Available Commands and Parameters:\n1st Argument: Full School Name\n2nd Argument: School Abbreviation\n3rd Argument: start.gg Event Slug\n4th Argument [OPTIONAL]: Output File Path\n5th Argument [OPTIONAL]: An initial message to always include in the ticker (promote socials, links, or other relevant information).\n\nTip:\nThe start.gg Event Slug is part of the URL when viewing a bracket or event page on start.gg. You will want to copy-and-paste everything starting with `tournament/` to the event name in all lowercase with dashes between the words.\nExample: `tournament/cca-summer-series-2023/event/west-qualifier-2\n\nFull Usage Example: npm start 'University of Minnesota' UMN tournament/cca-summer-series-2023/event/west-qualifier-2";
};

const main = async () => {
  // Get the command line arguments
  const allArguments = process.argv.slice(2);
  if (allArguments.length < 3 || allArguments.length >= 6) {
    console.log(getHelpMessage());
    return;
  }
  const fullSchoolName = allArguments[0];
  const schoolAbbreviation = allArguments[1];
  const slug = allArguments[2];
  let outputFilePath = undefined;
  if (allArguments.length >= 4) {
    // Output file specified
    outputFilePath = allArguments[3];
  }
  let initialMessage = undefined;
  if (allArguments.length === 5) {
    // Initial Message Specified
    initialMessage = allArguments[4];
  }

  // We have our arguments. Start the loop!
  const eventId = await StartggService.getEventId(slug);
  while (true) {
    // Get the matches
    console.log("Obtaining matches...");
    const matches = await StartggService.getEventMatches(eventId);

    // Filter the matches to only include teams we want
    console.log("Filtering matches...");
    const filteredMatches = matches.filter((match) => {
      const teamOne = match.slots[0].entrant!.name;
      const teamTwo = match.slots[1].entrant!.name;
      return (
        teamOne.includes(fullSchoolName) ||
        teamOne.includes(schoolAbbreviation) ||
        teamTwo.includes(fullSchoolName) ||
        teamTwo.includes(schoolAbbreviation)
      );
    });

    // Now, send to output
    if (filteredMatches.length > 0) {
      console.log("Writing to output...");
      OutputService.writeOutput(
        slug,
        initialMessage,
        filteredMatches,
        outputFilePath
      );
    } else {
      console.log("No completed matches found...");
    }

    // Sleep for 20 minutes
    console.log("Waiting 20 minutes before requesting new data...");
    StartggService.sleep(1000 * 60 * 20);
    console.log("Restarting loop...");
  }
};

// Start the program!
main();
