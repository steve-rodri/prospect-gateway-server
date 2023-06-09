import { createServer } from "./createServer"
import { ApplicationServer } from "./types"
import { BASE_URL, PORT } from "./env"

createServer().then((appServer: ApplicationServer) => {
	appServer.app.listen(PORT, () => {
		console.info(`Server is running at ${BASE_URL}`)
	})
})
