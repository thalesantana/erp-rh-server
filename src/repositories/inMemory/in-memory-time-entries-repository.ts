import { Prisma, TimeEntry } from "@prisma/client";
import { randomUUID } from "crypto";
import { TimeEntrysRepository } from "../time-entries-repository";

export class InMemoryTimeEntrysRepository implements TimeEntrysRepository {
  public items: TimeEntry[] = [];

  async create(data: Prisma.TimeEntryUncheckedCreateInput) {
    const timeEntry = {
      id: randomUUID(),
      user_id: data.user_id,
      check_in: data.check_in ? new Date(data.check_in) : null,
      lunch_start: data.lunch_start ? new Date(data.lunch_start) : null,
      lunch_end: data.lunch_end ? new Date(data.lunch_end) : null,
      check_out: data.check_out ? new Date(data.check_out) : null,
      created_at: new Date(),
    };

    this.items.push(timeEntry);

    return timeEntry;
  }
}
