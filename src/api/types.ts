import { Request } from "express";

export interface ControllerError {
  error_id: string;
  message: string;
}

export type ControllerMethod<TArgs, TReturn> = (
  args: TArgs
) => Promise<TReturn>;

export type HttpOperation<TModel> = (
  req: Request
) => Promise<TModel | undefined>;

export type GraphQLOperation<TModel, DTO> = (
  input: DTO
) => Promise<TModel | null | void>;

export type GraphQLMutation<TModel, DTO> = (
  root: undefined,
  args: { input: DTO }
) => Promise<TModel | ControllerError | void | null>;
