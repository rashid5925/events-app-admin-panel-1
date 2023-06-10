import NavButton from "./navButton"

export default function Sidebar() {
    return (
        <aside className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 lg:w-[300px] md:w-[200px] w-[150px] overflow-y-auto text-center bg-gray-900">
            <div className="text-gray-100 text-xl">
                <div className="p-2.5 mt-1 flex items-center">
                    <h1 className="font-bold text-gray-200 text-[15px] ml-3">Event App Admin</h1>
                </div>
                <div className="my-2 bg-gray-600 h-[1px]"></div>
            </div>
            <NavButton params={{'value': 'Dashboad'}}></NavButton>
            <NavButton params={{'value': 'Add Event', 'navTo': 'addEvent'}}></NavButton>
            <NavButton params={{'value': 'Users', 'navTo': 'users'}}></NavButton>
            <NavButton params={{'value': 'Add User', 'navTo': 'addUser'}}></NavButton>
            <div className="my-2 bg-gray-600 h-[1px]"></div>
            <NavButton params={{'value': 'Logout'}}></NavButton>
        </aside>
    )
};
