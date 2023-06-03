import { RequestHandler } from "express"

import * as NotificationController from "../controller"
import { NotificationCreateSchema } from "../validators"
import { HttpError } from "../../utils"

export type CreateNotificationReqHandler = () => RequestHandler<
	{},
	void | { message: string },
	NotificationCreateSchema
>

export const create: CreateNotificationReqHandler = () => {
	return async (req, res) => {
		try {
			await NotificationController.create({
				data: req.body
			})
			return res.status(201)
		} catch (error) {
			if (error instanceof HttpError) {
				console.error(error.message)
				return res.status(error.status).json({ message: error.message })
			}
			return res.status(500).json()
		}
	}
}
