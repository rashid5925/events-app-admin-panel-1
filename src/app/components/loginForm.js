'use client';
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
export default function Login() {

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        window.location.href = '/dashboard';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorMessage} - Code is ${errorCode}`);
        alert("Invalid Authentication");
      });
  };
  
  return (
    
    <div className="bg-gray-200 font-sans text-gray-700 h-[100vh]">
      <div className="container mx-auto p-8 flex">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl text-center mb-12 font-thin font-bold">
            Admin Login
          </h1>
          <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="p-8">
              <form method="POST" onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    value={values.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
