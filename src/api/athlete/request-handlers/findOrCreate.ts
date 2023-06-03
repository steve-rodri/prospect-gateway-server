import { Athlete } from "@prisma/client"
import { RequestHandler } from "express"

import * as AthleteController from "../controller"
import { HttpError } from "../../utils"
import { AthleteSearchSchema } from "../validators"

type FindOrCreateAthleteReqHandler = () => RequestHandler<
	{},
	Athlete | { message: string } | void,
	void,
	AthleteSearchSchema
>

export const findOrCreate: FindOrCreateAthleteReqHandler = () => {
	return async (req, res) => {
		try {
			const response = await AthleteController.findOrCreate({
				data: req.query
			})
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
