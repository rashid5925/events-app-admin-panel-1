'use client';
import Image from "next/image"
import { useState } from "react";
import { db } from '../firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import Link from "next/link";

export default function Table({params}) {
    const [data, setData] = useState(params?.data || []);
    let headers = params.headerData;
    const role = params.role;

    const handleDeleteEvent = async (id) => {
        let conf = window.confirm('Are you sure you delete?');
        if (conf) {
            try {
                if (role == 'events') {
                    await deleteDoc(doc(db, 'Event', id));
                } else if (role == 'user') {
                    await deleteDoc(doc(db, 'Users', id));
                }
                setData(data.filter((event) => event.id !== id));
            } catch (error) {
            console.error('Error deleting event:', error);
            }
        } 
    };
    return (
        <div className="drop-shadow-md p-5 me-5 text-center overflow-x-auto">
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-slate-200">
                        {headers.map((element, i) => {
                            return (
                            <th key={i} className="p-3">{element}</th>
                        )})}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((rows, index) => {
                        return (
                        <tr key={index} className={index % 2 == 1 ? 'bg-slate-100' : ''}>
                            {Object.keys(rows).map((element, i) => {
                                {
                                return (
                                i == 0 ? '' : i == 1 ?
                                    rows[element] != '' ? <td key={i} className="p-3"><Image src={rows[element]} alt="Event Photo" width={50} height={50} /></td> : <td key={i}>Image</td>
                                    : <td key={i} className="p-3">{element == 'is_deleted' ? !rows[element] ? 'Active': 'Deleted': rows[element]}</td>
                            )}})}
                            <td className="p-3">
                                <Link id={rows.id} href={role == 'events'? `dashboard/${rows.id}`: `users/${rows.id}`} className="rounded-lg bg-teal-200 p-2 hover:bg-teal-300">Update</Link>
                                <button id={rows.id} onClick={() => handleDeleteEvent(rows.id)} className="rounded-lg bg-red-200 p-2 mt-4 hover:bg-red-300">Delete</button>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
    )
};
