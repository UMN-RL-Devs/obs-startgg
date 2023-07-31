export interface GetTotalEntrantsResponse {
  event: {
    entrants: {
      total: number;
      totalPages: number;
    };
  };
}
