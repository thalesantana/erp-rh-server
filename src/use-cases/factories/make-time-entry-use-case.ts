import { PrismaTimeEntrysRepository } from '@/repositories/prisma/prisma-time-entries-repository';
import { TimeEntryService } from '../time-entry';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export function makeTimeEntryUseCase() {
  const TimeEntrysRepository = new PrismaTimeEntrysRepository();
  const UsersRepository = new PrismaUsersRepository();
  const useCase = new TimeEntryService(TimeEntrysRepository, UsersRepository);

  return useCase;
}
