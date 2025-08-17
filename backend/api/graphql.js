import Fastify from "fastify";
import mercurius from "mercurius";
import cors from "@fastify/cors";
import { resolvers } from "../src/resolvers.js";
import { schema } from "../src/schema.js";
// import fastifyStatic from "@fastify/static";
// import path from "path"; // also missing

export default async function handler(req, res) {
  const app = Fastify();

  // CORS
  await app.register(cors, {
    origin: [
      "http://localhost:3000", // local dev
      "https://jaggaer-frontend-assignment-abew5j8jb-nikhils-projects-002b344e.vercel.app", // production
    ],
    credentials: true,
  });

  // await app.register(fastifyStatic, {
  //   root: path.join(process.cwd(), "public"), // your public folder
  //   prefix: "/", // images will be accessible at /assets/...
  // });

  // GraphQL
  app.register(mercurius, {
    schema,
    resolvers,
    graphiql: true,
  });

  try {
    await app.ready();
    app.server.emit("request", req, res);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
