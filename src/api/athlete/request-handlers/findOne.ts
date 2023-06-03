import { Athlete } from "@prisma/client";
import { RequestHandler } from "express";

import * as AthleteController from "../controller";
import { HttpError } from "../../utils";

type FindOneAthleteReqHandler = () => RequestHandler<
  { id: string },
  Athlete | { message: string } | void,
  void,
  {}
>;

export const findOne: FindOneAthleteReqHandler = () => {
  return async (req, res) => {
    try {
      const response = await AthleteController.findOne({ id: req.params.id });
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
