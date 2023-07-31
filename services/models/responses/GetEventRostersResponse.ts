import { EventRoster } from "../EventRoster";

export interface GetEventRostersResponse {
  event: {
    entrants: {
      nodes: EventRoster[];
    };
  };
}
