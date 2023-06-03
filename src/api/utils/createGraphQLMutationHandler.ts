import { GraphQLOperation, GraphQLMutation } from "../types"

export const createGraphQLMutationHandler = <T, DTO>(
	name: string,
	operation: GraphQLOperation<T, DTO>
): GraphQLMutation<T, DTO> => {
	return async (_, { input }) => {
		try {
			return operation(input)
		} catch (error) {
			if (error instanceof Error) {
				return {
					error_id: name,
					message: error.message
				}
			}
		}
	}
}
