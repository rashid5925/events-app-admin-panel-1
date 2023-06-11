'use client';
import AddUserForm from "../components/addUserForm";
import Sidebar from "../components/sidebar";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function AddUser() {
    const router = useRouter();
    const { username } = useUserContext();
    if (!username) {
        useEffect(() => {
            router.push('/');
        }, [])
    }
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
