import { UsersRepository } from "@/repositories/users-repository";
import { ResourseNotFoundError } from "./errors/resouse-not-found-error";
import { GetUserProfileRequestType } from "./types/request/GetUserProfileRequestType";
import { GetUserProfileResponseType } from "./types/response/GetUserProfileResponseType";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequestType): Promise<GetUserProfileResponseType> {
    const user = await this.usersRepository.findById(userId);
    
    if (!user) {
      throw new ResourseNotFoundError();
    }
    const formattedBirthdate = format(new Date(user.birthdate), 'dd/MM/yyyy', { locale: ptBR });

    return {
      ...user,
      birthdate: formattedBirthdate,
    };
  }
}
