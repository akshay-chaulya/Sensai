"use client";

import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { system, dark, light } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function ClerkThemeSync() {
  const { theme } = useTheme();
  const { setAppearance } = useClerk(); // Clerk's function to update appearance
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("ClerkThemeSync");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const clerkTheme =
      theme === "dark" ? dark : theme === "light" ? light : system;
    setAppearance({ baseTheme: clerkTheme });
  }, [theme, mounted]);

  return null; // No UI, just sync theme
}
