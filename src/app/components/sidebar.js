'use client';
import { useUserContext } from "@/context/UserContext";
import { useRouter } from 'next/navigation';
import NavButton from "./navButton"

export default function Sidebar() {
    const router = useRouter();
    const { setLoggedInUser } = useUserContext();
    return (
        <aside className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 lg:w-[300px] md:w-[200px] w-[150px] overflow-y-auto text-center bg-gray-900">
            <div className="text-gray-100 text-xl">
                <div className="p-2.5 mt-1 flex items-center">
                    <h1 className="font-bold text-gray-200 text-[15px] ml-3">AktivIQ</h1>
                </div>
                <div className="my-2 bg-gray-600 h-[1px]"></div>
            </div>
            <NavButton params={{'value': 'Dashboad'}}></NavButton>
            <NavButton params={{'value': 'Add Event', 'navTo': 'addEvent'}}></NavButton>
            <NavButton params={{'value': 'Users', 'navTo': 'users'}}></NavButton>
            <NavButton params={{'value': 'Add User', 'navTo': 'addUser'}}></NavButton>
            <div className="my-2 bg-gray-600 h-[1px]"></div>
            <button onClick={() => {setLoggedInUser('');router.push('/');}} className="p-2.5 mt-3 w-full flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <div className="text-[15px] ml-4 text-gray-200 font-bold" >Logout</div>
            </button>
        </aside>
    )
};
