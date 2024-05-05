"use client"

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
  const [attendingGuests, setAttendingGuests] = useState<GuestData[]>([]);
  const [notAttendingGuests, setNotAttendingGuests] = useState<GuestData[]>([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/admin_auth");
    } else {
      fetchGuests();
    }
  }, [router]);

  const fetchGuests = async () => {
    try {
      const response = await fetch("http://localhost:3000/api");
      const data = await response.json();
      setGuests(data.guests);
    } catch (err) {
      console.error("Error fetching guests:", err);
    }
  };

  useEffect(() => {
    const attending = guests.filter((guest) => guest.isAttending);
    const notAttending = guests.filter((guest) => !guest.isAttending);
    setAttendingGuests(attending);
    setNotAttendingGuests(notAttending);
  }, [guests]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/admin_auth");
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100 py-8">
      <div className="container mx-auto px-4 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Admin
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 sm:px-6 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Attending Guests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {attendingGuests.map((guest) => (
              <div
                key={guest.clusterId}
                className="bg-white rounded-lg shadow-md border-l-4 border-main-color"
                style={{
                  borderTopRightRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              >
                <div className="px-4 py-2 sm:px-6 sm:py-4">
                  <h2 className="text-lg font-semibold mb-2 sm:text-xl">
                    Response No.: {guest.clusterId}
                  </h2>
                  <ul className="list-disc ml-4">
                    {guest.guestnames.map((guestname, index) => (
                      <li key={`${guest.clusterId}-${index}`}>{guestname}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Not Attending Guests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {notAttendingGuests.map((guest) => (
              <div
                key={guest.clusterId}
                className="bg-white rounded-lg shadow-md border-l-4 border-main-color"
                style={{
                  borderTopRightRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              >
                <div className="px-4 py-2 sm:px-6 sm:py-4">
                  <h2 className="text-lg font-semibold mb-2 sm:text-xl">
                    Response No.: {guest.clusterId}
                  </h2>
                  <ul className="list-disc ml-4">
                    {guest.guestnames.map((guestname, index) => (
                      <li key={`${guest.clusterId}-${index}`}>{guestname}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
