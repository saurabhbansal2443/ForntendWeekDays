import React, { useState } from "react";
import { useUpdateMutation } from "./Utility/authApi";

const PhoneNumberUpdate = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [updateNumber] = useUpdateMutation();

  const addPhoneNumber = async () => {
    const obj = {
      phoneNumber: phoneNumber
    };

    try {
      const res = await updateNumber(obj);
      console.log("Update Response:", res);
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Update Phone Number
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl flex justify-center items-center">
          <input
            type="text"
            placeholder="phoneNumber"
            className="input input-bordered input-info w-full max-w-xs text-white"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <button className="btn btn-outline btn-primary" onClick={addPhoneNumber}>Add</button>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PhoneNumberUpdate;
