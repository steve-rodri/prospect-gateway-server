export const ordinal = (n: number) => {
	const s = ["th", "st", "nd", "rd"]
	const v = n % 100
	return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export const randomNum = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min
