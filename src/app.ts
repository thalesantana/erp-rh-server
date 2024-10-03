import fastifyCookie from "@fastify/cookie";
import fastifyCors from '@fastify/cors';
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { TimeEntrysRoutes } from "./http/controllers/time-entry/routes";
import { usersRoutes } from "./http/controllers/users/routes";

export const app = fastify();

app.register(fastifyCors, { 
  origin: env.CLIENT_URL,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(TimeEntrysRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV != "production") {
    console.log(error);
  }

  return reply
    .status(error.statusCode ? error.statusCode : 500)
    .send(error.message ? error.message : "internal server error.");
});
