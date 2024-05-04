"use client";
import Image from "next/image";
import { Cormorant_Garamond, Inter, Sacramento } from "next/font/google";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faTrash,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const inter = Inter({
  weight: "500",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: "500",
  subsets: ["latin"],
});

const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin-ext"],
});

export default function RSVP() {
  const [isAttending, setIsAttending] = useState<boolean>(true);
  const [guestName, setGuestName] = useState<string>("");
  const [guestList, setGuestList] = useState<{ id: string; name: string }[]>(
    []
  );
  const [hoveredGuest, setHoveredGuest] = useState<string | null>(null);
  const [lastClusterId, setLastClusterId] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLastClusterId();
  }, []);

  const fetchLastClusterId = async () => {
    try {
      const response = await fetch("https://vin-mae-rsvp.vercel.app/api/");
      if (!response.ok) {
        throw new Error("Failed to fetch last cluster ID");
      }
      const data = await response.json();
      setLastClusterId(
        data.guests.length > 0
          ? data.guests[data.guests.length - 1].clusterId + 1
          : 1
      );
    } catch (error) {
      console.error("Error fetching last cluster ID:", error);
      setError("Failed to fetch last cluster ID");
    }
  };

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
      clusterId: lastClusterId,
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
      setIsAttending(false);
      setGuestName("");
      setGuestList([]);
      setLastClusterId(lastClusterId + 1);
      console.log("RSVP submitted successfully!");
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setError("Failed to submit RSVP");
    }
  };

  return (
    <div
      className={`${cormorant.className} flex items-center w-5/6 h-full blur-none`}
    >
      {error && <p>Error: {error}</p>}
      <div className="w-3/5 h-5/6 flex flex-col items-center">
        <div className="w-full flex flex-col justify-start items-center">
          <p
            className={`${cormorant.className} w-fit h-fit text-color-main text-xl `}
          >
            RSVP
          </p>
          <Image
            src="/philjane.png"
            width={450}
            height={100}
            alt="Picture of the author"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-5/6 h-full flex flex-col justify-start items-start gap-5"
        >
          {isAttending !== null && (
            <div className="flex w-full flex-col">
              <label htmlFor="guestName" className="text-4xl">
                Guest Name: {lastClusterId}
              </label>
              <div className="flex w-full gap-3">
                <input
                  type="text"
                  id="guestName"
                  value={guestName}
                  onChange={handleNameChange}
                  disabled={!isAttending && guestList.length >= 1}
                  className="w-11/12 h-14 text-[40px] indent-6 border-dotted border-b-4 border-gray-500 bg-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddGuest}
                  disabled={!isAttending && guestList.length >= 1}
                >
                  <FontAwesomeIcon
                    className="text-[40px] text-amber-400"
                    icon={faUserPlus}
                  />
                </button>
              </div>
            </div>
          )}
          <div className="w-full flex gap-4">
            <div className="w-11/12 flex flex-col justify-center items-start text-[24px]">
              <div className="flex items-center mr-4">
                <input
                  id="yes"
                  name="attending"
                  type="radio"
                  value="yes"
                  defaultChecked
                  onChange={handleRadioChange}
                  className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:border-lime-500 checked:bg-color-main transition-colors duration-300 cursor-pointer"
                />
                <label htmlFor="yes" className="ml-2 text-gray-700">
                  Can&apos;t wait. See you soon!
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="no"
                  name="attending"
                  type="radio"
                  value="no"
                  onChange={handleRadioChange}
                  className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-500 checked:border-red-600 transition-colors duration-300 cursor-pointer"
                />
                <label htmlFor="no" className="ml-2 text-gray-700">
                  Sorry, can&apos;t make it.
                </label>
              </div>
            </div>
            <button type="submit" className="w-1/12">
              <FontAwesomeIcon
                className="text-[40px] text-sky-600"
                icon={faPaperPlane}
              />
              <label>Submit!</label>
            </button>
          </div>
          <div
            className={`${inter.className} w-5/6 text-3xl text-color-secondary`}
          >
            <div>
              <p className="text-base">Guest Names:</p>
              <ul className="text-base flex flex-col gap-1">
                {guestList.map((guest, index) => (
                  <li
                    key={guest.id}
                    className="flex items-center gap-2"
                    onMouseEnter={() => setHoveredGuest(guest.id)}
                    onMouseLeave={() => setHoveredGuest(null)}
                  >
                    <p>
                      {guest.id}. {guest.name}
                    </p>
                    {hoveredGuest === guest.id && (
                      <button
                        type="button"
                        onClick={() => handleDeleteGuest(guest.id)}
                        className="hover:text-red-500 transition-colors duration-200"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </form>
      </div>

      <div className="w-2/5 h-5/6 flex flex-col items-end justify-end">
        <div className="w-full flex justify-end text-[30px]">
          <p>Guests:&nbsp;</p>
          <p>{guestList.length}</p>
        </div>
        <img
          src="/boquet.png"
          className="w-full aspect-square"
          alt="Picture of the author"
        />
      </div>
    </div>
  );
}
