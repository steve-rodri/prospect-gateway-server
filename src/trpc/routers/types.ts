export type ControllerMethod<TModel, TArgs> = (
	args: TArgs
) => Promise<TModel | void>
