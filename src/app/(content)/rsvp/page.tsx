"use client";
import Image from "next/image";
import {
  Cormorant,
  Inter,
  Dawning_of_a_New_Day,
  Ms_Madi,
} from "next/font/google";
import localFont from "next/font/local";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faXmark,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bouquetImage from "../../../../public/boquet.png";

const msmadi = Ms_Madi({ weight: ["400"], subsets: ["vietnamese"] });
const cormorant = Cormorant({ subsets: ["latin"] });
const halimun = localFont({ src: "/Halimun.ttf" });
const inter = Inter({ subsets: ["latin"], weight: ["400"] });
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
      const response = await fetch("https://philip-jane-rsvp.vercel.app/api/");
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
      const response = await fetch("https://philip-jane-rsvp.vercel.app/api/", {
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
      toast.success("Thank you for responding!");
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setError("Failed to submit RSVP");
    }
  };

  return (
    <>
      <ToastContainer />
      <main
        className={`${cormorant.className} w-full h-full gap-6 p-4 flex flex-col lg:flex-row lg:w-5/6`}
      >
        <section className="flex flex-col gap-4 lg:w-1/2">
          <header
            className={`flex flex-col items-center gap-2 justify-center lg:mb-10`}
          >
            <h1
              className={`${cormorant.className} font-medium text-color-main text-9xl lg:text-[15rem]`}
            >
              RSVP
            </h1>
            <b
              className={`${msmadi.className} -mt-4 text-4xl lg:-bottom-8 lg:text-6xl`}
            >
              <span className="text-8xl w-fit">P</span>hilip&nbsp; & &nbsp;
              <span className="text-8xl">J</span>ane
            </b>
            <div className="flex flex-col items-center justify-center w-full gap-1 h-fit md:flex-col lg:flex-row lg:gap-3">
              <span className="text-xl">
                <b className="text-3xl">09.15.2024</b>
              </span>
              <span className="text-base tracking-wide lg:">
                Saitama Prefecture, Japan
              </span>
            </div>
          </header>
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-4 border border-gray-300 p-4 rounded-md lg:text-2xl`}
          >
            {isAttending !== null && (
              <section>
                <label htmlFor="guestName">Guest Name:</label>
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
                    className="w-full p-1 px-2 font-bold bg-transparent border-b-4 border-gray-500 border-dotted"
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
            <section className="flex flex-col gap-2 ">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="yes"
                  className="flex items-center gap-2 text-gray-700 cursor-pointer w-fit"
                >
                  <input
                    id="yes"
                    name="attending"
                    type="radio"
                    value="yes"
                    defaultChecked
                    onChange={handleRadioChange}
                    className="transition-all border-2 border-gray-400 rounded-full appearance-none cursor-pointer size-5 checked:border-lime-500 checked:bg-color-main"
                  />
                  Can&apos;t wait. See you soon!
                </label>
                <label
                  htmlFor="no"
                  className="flex items-center gap-2 text-gray-700 cursor-pointer w-fit"
                >
                  <input
                    id="no"
                    name="attending"
                    type="radio"
                    value="no"
                    onChange={handleRadioChange}
                    className="transition-all border-2 border-gray-400 rounded-full appearance-none cursor-pointer size-5 checked:bg-red-500 checked:border-red-600"
                  />
                  Sorry, can&apos;t make it.
                </label>
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 font-bold text-gray-700 transition duration-300 ease-in-out cursor-pointer w-fit hover:scale-110"
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="transition duration-300 ease-in-out hover:scale-110"
                />
                <span className="transition duration-300 ease-in-out hover:scale-110">
                  Submit!
                </span>
              </button>
            </section>
          </form>
          <div className="w-full">
            <section className="p-4 text-xl border border-gray-300 rounded-md">
              <p>Guest List:</p>
              <ul>
                {guestList.map((guest, index) => (
                  <li key={guest.id} className="flex items-center gap-2 w-fit">
                    <button
                      type="button"
                      onClick={() => handleDeleteGuest(guest.id)}
                      className="flex items-center justify-center transition-all hover:text-red-500"
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
          </div>
        </section>
        <section className="flex flex-col-reverse items-end justify-center h-full text-sm lg:w-1/2 lg:flex-col lg:text-5xl">
          <Image
            className="w-4/5 md:w-1/2 lg:w-full"
            src={bouquetImage}
            alt="flower"
            width={1200}
            height={1200}
          />
          <div
            className={`${inter.className} lg:-mt-16 w-full flex-col gap-3 lg:w-2/6 lg:text-2xl text-gray-700 flex lg:justify-end`}
          >
            <h1 className="w-full text-md lg:text-right">
              THE PLEASURE OF YOUR REPLY IS REQUESTED BY THE
            </h1>
            <span
              className={`${msmadi.className} lg:text-right text-5xl lg:-bottom-12 lg:text-5xl`}
            >
              End &nbsp;of &nbsp;May
            </span>
          </div>
        </section>
      </main>
    </>
  );
}
