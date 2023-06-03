import { RequestHandler } from "express"

import * as NotificationController from "../controller"
import { NotificationUpdateSchema } from "../validators"
import { HttpError } from "../../utils"

export type UpdateNotificationReqHandler = () => RequestHandler<
	{ id: string },
	void | { message: string },
	NotificationUpdateSchema
>

export const update: UpdateNotificationReqHandler = () => {
	return async (req, res) => {
		try {
			await NotificationController.update({
				id: req.params.id,
				data: req.body
			})
			return res.status(200)
		} catch (error) {
			if (error instanceof HttpError) {
				console.error(error.message)
				return res.status(error.status).json({ message: error.message })
			}
			return res.status(500)
		}
	}
}
