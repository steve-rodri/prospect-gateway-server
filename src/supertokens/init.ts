import supertokens from "supertokens-node"
import Dashboard from "supertokens-node/recipe/dashboard"
import Session from "supertokens-node/recipe/session"
import { ThirdPartyEmailPassword, EmailMagicLink } from "./recipes"

export const initSuperTokens = () => {
	supertokens.init({
		framework: "express",
		supertokens: {
			connectionURI: "http://localhost:60663"
		},
		appInfo: {
			appName: "prospect",
			apiDomain: "http://localhost:5500",
			websiteDomain: "http://localhost:19000",
			apiBasePath: "/auth",
			websiteBasePath: "/auth"
		},
		recipeList: [
			ThirdPartyEmailPassword,
			EmailMagicLink,
			Session.init(),
			Dashboard.init()
		]
	})
}
