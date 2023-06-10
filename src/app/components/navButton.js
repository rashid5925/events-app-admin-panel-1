import Link from "next/link";

export default function NavButton({params}) {
    let navTo = params.navTo || "/dashboard";
    return (
        <Link href={navTo} className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <div className="text-[15px] ml-4 text-gray-200 font-bold" >{params.value}</div>
        </Link>
    )
};
