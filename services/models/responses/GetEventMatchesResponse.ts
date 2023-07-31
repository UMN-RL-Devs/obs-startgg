import { EventMatch } from "../EventMatch";

export interface GetEventMatchesResponse {
  event: {
    sets: {
      nodes: EventMatch[];
    };
  };
}
