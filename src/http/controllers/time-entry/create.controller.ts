import { makeTimeEntryUseCase } from "@/use-cases/factories/make-time-entry-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTimeEntryParamsSchema = z.object({
    userId: z.string().uuid(),
  });
  const createTimeEntryBodySchema = z.object({
    checkIn: z.string().optional(),
    lunchStart: z.string().optional(),
    lunchEnd: z.string().optional(),
    checkOut: z.string().optional(),
  });

  const { userId } = createTimeEntryParamsSchema.parse(request.params);
  const { checkIn, lunchStart, lunchEnd, checkOut } = createTimeEntryBodySchema.parse(request.body);

  const createTimeEntryService = makeTimeEntryUseCase();

  await createTimeEntryService.execute({
    userId,
    checkIn, 
    lunchStart, 
    lunchEnd, 
    checkOut
  });

  return reply.status(201).send();
}
