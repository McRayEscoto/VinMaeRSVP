"use client";
import { useState, ChangeEvent, FormEvent } from "react";

export default function RSVP() {
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [guestName, setGuestName] = useState<string>("");
  const [guestList, setGuestList] = useState<string[]>([]);

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
      setGuestList([...guestList, guestName.trim()]);
      setGuestName("");
    }
  };

  const handleDeleteGuest = (index: number) => {
    const updatedGuestList = [...guestList];
    updatedGuestList.splice(index, 1);
    setGuestList(updatedGuestList);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission if needed
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
                disabled={
                  !isAttending && guestList.length >= 1
                }
              />
              <button
                type="button"
                onClick={handleAddGuest}
                disabled={
                  !isAttending && guestList.length >= 1
                }
              >
                Add
              </button>
            </div>
            <div>
              <p>Guests:</p>
              <ul>
                {guestList.map((guest, index) => (
                  <li key={index}>
                    {guest}
                    <button
                      type="button"
                      onClick={() => handleDeleteGuest(index)}
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
