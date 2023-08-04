import { axiosService } from "./axiosService";
import { GetEventIdResponse } from "./models/responses/GetEventIdResponse";
import Queries from "../queries.json";
import { GetTotalEntrantsResponse } from "./models/responses/GetTotalEntrantsResponse";
import { EventRoster } from "./models/EventRoster";
import { GetEventRostersResponse } from "./models/responses/GetEventRostersResponse";
import { GetEventMatchesResponse } from "./models/responses/GetEventMatchesResponse";
import { GetTotalMatchesResponse } from "./models/responses/GetTotalMatchesResponse";
import { EventMatch } from "./models/EventMatch";

const BASE_URL = "https://api.start.gg/gql/alpha";

/**
 * A custom function to use to avoid rate limits with the start.gg API.
 * @param ms The amount of time in milliseconds to wait.
 */
const sleep = (ms: number) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < ms);
};

/**
 * A function to obtain the start.gg Event ID given a tournament name and event name.
 * @param slug The event slug from the start.gg URL.
 * @returns The requested Event ID.
 */
const getEventId = async (slug: string): Promise<number> => {
  const response = await axiosService.post<GetEventIdResponse>(BASE_URL, {
    query: Queries.GET_EVENT_ID,
    variables: { slug: slug },
  });
  sleep(1000);

  return response.data.data.event.id;
};

/**
 * A function to obtain the total number of entrants/teams/players from a start.gg event.
 * @param eventId The ID of the start.gg event.
 * @returns The number of total entrants/players/teams in the event.
 */
const getTotalEntrants = async (eventId: number): Promise<number> => {
  const response = await axiosService.post<GetTotalEntrantsResponse>(BASE_URL, {
    query: Queries.GET_TOTAL_ENTRANTS,
    variables: {
      eventId: eventId,
      page: 1,
      perPage: 1,
    },
  });

  sleep(1000);

  return response.data.data.event.entrants.total;
};

/**
 * A function to obtain the total number of matches/sets from a start.gg event.
 * @param eventId The ID of the start.gg event.
 * @returns The number of total matches/sets in the event.
 */
const getTotalMatches = async (eventId: number): Promise<number> => {
  const response = await axiosService.post<GetTotalMatchesResponse>(BASE_URL, {
    query: Queries.GET_TOTAL_MATCHES,
    variables: {
      eventId: eventId,
      page: 1,
      perPage: 1,
    },
  });

  sleep(1000);

  return response.data.data.event.sets.pageInfo.total;
};

/**
 * A function to obtain the rosters from a start.gg event.
 * @param eventId The ID of the start.gg event.
 * @returns A list containing objects that hold the team name and all gamertags for that team.
 */
const getEventRosters = async (eventId: number): Promise<EventRoster[]> => {
  // First, we need to get the total number of entrants
  const totalEntrants = await getTotalEntrants(eventId);

  // Now we can proceed to getting the rosters
  const eventRosters: EventRoster[] = [];
  let entrantsFound = 0;
  let pageNumber = 0;

  // Loop through until we've found all the expected teams
  while (entrantsFound < totalEntrants) {
    const response = await axiosService.post<GetEventRostersResponse>(
      BASE_URL,
      {
        query: Queries.GET_EVENT_ROSTERS,
        variables: {
          eventId: eventId,
          page: pageNumber,
          perPage: 25,
        },
      }
    );

    // Identify how many teams we actually received
    eventRosters.push(...response.data.data.event.entrants.nodes);
    pageNumber += 1;
    entrantsFound += 25;
    sleep(1000);
  }

  // Return what we've found
  return eventRosters;
};

/**
 * A function to obtain all COMPLETED matches/sets from a start.gg event. Matches or sets that haven't completed will be excluded from the values returned.
 * @param eventId The ID of the start.gg event.
 * @returns A list containing objects that hold the two teams that played each other and their corresponding series score.
 */
const getEventMatches = async (eventId: number): Promise<EventMatch[]> => {
  // First, we need to get the total number of matches
  const totalMatches = await getTotalMatches(eventId);

  // Now, we can proceed with getting the matches/sets
  const eventMatches: EventMatch[] = [];
  let matchesFound = 0;
  let pageNumber = 1;

  // Loop through until we've found all matches
  while (matchesFound < totalMatches) {
    const response = await axiosService.post<GetEventMatchesResponse>(
      BASE_URL,
      {
        query: Queries.GET_EVENT_MATCHES,
        variables: {
          eventId: eventId,
          page: pageNumber,
          perPage: 25,
        },
      }
    );

    // Only push COMPLETED matches
    for (let i = 0; i < response.data.data.event.sets.nodes.length; i++) {
      const match = response.data.data.event.sets.nodes[i];
      if (
        match.completedAt !== null &&
        match.startedAt !== null &&
        match.slots[0].standing &&
        match.slots[0].standing.stats.score.value !== -1 &&
        match.slots[1].standing &&
        match.slots[1].standing.stats.score.value !== -1
      ) {
        eventMatches.push(match);
      }
    }
    pageNumber += 1;
    matchesFound += 25;
    sleep(1000);
  }

  // Return what we've found
  return eventMatches;
};

// An interface to access all necessary start.gg endpoints and data.
export const StartggService = {
  sleep,
  getEventId,
  getTotalEntrants,
  getTotalMatches,
  getEventRosters,
  getEventMatches,
};
