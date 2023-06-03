import { Athlete } from "@prisma/client";
import { RequestHandler } from "express";

import * as AthleteController from "./controller";
import { HttpError } from "../utils";
import { AthleteCreateSchema } from "./validators";

type FindOrCreateAthleteReqHandler = () => RequestHandler<
  {},
  Athlete | { message: string } | void,
  void,
  AthleteCreateSchema
>;

export const findOrCreateAthlete: FindOrCreateAthleteReqHandler = () => {
  return async (req, res) => {
    try {
      const response = await AthleteController.findOrCreate({
        data: req.query,
      });
      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(error.message);
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json();
    }
  };
};

type CreateAthleteReqHandler = () => RequestHandler<
  {},
  Athlete | { message: string } | void,
  AthleteCreateSchema
>;

export const createAthlete: CreateAthleteReqHandler = () => {
  return async (req, res) => {
    try {
      const response = await AthleteController.create({ data: req.body });
      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(error.message);
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json();
    }
  };
};

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
