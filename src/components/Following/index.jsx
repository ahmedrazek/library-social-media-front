import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Following = () => {
  const [curUser, setCurUser] = useState(null);
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);

  const getUser = async () => {
    const res = await axios.get(`/users/${id}`);
    setCurUser(res.data);
  };
  useEffect(() => {
    if (id) {
      getUser();
    } else {
      setCurUser(user);
    }
  }, []);
  return (
    <div>
      <div className=" w-6/12 mx-auto divide-y mt-10">
        {curUser?.following.map((follow) => (
          <div className="py-6" key={follow._id}>
            <div className="flex justify-between">
              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 rounded-full bg-black"></div>
                <h3>{follow.name}</h3>
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-full">
                Following
              </button>
            </div>
            <div className="ml-10">
              {follow.quote ? `<q>${follow.quote}</q>` : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
