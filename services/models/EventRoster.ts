import { EventPlayer } from "./EventPlayer";

export interface EventRoster {
  name: string; // This is the team name
  participants: EventPlayer[]; // The list of players on this team. For Rocket League, this ranges from 3-5
}
