export interface GetOutputName {
  data: {
    tournament: {
      id: number;
      name: string;
      events: {
        id: number;
        name: string;
      }[];
    };
  };
}
