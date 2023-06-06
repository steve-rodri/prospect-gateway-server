import supertokens from "supertokens-node"
import Dashboard from "supertokens-node/recipe/dashboard"
import Session from "supertokens-node/recipe/session"
// import ThirdPartyPasswordless from "supertokens-node/recipe/thirdpartypasswordless"
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword"

const { Google, Apple } = ThirdPartyEmailPassword

export const initSuperTokens = () => {
	supertokens.init({
		framework: "express",
		supertokens: {
			connectionURI: "http://localhost:60663"
		},
		appInfo: {
			// learn more about this on https://supertokens.com/docs/session/appinfo
			appName: "prospect",
			apiDomain: "http://localhost:5500",
			websiteDomain: "http://localhost:19000",
			apiBasePath: "/auth",
			websiteBasePath: "/auth"
		},
		recipeList: [
			// ThirdPartyPasswordless.init({
			// 	flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
			// 	contactMethod: "EMAIL_OR_PHONE",
			// 	providers: [
			// 		// We have provided you with development keys which you can use for testing.
			// 		// IMPORTANT: Please replace them with your own OAuth keys for production use.
			// 		Google({
			// 			clientId:
			// 				"1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
			// 			clientSecret: "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"
			// 		}),
			// 		Apple({
			// 			clientId: "4398792-io.supertokens.example.service",
			// 			clientSecret: {
			// 				keyId: "7M48Y4RYDL",
			// 				privateKey:
			// 					"-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
			// 				teamId: "YWQCXGJRJL"
			// 			}
			// 		})
			// 	]
			// }),

			ThirdPartyEmailPassword.init({
				providers: [
					// We have provided you with development keys which you can use for testing.
					// IMPORTANT: Please replace them with your own OAuth keys for production use.
					Google({
						clientId:
							"1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
						clientSecret: "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"
					}),
					Apple({
						clientId: "4398792-io.supertokens.example.service",
						clientSecret: {
							keyId: "7M48Y4RYDL",
							privateKey:
								"-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
							teamId: "YWQCXGJRJL"
						}
					})
				]
			}),

			Session.init(), // initializes session features
			Dashboard.init()
		]
	})
}
