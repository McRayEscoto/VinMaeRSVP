"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface GuestDetails {
  guestname: string;
  address: string;
}

interface GuestData {
  clusterId: number;
  isAttending: boolean;
  guestdetails: GuestDetails[];
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
      const response = await fetch("https://philip-jane-rsvp.vercel.app/api");
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

  const handleDeleteGuest = async (clusterId: number) => {
    if (window.confirm("Do you really want to delete this guest?")) {
      try {
        const response = await fetch(`/api/${clusterId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Remove the deleted guest from the state
          setGuests((prevGuests) =>
            prevGuests.filter((guest) => guest.clusterId !== clusterId)
          );
        } else {
          console.error("Error deleting guest:", await response.text());
        }
      } catch (err) {
        console.error("Error deleting guest:", err);
      }
    }
  };

  return (
    <div className="flex flex-col w-4/5 min-h-screen py-8">
      <div className="container flex-grow px-4 mx-auto">
        {/* ... */}
        <div>
          <h2 className="mb-4 text-lg font-semibold sm:text-xl">
            Attending Guests
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {attendingGuests.map((guest) => (
              <div
                key={guest.clusterId}
                className="bg-white border-l-4 rounded-lg shadow-md border-main-color"
                style={{
                  borderTopRightRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              >
                <div className="px-4 py-2 sm:px-6 sm:py-4">
                  <h2 className="mb-2 text-lg font-semibold sm:text-xl">
                    Response No.: {guest.clusterId}
                  </h2>
                  <ul className="ml-4 list-disc">
                    {guest.guestdetails.map((guestDetail, index) => (
                      <li key={index}>
                        {guestDetail.guestname}, {guestDetail.address}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleDeleteGuest(guest.clusterId)}
                  className="px-2 py-1 text-white transition-colors duration-300 bg-red-500 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-semibold sm:text-xl">
            Not Attending Guests
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {notAttendingGuests.map((guest) => (
              <div
                key={guest.clusterId}
                className="bg-white border-l-4 rounded-lg shadow-md border-main-color"
                style={{
                  borderTopRightRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              >
                <div className="px-4 py-2 sm:px-6 sm:py-4">
                  <h2 className="mb-2 text-lg font-semibold sm:text-xl">
                    Response No.: {guest.clusterId}
                  </h2>
                  <ul className="ml-4 list-disc">
                    {guest.guestdetails.map((guestDetail, index) => (
                      <li key={index}>
                        {guestDetail.guestname}, {guestDetail.address}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleDeleteGuest(guest.clusterId)}
                  className="px-2 py-1 text-white transition-colors duration-300 bg-red-500 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
