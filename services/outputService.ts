// Example Output
// EVENT_NAME  |  ROUND_NAME  |  (seed#) TEAM_ONE [TEAM_ONE_SCORE] - [TEAM_TWO_SCORE] TEAM_TWO (seed#)  |  ...
// Repeat until nothing left

import { writeFileSync } from "fs";
import { EventMatch } from "./models/EventMatch";
import { StartggService } from "./startggService";

/**
 * A function to return the full start.gg Event name, which consists of both the tournament and event.
 * @param slug The start.gg event slug. This should include the tournament as well.
 * @returns A string representing the full start.gg Event name.
 */
const formatEventName = async (slug: string): Promise<string> => {
  return await StartggService.getOutputName(slug);
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
    "Winners Round 2",
    "Losers Round 1",
    "Winners Round 3",
    "Winners Quarter-Final",
    "Losers Round 2",
    "Winners Round 4",
    "Winners Semi-Final",
    "Losers Round 3",
    "Winners Round 5",
    "Winners Final",
    "Losers Round 4",
    "Winners Round 6",
    "Losers Round 5",
    "Losers Quarter-Final",
    "Losers Round 6",
    "Losers Semi-Final",
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

const writeOutput = async (
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
  output += (await formatEventName(slug)) + " |  ";

  if (matchesClone.length > 0) {
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
  }

  // Write to the file
  writeFileSync(outputFilePath ?? "output.txt", output);
};

export const OutputService = {
  writeOutput,
};
