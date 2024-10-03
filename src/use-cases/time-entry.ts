import { TimeEntrysRepository } from "@/repositories/time-entries-repository";
import { ResourseNotFoundError } from "./errors/resouse-not-found-error";
import { TimeEntryRequestType } from "./types/request/TimeEntryRequestType";
import { TimeEntryResponseType } from './types/response/TimeEntryResponseType';
import { UsersRepository } from '@/repositories/users-repository';


export class TimeEntryService {
  constructor(
    private timeEntrysRepository: TimeEntrysRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    checkIn,
    lunchStart,
    lunchEnd,
    checkOut,
  }: TimeEntryRequestType): Promise<TimeEntryResponseType> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourseNotFoundError();
    }

    const timeEntry = await this.timeEntrysRepository.create({
      user_id: userId,
      check_in: checkIn ? new Date(checkIn) : undefined,
      lunch_start: lunchStart ? new Date(lunchStart) : undefined,
      lunch_end: lunchEnd ? new Date(lunchEnd) : undefined,
      check_out: checkOut ? new Date(checkOut) : undefined,
    });

    return { timeEntry };
  }
}
