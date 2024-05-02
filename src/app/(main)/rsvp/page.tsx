"use client";
import { useState, ChangeEvent, FormEvent } from "react";

export default function RSVP() {
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [guestName, setGuestName] = useState<string>("");
  const [guestList, setGuestList] = useState<{ id: string; name: string }[]>(
    []
  );
  const clusterId = 123; // Cluster ID assumed to be static

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAttending(e.target.value === "yes");
    if (e.target.value === "no") {
      setGuestList([]);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGuestName(e.target.value);
  };

  const handleAddGuest = () => {
    if (guestName.trim() !== "") {
      const newGuest = {
        id: String(guestList.length + 1),
        name: guestName.trim(),
      };
      setGuestList([...guestList, newGuest]);
      setGuestName("");
    }
  };

  const handleDeleteGuest = (id: string) => {
    const updatedGuestList = guestList.filter((guest) => guest.id !== id);
    setGuestList(updatedGuestList);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      clusterId,
      isAttending,
      guestnames: guestList.map((guest) => guest.name),
    };

    try {
      const response = await fetch("https://vin-mae-rsvp.vercel.app/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit RSVP");
      }

      // Clear form data after successful submission
      setIsAttending(null);
      setGuestName("");
      setGuestList([]);
      console.log("RSVP submitted successfully!");
    } catch (error: any) {
      console.error("Error submitting RSVP:", error.message);
    }
  };

  return (
    <div>
      <h1>Welcome to the RSVP</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Are you attending?</p>
          <div>
            <input
              type="radio"
              id="yes"
              name="attending"
              value="yes"
              onChange={handleRadioChange}
            />
            <label htmlFor="yes">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              id="no"
              name="attending"
              value="no"
              onChange={handleRadioChange}
            />
            <label htmlFor="no">No</label>
          </div>
        </div>
        {isAttending !== null && (
          <>
            <div>
              <label htmlFor="guestName">Guest Name:</label>
              <input
                type="text"
                id="guestName"
                value={guestName}
                onChange={handleNameChange}
                disabled={!isAttending && guestList.length >= 1}
              />
              <button
                type="button"
                onClick={handleAddGuest}
                disabled={!isAttending && guestList.length >= 1}
              >
                Add
              </button>
            </div>
            <div>
              <p>Guests:</p>
              <ul>
                {guestList.map((guest, index) => (
                  <li key={guest.id}>
                    {guest.name}
                    <button
                      type="button"
                      onClick={() => handleDeleteGuest(guest.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <p>Number of Guests: {guestList.length}</p>
            </div>
          </>
        )}
        <button type="submit">Submit RSVP</button>
      </form>
    </div>
  );
}
