"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface GuestData {
  clusterId: number;
  isAttending: boolean;
  guestnames: string[];
}

export default function Administrator() {
  const router = useRouter();
  const [guests, setGuests] = useState<GuestData[]>([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/admin_auth");
    } else {
      fetchGuests();
    }
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await fetch("http://localhost:3000/api");
      const data = await response.json();
      setGuests(data.guests);
    } catch (err) {
      console.error("Error fetching guests:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/admin/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h1>Admin</h1>
      {guests.map((guest) => (
        <div key={guest.clusterId}>
          <h2>Cluster ID: {guest.clusterId}</h2>
          <ul>
            {guest.guestnames.map((guestname, index) => (
              <li key={`${guest.clusterId}-${index}`}>{guestname}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}