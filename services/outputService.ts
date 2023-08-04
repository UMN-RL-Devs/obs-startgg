// Example Output
// EVENT_NAME  |  ROUND_NAME  |  (seed#) TEAM_ONE [TEAM_ONE_SCORE] - [TEAM_TWO_SCORE] TEAM_TWO (seed#)  |  ...
// Repeat until nothing left

import { writeFileSync } from "fs";
import { EventMatch } from "./models/EventMatch";

/**
 * A function to return the full start.gg Event name, which consists of both the tournament and event.
 * @param slug The start.gg event slug. This should include the tournament as well.
 * @returns A string representing the full start.gg Event name.
 */
const formatEventName = (slug: string): string => {
  // The slug should have the format: tournament/tournament-name/event/event-name
  const urlParts = slug.split("/");
  const tourneySlug = urlParts[1];
  const eventSlug = urlParts[3];

  // For both tourney and event slugs, split on the dashes then capitalize first letter of each word
  const tourneyParts = tourneySlug.split("-");
  let tourneyName = "";
  for (let i = 0; i < tourneyParts.length; i++) {
    if (
      i > 0 &&
      !isNaN(Number(tourneyParts[i - 1])) &&
      !isNaN(Number(tourneyParts[i]))
    ) {
      tourneyName =
        tourneyName.slice(0, tourneyName.length - 1) +
        "-" +
        tourneyParts[i] +
        " ";
    } else {
      tourneyName += tourneyParts[i].toUpperCase() + " ";
    }
  }

  const eventParts = eventSlug.split("-");
  let eventName = "";
  for (let i = 0; i < eventParts.length; i++) {
    if (
      i > 0 &&
      !isNaN(Number(eventParts[i - 1])) &&
      !isNaN(Number(eventParts[i]))
    ) {
      eventName =
        eventName.slice(0, eventName.length - 1) + "-" + eventParts[i] + " ";
    } else {
      eventName += eventParts[i].toUpperCase() + " ";
    }
  }

  // Even though this will include an extra space, we can account for that in our output.
  return tourneyName + eventName;
};

/**
 * A helper function to determine the chronological order of fullRoundText
 * @param a The first EventMatch to compare.
 * @param b The second EventMatch to compare.
 * @returns A number indicating which fullRoundText should come first.
 */
const chronologicalSort = (a: EventMatch, b: EventMatch): number => {
  const aRound = a.fullRoundText;
  const bRound = b.fullRoundText;
  const roundsOrder = [
    "Winners Round 1",
    "Losers Round 1",
    "Winners Round 2",
    "Losers Round 2",
    "Winners Round 3",
    "Losers Round 3",
    "Winners Round 4",
    "Losers Round 4",
    "Winners Round 5",
    "Losers Round 5",
    "Winners Round 6",
    "Losers Round 6",
    "Winners Round 7",
    "Losers Round 7",
    "Winners Round 8",
    "Losers Round 8",
    "Winners Quarter-Final",
    "Losers Quarter-Final",
    "Winners Semi-Final",
    "Losers Semi-Final",
    "Winners Final",
    "Losers Final",
    "Grand Final",
  ];
  // ORDERING: Winner comes before Losers -- Think of standard RL Double Elim format
  const indexA = roundsOrder.indexOf(aRound);
  const indexB = roundsOrder.indexOf(bRound);
  if (indexA === -1 || indexB === -1) {
    throw new Error(`Invalid round(s) name: ${aRound}, ${bRound}`);
  }
  return indexA - indexB;
};

/**
 * Group the matches by round name. This can be done by sorting based on the fullRoundText property. These will place all
 * the round groups together. Detection of round change is done separately.
 *
 * This sorts the original parameter and does not require a return type.
 * @param matches The event matches to be grouped.
 */
const groupByRound = (matches: EventMatch[]) => {
  matches.sort((a, b) => chronologicalSort(a, b));
};

const writeOutput = (
  slug: string,
  initialMessage?: string,
  matches?: EventMatch[],
  outputFilePath?: string
) => {
  // Clone the matches so we don't accidentally change the original
  const matchesClone = JSON.parse(JSON.stringify(matches)) as EventMatch[];

  // First we need to group by round
  groupByRound(matchesClone);

  // Now we have everything we need to get started writing the output.
  // First, if we have an initialMessage passed, we should add that to the beginning.
  let output = initialMessage + "  |  " ?? "";

  // Next, add the Event Name. Remember that we have an extra space from the helper function.
  output += formatEventName(slug) + " |  ";

  // Go through each match and add it to the output. Remember to track the current round we are outputting.
  let currentRound = matchesClone[0].fullRoundText;
  output += currentRound + "  |  ";
  for (let i = 0; i < matchesClone.length; i++) {
    const match = matchesClone[i];
    if (match.fullRoundText !== currentRound) {
      // Add this to the output and update variable
      currentRound = match.fullRoundText;
      output += currentRound + "  |  ";
    }

    // Proceed with adding the match
    output += `(${match.slots[0].entrant!.initialSeedNum}) ${
      match.slots[0].entrant!.name
    } ${match.slots[0].standing!.stats.score.value} - ${
      match.slots[1].standing!.stats.score.value
    } ${match.slots[1].entrant!.name} (${
      match.slots[1].entrant!.initialSeedNum
    })  |  `;
  }

  // Write to the file
  writeFileSync(outputFilePath ?? "output.txt", output);
};

export const OutputService = {
  writeOutput,
};
