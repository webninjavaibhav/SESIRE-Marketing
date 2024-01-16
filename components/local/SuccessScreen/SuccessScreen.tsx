"use client";
import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { onValue, ref } from "firebase/database";

import { userDB } from "../../../firebase";
import { SUBSCRIBERS_LIST_HEADING, SUBSCRIBE_SUCCESS_MSG } from "@/constants";

export const SuccessScreen = () => {
  const [subscribersList, setSubscribersList] = useState<string[]>([]);
  useEffect(() => {
    const userListRef = ref(userDB, "users/");
    onValue(userListRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        console.log(data);
        setSubscribersList((prev) => [...prev, data.name]);
      });
    });
  }, []);
  return (
    <div className="flex justify-center mt-10 p-5">
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <BsCheckCircleFill size={20} color={"#0ced57"} />
          <h1 className="text-xl text-[#0ced57]">{SUBSCRIBE_SUCCESS_MSG}</h1>
        </div>
        <h1 className="text-xl">{SUBSCRIBERS_LIST_HEADING}</h1>
        {!subscribersList.length ? (
          "Getting subscribers list..."
        ) : (
          <ol>
            {subscribersList.map((user, idx) => (
              <li key={`${user}_${idx}`}>{user}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};
