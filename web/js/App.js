import DesktopUI from "./DesktopUI/DesktopUI"
import Header from "./Header/Header"
import LocationManager from "./LocationManager/LocationManager"
import Navbar from "./Navbar/Navbar"
import Timetable from "./Timetable/Timetable"

export default class App {
	static instance

	constructor() {
		if (App.instance) {
			return App.instance
		}
		App.instance = this

		this.weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
		this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

		this.timetable = new Timetable()
		this.timetable.load()

		this.locationManager = new LocationManager()
		this.navbar = new Navbar()
		this.header = new Header()

		this.desktopUI = new DesktopUI()
	}
}