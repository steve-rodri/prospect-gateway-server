import { RequestHandler, Request } from "express";
import * as AthleteController from "./controller";
import { createRequestHandler } from "../utils";
import { AthleteCreateSchema } from "./validators";
import { Athlete } from "@prisma/client";

// export const getAthletes = (): RequestHandler => {
//   const operation = async () => AthleteController.findAthletes();
//   return createRequestHandler(operation, 200);
// };

// export const getAthlete = (): RequestHandler => {
//   const operation = async (req: Request) => {
//     const { id } = req.params;
//     return AthleteController.getAthlete({ id });
//   };
//   return createRequestHandler(operation, 200);
// };

export const findOrCreateAthlete = () => {
  const operation = async (req) =>
    AthleteController.findOrCreateAthlete({ data: req.query });
  return createRequestHandler<Athlete, {}, Athlete, void, AthleteCreateSchema>(
    operation,
    200
  );

  // return async (req, res) => {
  //   try {
  //     const response = await operation(req);
  //     return res.status(200).json(response);
  //   } catch (error) {
  //     if (error instanceof HttpError) {
  //       console.error(error.message);
  //       return res.status(error.status).json({ message: error.message });
  //     }
  //     return res.status(500).json();
  //   }
  // };
};

export const createAthlete = (): RequestHandler<
  {},
  Athlete,
  void,
  AthleteCreateSchema
> => {
  const operation = async (
    req: Request<{}, Athlete, AthleteCreateSchema, void>
  ) => AthleteController.createAthlete({ data: req.body });
  return createRequestHandler(operation, 201);
};

// export const updateAthlete = (): RequestHandler => {
//   const operation = async (req: Request) => {
//     const { id } = req.params;
//     return AthleteController.patchAthlete({ id, data: req.body });
//   };
//   return createRequestHandler(operation, 200);
// };

// export const deleteAthlete = (): RequestHandler => {
//   const operation = async (req: Request) => {
//     const { id } = req.params;
//     return AthleteController.destroyAthlete({ id });
//   };
//   return createRequestHandler(operation, 204);
// };
