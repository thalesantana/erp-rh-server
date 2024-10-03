import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { TimeEntrysRepository } from '../time-entries-repository';

export class PrismaTimeEntrysRepository implements TimeEntrysRepository {
  async create(data: Prisma.TimeEntryUncheckedCreateInput) {
    const timeEntry = await prisma.timeEntry.create({
      data,
    });

    return timeEntry;
  }
}
