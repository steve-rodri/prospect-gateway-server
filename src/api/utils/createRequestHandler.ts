import { RequestHandler, Request, Response } from "express";
import { HttpOperation } from "../types";
import HttpError from "./HttpError";

export const createRequestHandler = <
  M,
  P = {},
  ResBody = any,
  ReqBody = any,
  Q = {}
>(
  operation: HttpOperation<M>,
  status: number
): RequestHandler<P, ResBody, ReqBody, Q> => {
  return async (req, res) => {
    try {
      const validReq = isValidReq<P, ResBody, ReqBody, Q>(req);
      if (validReq)
        throw new HttpError(
          500,
          "Internal Server Error: request type is invalid"
        );

      const response = await operation(req);
      return res.status(status).json(response);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(error.message);
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json();
    }
  };
};

const isValidReq = <P = {}, ResBody = any, ReqBody = any, Q = {}>(
  req: Request | Request<P, ResBody, ReqBody, Q>
): req is Request<P, ResBody, ReqBody, Q> => {
  return (
    (req as Request<P, ResBody, ReqBody, Q>).params !== undefined ||
    (req as Request<P, ResBody, ReqBody, Q>).query !== undefined
  );
};
