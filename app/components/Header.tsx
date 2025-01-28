"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Code2 } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const showHomeLink = pathname !== '/interview';

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="px-4 lg:px-6 h-16 lg:h-20 flex items-center border-b border-gray-700 bg-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link className="flex items-center justify-center" href={showHomeLink ? "/home" : "#"}>
            <Code2 className="h-6 w-6 mr-2 lg:h-8 lg:w-8 lg:mr-3 text-blue-400" />
            <span className="font-bold text-lg lg:text-xl text-blue-400">AlgoMentor</span>
          </Link>
        </div>
        
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors duration-200"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
