import { TimeEntry, Prisma } from "@prisma/client";

export interface TimeEntrysRepository {
  create(data: Prisma.TimeEntryUncheckedCreateInput): Promise<TimeEntry>;
}
