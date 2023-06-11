'use client';
import { useState, useEffect } from "react";
import { db, storage } from "@/app/firebase/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Sidebar from "@/app/components/sidebar";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import Alert from "@/app/components/alert";
import { useUserContext } from "@/context/UserContext";

export default function UpdateEvent({params}) {
    const router = useRouter();
    const [values, setValues] = useState({});
    useEffect(() => {
        const fetchEvents = async () => {
            const querySnapshot = await getDoc(doc(db, 'Event', params.id));
            const eventDoc = querySnapshot.data();
            let temp = {};
            temp.image = eventDoc.image;
            temp.title = eventDoc.title;
            temp.host_name = eventDoc.host_name;
            temp.type = eventDoc.type;
            temp.category = eventDoc.category;
            temp.capicity = eventDoc.capicity;
            temp.date = eventDoc.date;
            temp.decription = eventDoc.decription;
            temp.location = eventDoc.location;
            temp.payment_method = eventDoc.payment_method;
            temp.price = eventDoc.price;
            temp.time = eventDoc.time;
            setValues(temp);
        };
        fetchEvents();
    }, [params.id]);

    
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState({});
    const { username } = useUserContext();
    if (!username) {
        useEffect(() => {
            router.push('/');
        }, [])
    }
    // Function to send a notification to all users
  async function sendNotificationToAllUsers(notificationDoc) {
    try {
      // Get the FCM token for each user
      const messaging = getMessaging();
      const token = await getToken(messaging);

      // Send a notification to each user
      const notificationPromises = token.map(async (userToken) => {
        const payload = {
          notification: {
            title: "New Notification",
            body: notificationDoc.message,
          },
          token: userToken,
        };

        await fetch("https://fcm.googleapis.com/fcm/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "AAAADyOHPMY:APA91bEhy8W9cUmX91b0Mb8GRuBaGaqE0ncI86ohp0E6C3Y4OdufpaJln2sJvSaP7jLXDUCOczidm11UCsFkjKpX1yoC2c418lqNQT6V_o_ds6L7FhQwi7wn4nJHjTw6dgBQJykYKBsi",
          },
          body: JSON.stringify(payload),
        });
      });

      // Wait for all notifications to be sent
      await Promise.all(notificationPromises);
      console.log("Notification sent to all users");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues(values => ({...values, [name]: value}));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const fileInp = document.getElementById('image');
        const fileVal = fileInp.files[0];

        values.join_members = 0;
        const uniqueId = params.id;
        values.id = uniqueId;

        
        if (fileInp.value != '') {
            const imageRef = ref(storage, `Event Images/${uuidv4()}`);
            const upload = uploadBytes(imageRef, fileVal);
            upload.then(async (snapshot) => {
                    const downloadUrl = await getDownloadURL(snapshot.ref);
                    values.image = downloadUrl;
                    try {
                        const customDocRef = doc(db, "Event", uniqueId);
                        await updateDoc(customDocRef, {
                            ...values
                        });
                    setShowMessage(true);
                    setMessage({'value': 'Event Updated Successfully', 'color': 'teal'});
                    router.push('/dashboard');
                } 
                catch (err) {
                    setShowMessage(true);
                    setMessage({'value': 'Error while updating Event', 'color': 'red'});
                }
                //Push Notification
                let createdAt = new Date();
                let eventId = values.id;
                const notificationID = uuidv4();
                var notificationMessage = values.title + ' event plan changed';
                const notificationDocRef = doc(db, "Global-Notification", uniqueId);
                let notificationDoc = {
                    created_at: createdAt,
                    event_id: eventId,
                    id: notificationID,
                    message: notificationMessage,
                };
                await setDoc(notificationDocRef, notificationDoc);
                sendNotificationToAllUsers(notificationDoc);
            });
        } else {
            
            try {
                    const customDocRef = doc(db, "Event", uniqueId);
                    await updateDoc(customDocRef, {
                        ...values
                    });
                    setShowMessage(true);
                    setMessage({'value': 'Event Updated Successfully', 'color': 'teal'});
                    router.push('/dashboard');
            } 
            catch (err) {
                setShowMessage(true);
                setMessage({'value': 'Error while updating Event', 'color': 'red'});
            }
            //Push Notification
            let createdAt = new Date();
            let eventId = values.id;
            const notificationID = uuidv4();
            var notificationMessage = values.title + ' event plan changed';
            const notificationDocRef = doc(db, "Global-Notification", uniqueId);
            let notificationDoc = {
                created_at: createdAt,
                event_id: eventId,
                id: notificationID,
                message: notificationMessage,
            };
            await setDoc(notificationDocRef, notificationDoc);
            sendNotificationToAllUsers(notificationDoc);
        }
    }
    return (
        <>
            <Sidebar></Sidebar>
            <div className="ms-[150px] lg:ms-[300px] md:ms-[200px]">
                <h1 className="text-4xl font-semibold m-5">Update Event</h1>
                <form className="m-5" method="POST" onSubmit={handleSubmit}>
                    {showMessage ? <Alert params={{message}}></Alert>: ''}
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium leading-6 text-gray-900 p-1"
                        >
                            Title
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="title"
                            id="title"
                            autoComplete="given-title"
                            className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={values.title} onChange={handleChange} required />
                        </div>
                        </div>

                        <div className="sm:col-span-3 mt-2">
                        <label
                            htmlFor="type"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Type
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="type"
                            id="type"
                            autoComplete="type"
                            className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={values.type} onChange={handleChange} required />
                        </div>
                        </div>

                        <div className="sm:col-span-4">
                        <label
                            htmlFor="location"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Location
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="location"
                            id="location"
                            autoComplete="location"
                            className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={values.location} onChange={handleChange} required />
                        </div>
                        </div>
                        <div className="sm:col-span-2">
                        <label
                            htmlFor="host_name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Host Name
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="host_name"
                            id="host_name"
                            autoComplete="host_name"
                            className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={values.host_name} onChange={handleChange} required />
                        </div>
                        </div>
                        <div className="sm:col-span-2">
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Date
                        </label>
                        <div className="mt-2">
                            <input
                            id="date"
                            name="date"
                            type="date"
                            autoComplete="date"
                            className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={values.date} onChange={handleChange} required />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label
                            htmlFor="capicity"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Capacity
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="capicity"
                            id="capicity"
                            autoComplete="capicity"
                            className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={values.capicity} onChange={handleChange} required />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label
                            htmlFor="payment_method"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Payment Method
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="payment_method"
                            id="payment_method"
                            autoComplete="payment_method"
                            className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={values.payment_method} onChange={handleChange} required />
                        </div>
                        </div>

                        <div className="col-span-full">
                        <label
                            htmlFor="decription"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                            id="decription"
                            name="decription"
                            rows="3"
                            className="block w-full rounded-md p-1 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={values.decription} onChange={handleChange} required ></textarea>
                        </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Price
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="price"
                            id="price"
                            autoComplete="price"
                            className="block w-full rounded-md p-1 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={values.price} onChange={handleChange} required />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label
                            htmlFor="time"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Time
                        </label>
                        <div className="mt-2">
                            <input
                            type="time"
                            name="time"
                            id="time"
                            autoComplete="time"
                            className="block w-full rounded-md p-1 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={values.time} onChange={handleChange} required />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Category
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="category"
                            id="category"
                            autoComplete="category"
                            className="block w-full rounded-md p-1 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={values.category} onChange={handleChange} required />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-span-full">
                    <label
                        htmlFor="image"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Image {values.image}
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
                        name="image"
                        id="image"
                        accept="image/*"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        />
                    </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-[20px]"
                    >
                    Update
                    </button>
                </div>
                </form>
            </div>
        </>
    )
};
