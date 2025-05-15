"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Code2 } from "lucide-react";
import { Button } from "../uiLibrary";

interface HeaderProps {
  isFreeTrial?: boolean;
}

export default function Header({ isFreeTrial = false }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const showHomeLink = pathname !== "/interview";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header
      style={{
        padding: "0 1rem",
        height: "4rem",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid rgb(55, 65, 81)", // border-gray-700
        backgroundColor: "rgb(17, 24, 39)", // bg-gray-900
      }}
    >
      <div
        style={{
          container: "content",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link
            href={isFreeTrial ? "/" : (showHomeLink ? "/home" : "#")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Code2
              style={{
                height: "1.5rem",
                width: "1.5rem",
                marginRight: "0.5rem",
                color: "rgb(96, 165, 250)", // text-blue-400
              }}
            />
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.125rem",
                color: "rgb(96, 165, 250)", // text-blue-400
              }}
            >
              AlgoMentor
            </span>
          </Link>
        </div>

        {!isFreeTrial && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors duration-200"
            >
              Log out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
