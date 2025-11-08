// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { Dispatch, useEffect } from 'react';

// 📦 Internal imports
import { flexBetween } from '~styles/tw-custom';

// 🧾 Local types
interface PropsT {
  changeNextDisable: Dispatch<React.SetStateAction<boolean>>;
}

// ⚙️ Functional component
const Review: React.FC<PropsT> = ({ changeNextDisable }) => {
  useEffect(() => {
    changeNextDisable(true);

    setTimeout(() => {
      changeNextDisable(false);
    }, 4000);
  }, []);

  return (
    <div className="bg-background mt-5 rounded-sm p-5">
      <h5 className="text-lg font-semibold">Submitted Information</h5>

      <div className="pt-5 font-medium *:mt-5 *:flex *:items-center *:justify-baseline *:rounded-sm *:p-5 *:odd:bg-neutral-950 *:even:bg-neutral-800">
        <div className={`${flexBetween} px-2.5`}>
          <p>First Name</p>
          <p>John</p>
        </div>

        <div className={`${flexBetween} px-2.5`}>
          <p>Last Name</p>
          <p>Doe</p>
        </div>

        <div className={`${flexBetween} px-2.5`}>
          <p>Email</p>
          <p>John_Doe@gmail.com</p>
        </div>

        <div className={`${flexBetween} px-2.5`}>
          <p>Date of birth</p>
          <p>November 08, 1996</p>
        </div>

        <div className={`${flexBetween} px-2.5`}>
          <p>Nationality</p>
          <p>Iran</p>
        </div>
      </div>
    </div>
  );
};
export default Review;
