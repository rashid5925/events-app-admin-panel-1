'use client';
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Table from "../components/table";
import Loading from "../loading";
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useUserContext } from "@/context/UserContext";
import { useRouter } from 'next/navigation';

export default function Users() {
    const router = useRouter();
    const [dataDb, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
        const querySnapshot = await getDocs(collection(db, 'Users'));
        const documents = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
        }));
        let dbTemp = [];
        documents.forEach((e) => {
            let temp = {};
            temp.id = e.uid;
            temp.image = e.profile_image;
            temp.name = e.name;
            temp.email = e.email;
            temp.plan = e.plan;
            temp.is_deleted = e.is_deleted;
            dbTemp.push(temp);
        });
        setEvents(dbTemp);
    }
        fetchEvents();
    }, []);
    const { username } = useUserContext();
    if (!username) {
        useEffect(() => {
            router.push('/');
        }, [])
    }
    let data = {'headerData': ['Photo', 'Name', 'Email', 'Plan',
    'Status'], 
    'data': dataDb, 'role': 'user'};
    return (
        <>
            <Sidebar></Sidebar>
            <div className="ms-[150px] lg:ms-[300px] md:ms-[200px]">
                <h1 className="text-4xl font-semibold m-5">Users</h1>
                {data.data.length > 0 ? (
                <Table params={data} />
                ) : (
                <Loading></Loading>
                )}
            </div>
        </>
    )
};
