import { PrismaClient } from "@prisma/client"
import EmailPassword from "supertokens-node/recipe/thirdpartyemailpassword"
import { apple, google } from "./providers"

const prisma = new PrismaClient()

export const ThirdPartyEmailPassword = EmailPassword.init({
	providers: [EmailPassword.Google(google), EmailPassword.Apple(apple)],
	signUpFeature: {
		formFields: [
			{
				id: "name",
				optional: true
			},
			{
				id: "dateOfBirth",
				optional: true
			},
			{
				id: "phone",
				optional: true
			}
		]
	},
	override: {
		apis: originalImplementation => {
			return {
				...originalImplementation,
				emailPasswordSignUpPOST: async input => {
					if (originalImplementation.emailPasswordSignUpPOST === undefined)
						throw Error("Should never come here")

					// First we call the original implementation
					let response = await originalImplementation.emailPasswordSignUpPOST(
						input
					)

					// If sign up was successful
					if (response.status === "OK") {
						const user = response.user
						// We can get the form fields from the input like this
						const formFields = input.formFields
						const nameField = formFields.find(field => field.id === "name")
						const phoneField = formFields.find(field => field.id === "phone")
						const dateOfBirthField = formFields.find(
							field => field.id === "dateOfBirth"
						)
						// Create the user in the gateway db
						await prisma.user.create({
							data: {
								id: user.id,
								email: user.email,
								name: nameField?.value ?? null,
								phone: phoneField?.value ?? null,
								dateOfBirth: dateOfBirthField?.value
									? new Date(dateOfBirthField.value)
									: null,
								createdAt: new Date(user.timeJoined)
							}
						})
					}
					return response
				}
			}
		}
	}
})
