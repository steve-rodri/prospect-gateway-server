import { Athlete } from "@prisma/client"
import { RequestHandler } from "express"

import * as AthleteController from "../controller"
import { HttpError } from "../../utils"

type FindAthletesReqHandler = () => RequestHandler<
	{},
	Athlete[] | { message: string } | void,
	void,
	{}
>

export const find: FindAthletesReqHandler = () => {
	return async (_, res) => {
		try {
			const response = await AthleteController.find()
			return res.status(200).json(response)
		} catch (error) {
			if (error instanceof HttpError) {
				console.error(error.message)
				return res.status(error.status).json({ message: error.message })
			}
			return res.status(500).json()
		}
	}
}
