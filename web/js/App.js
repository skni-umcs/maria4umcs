import DesktopUI from "./DesktopUI/DesktopUI"
import Header from "./Header/Header"
import LocationManager from "./LocationManager/LocationManager"
import Navbar from "./Navbar/Navbar"
import Settings from "./Settings/Settings"
import Timetable from "./Timetable/Timetable"

export default class App {
	static instance

	constructor() {
		if (App.instance) {
			return App.instance
		}
		App.instance = this
		document.title = "Maria4UMCS"

		this.weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
		this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

		this.settings = new Settings()
		this.settings.init()

		this.timetable = new Timetable()
		this.timetable.load()

		this.locationManager = new LocationManager()
		this.navbar = new Navbar()
		this.header = new Header()

		this.desktopUI = new DesktopUI()
	}
}