import { createServer } from "./createServer"
import { BASE_URL, PORT } from "./env"
import { ApplicationServer } from "./types"

createServer().then((appServer: ApplicationServer) => {
	appServer.app.listen(PORT, () => {
		console.info(`Server is running at ${BASE_URL}`)
	})
})
