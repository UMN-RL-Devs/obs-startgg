import { EventRoster } from "../EventRoster";

export interface GetEventRostersResponse {
  data: {
    event: {
      entrants: {
        nodes: EventRoster[];
      };
    };
  };
}
