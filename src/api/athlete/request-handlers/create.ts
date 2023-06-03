import { Athlete } from "@prisma/client";
import { RequestHandler } from "express";

import * as AthleteController from "../controller";
import { HttpError } from "../../utils";
import { AthleteSearchSchema } from "../validators";

type CreateAthleteReqHandler = () => RequestHandler<
  {},
  Athlete | { message: string } | void,
  AthleteSearchSchema
>;

export const create: CreateAthleteReqHandler = () => {
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
