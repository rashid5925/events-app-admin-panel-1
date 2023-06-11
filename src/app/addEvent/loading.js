'use client';
import { useUserContext } from "@/context/UserContext";
import { useRouter } from 'next/navigation';

export default function Loading() {
    const router = useRouter();
    const { username } = useUserContext();
    if (!username) {
        router.push('/');
    }
    return (
        <div className="flex justify-center items-center w-full h-[100vh]">
            <div className="flex">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>

                    <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-green-500 border-t-transparent shadow-md"></div>
                </div>
            </div>

            <div className="flex">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200"></div>
                    <div className="w-12 h-12 rounded-full animate-spin absolute border-8 border-solid border-purple-500 border-t-transparent shadow-md"></div>
                </div>
            </div>
        </div>
    )
};
