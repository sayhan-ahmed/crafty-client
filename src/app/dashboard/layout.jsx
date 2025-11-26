"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAllowed(true);
      } else {
        router.replace("/login");
      }
      setIsReady(true);
    });

    return () => unsubscribe();
  }, [router]);

  // Block everything until auth is checked
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Checking authentication…</span>
      </div>
    );
  }

  if (!isAllowed) return null;
  return <>{children}</>;
}
