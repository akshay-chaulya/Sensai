"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const logoUrl =
    resolvedTheme === "light" ? "/logo_light_mode.png" : "/logo.png";

  return (
    <Image
      src={logoUrl}
      alt="Logo"
      width={200}
      height={60}
      className="h-12 w-auto object-contain drop-shadow-2xl"
    />
  );
};

export default Logo;
