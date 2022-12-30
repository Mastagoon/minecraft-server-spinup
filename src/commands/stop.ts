import { destroyServer, isServerUp } from "../actions.js"
import { Command } from "../lib/Command.js"
import { CommandArg, CommandExecuteParameters } from "../types.js"

const options: CommandArg[] = []

let pause = false

const start = async (options: CommandExecuteParameters) => {
	const { type, message, interaction } = options
	const isSlash = type === "interaction"
	if (pause)
		return isSlash
			? interaction?.reply(`يرجى الانتظار قبل استعمال هذا الامر من جديد`)
			: message?.reply(`يرجى الانتظار قبل استعمال هذا الأمر من جديد`)
	pause = true
	setTimeout(() => {
		pause = false
	}, 30000)
	console.log("Killing server...")
	// is there a server?
	const up = await isServerUp()
	if (!up) return isSlash ? interaction?.reply(`لا يوجد سيرفر`) : message?.reply(`لا يوجد سيرفر`)
	// kill server
	isSlash ? interaction?.reply(`يتم ايقاف السيرفر`) : message?.reply(`يتم ايقاف السيرفر`)
	await destroyServer()
	isSlash ? interaction?.reply(`تم ايقاف السيرفر`) : message?.reply(`تم ايقاف السيرفر`)
}
export default new Command(
	"start",
	"Start the minecraft server",
	["new", "run"],
	start,
	options
)