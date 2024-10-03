import { InMemoryUsersRepository } from "@/repositories/inMemory/in-memory-user-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateService } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
      role: "WORKER",
      position: "Developer",
      is_active: true,
      birthdate: new Date("1990-01-01"),
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "wrongemail@example.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
      role: "WORKER",
      position: "Developer",
      is_active: true,
      birthdate: new Date("1990-01-01"),
    });

    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "wrongpassword",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
