export interface GetTotalMatchesResponse {
  data: {
    event: {
      sets: {
        pageInfo: {
          total: number;
        };
      };
    };
  };
}
