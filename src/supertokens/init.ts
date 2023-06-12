import supertokens from "supertokens-node"
import Dashboard from "supertokens-node/recipe/dashboard"
import Session from "supertokens-node/recipe/session"
import { ThirdPartyEmailPassword, EmailMagicLink } from "./recipes"
import { SUPER_TOKENS_CONNECTION_URI, BASE_URL, CLIENT_URL } from "../env"

export const initSuperTokens = () => {
	supertokens.init({
		framework: "express",
		supertokens: {
			connectionURI: SUPER_TOKENS_CONNECTION_URI ?? "http://localhost:3567"
		},
		appInfo: {
			appName: "gateway-server",
			apiDomain: BASE_URL ?? "http://localhost:5500",
			websiteDomain: CLIENT_URL ?? "http://localhost:19000",
			apiBasePath: "/auth",
			websiteBasePath: "/auth"
		},
		recipeList: [
			ThirdPartyEmailPassword,
			EmailMagicLink,
			Session.init(),
			Dashboard.init() // enables dashboard at /auth/dashboard
		]
	})
}
