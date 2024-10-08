import { InMemoryUsersRepository } from "@/repositories/inMemory/in-memory-user-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourseNotFoundError } from "./errors/resouse-not-found-error";
import { GetUserProfileService } from "./get-user-profile";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileService;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileService(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
      role: "WORKER",
      position: "Developer",
      birthdate: new Date("1990-01-01"),
      is_active: true,
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
    expect(user.email).toEqual("johndoe@example.com");
    expect(user.role).toEqual("WORKER");
    expect(user.position).toEqual("Developer");
    expect(user.birthdate).toEqual(new Date("1990-01-01"));
    expect(user.is_active).toBe(true);
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      }),
    ).rejects.toBeInstanceOf(ResourseNotFoundError);
  });
});
