import AddUserForm from "../components/addUserForm";
import Sidebar from "../components/sidebar"

export default function AddUser() {
    return (
        <>
            <Sidebar></Sidebar>
            <div className="ms-[150px] lg:ms-[300px] md:ms-[200px]">
                <h1 className="text-4xl font-semibold m-5">Add User</h1>
                <AddUserForm></AddUserForm>
            </div>
        </>
    );
};
