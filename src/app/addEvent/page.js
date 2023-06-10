import AddEventForm from "../components/addEventForm"
import Sidebar from "../components/sidebar"

export default function AddEvent() {
    return (
        <>
            <Sidebar></Sidebar>
            <div className="ms-[150px] lg:ms-[300px] md:ms-[200px]">
                <h1 className="text-4xl font-semibold m-5">Add Event</h1>
                <AddEventForm></AddEventForm>
            </div>
        </>
            
    )
};
