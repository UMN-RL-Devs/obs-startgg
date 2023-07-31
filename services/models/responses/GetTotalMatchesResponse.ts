export interface GetTotalMatchesResponse {
  event: {
    sets: {
      pageInfo: {
        total: number;
      };
    };
  };
}
