import { Request } from "express";

export interface ControllerError {
  error_id: string;
  message: string;
}

export type ControllerMethod<TModel, TArgs> = (
  args: TArgs
) => Promise<TModel | void>;

export type HttpOperation<TModel> = (req: Request) => Promise<TModel | void>;

export type GraphQLOperation<TModel, DTO> = (
  input: DTO
) => Promise<TModel | void>;

export type GraphQLMutation<TModel, DTO> = (
  root: undefined,
  args: { input: DTO }
) => Promise<TModel | ControllerError | void>;
