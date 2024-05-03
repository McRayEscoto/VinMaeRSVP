"use client";
import Image from "next/image";
import { Cormorant_Garamond, Sacramento, Platypi } from "next/font/google";
import { useState, ChangeEvent, FormEvent } from "react";

const inter = Platypi({
  weight: "500",
  subsets: ["latin"], // Add the subsets you need
});

const cormorant = Cormorant_Garamond({
  weight: "500",
  subsets: ["latin"], // Add the subsets you need
});

const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin-ext"], // Add the subsets you need
});

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
      const response = await fetch("http://localhost:3000/api/", {
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
    <div className="flex w-5/6 h-5/6 border border-black blur-none">
      <div className="relative w-3/5 border border-red-500 flex flex-col items-center">
        <p
          className={`${cormorant.className} w-fit h-fit text-color-main text-xl`}
        >
          RSVP
        </p>
        <Image
          className="absolute top-40% left-1/2 transform -translate-x-1/2 -translate-y-1/2  border border-black"
          src="/philjane.png"
          width={450}
          height={100}
          alt="Picture of the author"
        />
        <form
          onSubmit={handleSubmit}
          className="w-full h-1/2 absolute bottom-0 border border-black"
        >
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
          <button type="submit">Submit RSVP</button>
        </form>
      </div>
      <Image
        className="absolute bottom-0 right-0 border border-black"
        src="/boquet.png"
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </div>
  );
}
