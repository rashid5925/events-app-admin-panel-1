'use client';
import { useState } from "react";
import {db, storage} from '../firebase/firebase';
import {doc, setDoc} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import Alert from "./alert";

export default function AddUserForm() {
    const [values, setValues] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues(values => ({...values, [name]: value}));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const fileInp = document.getElementById('profile_image');
        let fileVal = fileInp.files[0];
        
        const uniqueId = uuidv4();
        values.uid = uniqueId;
        values.is_deleted = false;
        const imageRef = ref(storage, `Profile Images/${uuidv4()}`);
        const upload = uploadBytes(imageRef, fileVal);
        
        upload.then(async (snapshot) => {
            const downloadUrl = await getDownloadURL(snapshot.ref);
            values.profile_image = downloadUrl;
            try {
                const customDocRef = doc(db, "Users", uniqueId);
                await setDoc(customDocRef, {
                    ...values
                });
                setShowMessage(true);
                setMessage({'value': 'User Added Successfully', 'color': 'teal'});
                setValues({
                    name: '',
                    email: '',
                    plan: ''
                });
                fileInp.value = '';
            } 
            catch (err) {
                console.log(err);
                setShowMessage(true);
                setMessage({'value': 'Error while Adding User', 'color': 'red'});
            }
        });
    }
    return (
        
        <form className="m-5" method="POST" onSubmit={handleSubmit}>
            {showMessage ? <Alert params={{message}}></Alert>: ''}
        <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900 p-1"
                >
                    Name
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.name} onChange={handleChange} required />
                </div>
                </div>

                <div className="sm:col-span-3 mt-2">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Email
                </label>
                <div className="mt-2">
                    <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.email} onChange={handleChange} required />
                </div>
                </div>

                <div className="sm:col-span-4">
                <label
                    htmlFor="plan"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Plan
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    id="plan"
                    name="plan"
                    autoComplete="plan"
                    className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.plan} onChange={handleChange} required />
                </div>
                </div>

            </div>
            </div>
            <div className="col-span-full">
            <label
                htmlFor="profile_image"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Profile Image
            </label>
            <div className="flex items-center gap-x-3">
                <svg
                className="h-12 w-12 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                >
                <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                />
                </svg>
                <input
                type="file"
                name="profile_image"
                id="profile_image"
                accept="image/*"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                required />
            </div>
            </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-[20px]"
            >
            Save
            </button>
        </div>
        </form>
    );
}
