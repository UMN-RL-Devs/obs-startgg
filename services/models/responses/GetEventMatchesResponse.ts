import { EventMatch } from "../EventMatch";

export interface GetEventMatchesResponse {
  data: {
    event: {
      sets: {
        nodes: EventMatch[];
      };
    };
  };
}
