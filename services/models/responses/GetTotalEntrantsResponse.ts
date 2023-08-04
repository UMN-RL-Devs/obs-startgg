export interface GetTotalEntrantsResponse {
  data: {
    event: {
      entrants: {
        total: number;
        totalPages: number;
      };
    };
  };
}
