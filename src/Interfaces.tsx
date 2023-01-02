export interface Entry {
  uid: string;
  userUid: string;
  day: string;
  fromTime: string;
  toTime: string;
  numSeats: number;
  venueNames: string[];
}

export interface User {
  uid: string;
  username: string;
  token: string;
}
