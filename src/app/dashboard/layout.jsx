"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (!user) {
          // not signed in — send to login
          router.replace("/login");
        }
        // if user exists, we let children render
        setChecking(false);
      },
      (err) => {
        console.error("onAuthStateChanged error:", err);
        setChecking(false);
        router.replace("/login");
      }
    );

    return () => unsubscribe();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Checking authentication…</span>
      </div>
    );
  }

  return <>{children}</>;
}
