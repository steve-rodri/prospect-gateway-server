import { User } from "@prisma/client"

import { randomNum } from "./number-utils"

export const getTwoRandomUsers = (users: User[]) => {
	const one = users.at(randomNum(0, users.length - 1)) as User
	const two = (() => {
		let selected = users.at(randomNum(0, users.length - 1))
		if (!one) return
		if (!selected) return
		while (selected.id === one.id) {
			const newSelect = users.at(randomNum(0, users.length - 1))
			if (newSelect) selected = newSelect
		}
		return selected
	})() as User
	return [one, two]
}
