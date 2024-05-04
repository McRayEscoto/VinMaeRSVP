"use client";
import Image from "next/image";
import { Cormorant, Inter, Dawning_of_a_New_Day } from "next/font/google";
import localFont from "next/font/local";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faUserPlus,
   faXmark,
   faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const inter = Inter({ subsets: ["latin"] });
const cormorant = Cormorant({ subsets: ["latin"] });
const halimun = localFont({ src: "/Halimun.ttf" });
const dawning = Dawning_of_a_New_Day({ weight: ["400"], subsets: ["latin"] });

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
      <main
         className={`${cormorant.className} px-4 lg:flex lg:px-16 lg:pt-8`}
      >
         <section>
            {error && <p>Error: {error}</p>}
            <header
               className={`relative mb-6 flex flex-col items-center justify-center lg:mb-10`}
            >
               <h1
                  className={`${cormorant.className} font-medium text-color-main text-9xl lg:text-[15rem]`}
               >
                  RSVP
               </h1>
               <span
                  className={`${halimun.className} absolute -bottom-4 text-3xl lg:text-5xl`}
               >
                  Philip <span className={`${dawning.className}`}>+</span> Jane
               </span>
            </header>

            <form
               onSubmit={handleSubmit}
               className={`flex flex-col gap-2 text-xl mb-4`}
            >
               {isAttending !== null && (
                  <section>
                     <label htmlFor="guestName">
                        Guest Name: {lastClusterId}
                     </label>
                     <div
                        className={`w-full flex gap-2 items-center justify-center`}
                     >
                        <input
                           type="text"
                           id="guestName"
                           value={guestName}
                           onChange={handleNameChange}
                           placeholder={
                              !isAttending && guestList.length >= 1
                                 ? "Thank you"
                                 : "Enter guest name"
                           }
                           onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                 handleAddGuest();
                              }
                           }}
                           disabled={!isAttending && guestList.length >= 1}
                           className="w-full font-bold p-1 px-2 border-dotted border-b-4 border-gray-500 bg-transparent"
                        />
                        <button
                           type="button"
                           onClick={handleAddGuest}
                           disabled={!isAttending && guestList.length >= 1}
                           className={`p-2 rounded text-color-secondary transition-all hover:bg-color-main hover:text-white`}
                        >
                           <FontAwesomeIcon icon={faUserPlus} />
                        </button>
                     </div>
                  </section>
               )}
               <section className="flex flex-col gap-2">
                  <div>
                     <label
                        htmlFor="yes"
                        className="text-gray-700 cursor-pointer flex items-center gap-2 w-fit"
                     >
                        <input
                           id="yes"
                           name="attending"
                           type="radio"
                           value="yes"
                           defaultChecked
                           onChange={handleRadioChange}
                           className="appearance-none size-5 rounded-full border-2 border-gray-400 checked:border-lime-500 checked:bg-color-main transition-all cursor-pointer"
                        />
                        Can&apos;t wait. See you soon!
                     </label>
                     <label
                        htmlFor="no"
                        className="text-gray-700 cursor-pointer flex items-center gap-2 w-fit"
                     >
                        <input
                           id="no"
                           name="attending"
                           type="radio"
                           value="no"
                           onChange={handleRadioChange}
                           className="appearance-none size-5 rounded-full border-2 border-gray-400 checked:bg-red-500 checked:border-red-600 transition-all cursor-pointer"
                        />
                        Sorry, can&apos;t make it.
                     </label>
                  </div>
                  <button
                     type="submit"
                     className="text-gray-700 cursor-pointer flex items-center gap-2 w-fit font-bold"
                  >
                     <FontAwesomeIcon icon={faPaperPlane} />
                     Submit!
                  </button>
               </section>
            </form>

            <section className="text-xl">
               <p>Guest Names:</p>
               <ul>
                  {guestList.map((guest, index) => (
                     <li
                        key={guest.id}
                        className="w-fit flex items-center gap-2"
                     >
                        <button
                           type="button"
                           onClick={() => handleDeleteGuest(guest.id)}
                           className="transition-all flex items-center justify-center hover:text-red-500"
                        >
                           <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <p>
                           {guest.id}. {guest.name}
                        </p>
                     </li>
                  ))}
               </ul>
            </section>
         </section>

         <section className="flex flex-col items-end justify-end text-3xl lg:text-5xl">
            <div className="w-full flex justify-end">
               <p>Guests: {guestList.length}</p>
            </div>
            <img className="w-3/4 md:w-1/2 lg:w-3/4" src="/boquet.png" alt="flower" />
         </section>
      </main>
   );
}
