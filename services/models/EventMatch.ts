interface EventMatchSlot {
  entrant: {
    name: string; // Team Name
    initialSeedNum: number; // Seed of team
  } | null;
  standing: {
    stats: {
      score: {
        value: number; // Series score
      };
    };
  } | null;
}

// https://developer.start.gg/reference/set.doc.html
export interface EventMatch {
  startedAt: number | null; // Timestamp -- null = To be started
  completedAt: number | null; // Timestamp -- null = In Progress
  fullRoundText: string; // ex: Winners Round 4
  slots: EventMatchSlot[];
}
