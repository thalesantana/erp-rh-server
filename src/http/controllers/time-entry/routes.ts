import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { create } from "./create.controller";

export async function TimeEntrysRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post(
    "/time-entries/user/:userId/create",
    create,
  );
}
