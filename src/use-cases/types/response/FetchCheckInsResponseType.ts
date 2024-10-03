import { TimeEntry } from "@prisma/client";

export interface FetchTimeEntrysResponseType {
  TimeEntrys: TimeEntry[];
}
