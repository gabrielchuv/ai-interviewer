"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Code2 } from "lucide-react";
import { Button } from "../uiLibrary";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const showHomeLink = pathname !== "/interview";
  const isFreeTrial = pathname === "/freeTrial";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSignUp = () => {
    router.push("/signup");
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
            href={showHomeLink ? "/home" : "#"}
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

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {isFreeTrial ? (
            <>
              <span style={{ 
                color: "rgb(156, 163, 175)", // text-gray-400
                fontSize: "0.875rem",
                fontWeight: "medium"
              }}>
                Unlock unlimited interviews and personalized feedback!
              </span>
              <Button
                onClick={handleSignUp}
                className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md font-medium transition-colors duration-200"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors duration-200"
            >
              Log out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
