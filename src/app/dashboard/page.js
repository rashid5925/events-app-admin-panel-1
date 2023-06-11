'use client';
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Table from "../components/table";
import Loading from "../loading";
import { db, storage } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useUserContext } from "@/context/UserContext";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [dataDb, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
            const querySnapshot = await getDocs(collection(db, 'Event'));
            const documents = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            let dbTemp = [];
            documents.forEach((e) => {
                let temp = {};
                temp.id = e.id;
                temp.image = e.image;
                temp.title = e.title;
                temp.host_name = e.host_name;
                temp.type = e.type;
                temp.category = e.category;
                temp.capicity = e.capicity;
                temp.date = e.date;
                temp.decription = e.decription;
                temp.join_members = e.join_members;
                temp.location = e.location;
                temp.payment_method = e.payment_method;
                temp.price = e.price;
                temp.time = e.time;
                dbTemp.push(temp);
            });
            setEvents(dbTemp);
        }
            fetchEvents();
        }, []);
    const { username } = useUserContext();
    if (!username) {
        router.push('/');
    }
    let data = {'headerData': ['Photo', 'Title', 'Host Name', 'Type',
        'Category', 'Capacity', 'Date', 'Description',
        'Members Joined', 'Location', 'Payment Method', 'Price',
        'Time'], 
        'data': dataDb, 'role': 'events'};
    return (
        <>
            <Sidebar></Sidebar>
            <div className="ms-[150px] lg:ms-[300px] md:ms-[200px]">
                <h1 className="text-4xl font-semibold m-5">Dashboard</h1>
                {data.data.length > 0 ? (
                <Table params={data} />
                ) : (
                <Loading></Loading>
                )}
            </div>
        </>
    )
};