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
  return "Available Commands and Parameters:\n1st Argument: start.gg Event Slug\n";
};

const main = async () => {
  // Get the command line arguments
  const allArguments = process.argv.slice(2);
  if (allArguments.length < 1) {
    console.log(getHelpMessage());
    return;
  }
  const slug = allArguments[0];
  const fullSchoolName = "University of Minnesota";
  const schoolAbbreviation = "UMN";
  const outputFilePath = undefined;
  const initialMessage =
    "Welcome to Gopher Esports, the home for all things esports at the University of Minnesota! Follow us on Twitter @GopherEsports! Visit our website to learn more about our initiatives: gopheresports.umn.edu!";

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
    } else {
      console.log("No completed matches found...");
    }

    await OutputService.writeOutput(
      slug,
      initialMessage,
      filteredMatches,
      outputFilePath
    );

    // Sleep for 20 minutes
    console.log("Waiting 20 minutes before requesting new data...");
    StartggService.sleep(1000 * 60 * 20);
    console.log("Restarting loop...");
  }
};

// Start the program!
main();
