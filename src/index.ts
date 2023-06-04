import { createServer } from "./createServer"
import { ApplicationServer } from "./types"

const port = process.env.PORT ?? 5000

createServer().then((appServer: ApplicationServer) => {
	appServer.app.listen(port, () => {
		console.info(`Server is running on: http://localhost:${port}/`)
	})
})
