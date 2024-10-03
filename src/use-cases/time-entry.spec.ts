import { InMemoryTimeEntrysRepository } from "@/repositories/inMemory/in-memory-time-entries-repository";
import { InMemoryUsersRepository } from '@/repositories/inMemory/in-memory-user-repository';
import { TimeEntryService } from "@/use-cases/time-entry";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let timeEntrysRepository: InMemoryTimeEntrysRepository;
let usersRepository: InMemoryUsersRepository;
let sut: TimeEntryService;

describe("Time Entry Use Case", () => {
  beforeEach(() => {
    timeEntrysRepository = new InMemoryTimeEntrysRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new TimeEntryService(timeEntrysRepository,usersRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to create a time entry", async () => {
    const { timeEntry } = await sut.execute({
      userId: "user-01",
      checkIn: "2024-10-03T08:00:00Z",
    });

    expect(timeEntry.id).toEqual(expect.any(String));
  });


  it("should be able to create a full time entry with lunch and check-out", async () => {
    const { timeEntry } = await sut.execute({
      userId: "user-01",
      checkIn: "2024-10-03T08:00:00Z",
      lunchStart: "2024-10-03T12:00:00Z",
      lunchEnd: "2024-10-03T13:00:00Z",
      checkOut: "2024-10-03T17:00:00Z",
    });

    expect(timeEntry.id).toEqual(expect.any(String));
    expect(timeEntry.lunch_start).toEqual(new Date("2024-10-03T12:00:00Z"));
    expect(timeEntry.lunch_end).toEqual(new Date("2024-10-03T13:00:00Z"));
    expect(timeEntry.check_out).toEqual(new Date("2024-10-03T17:00:00Z"));
  });
});
