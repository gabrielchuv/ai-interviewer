"use client";

import { Box, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';

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
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: 1100,
      }}
    >
      {showHomeLink && (
        <Link href="/home" style={{ textDecoration: 'none' }}>
          <Button
            startIcon={<HomeIcon />}
            variant="text"
            size="small"
            sx={{ color: 'text.primary' }}
          >
            Home
          </Button>
        </Link>
      )}
      <Box sx={{ flex: 1 }} />
      <Button onClick={handleLogout} variant="outlined" size="small">
        Log out
      </Button>
    </Box>
  );
}
