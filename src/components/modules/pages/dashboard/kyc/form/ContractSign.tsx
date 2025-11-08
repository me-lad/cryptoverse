// 📌 Directives
'use client';

// 📦 Third-Party imports
import React, { ChangeEvent, Dispatch, useEffect } from 'react';
import { Checkbox } from '~core/ui/shadcn/checkbox';

// 🧾 Local types
interface PropsT {
  changeNextDisable: Dispatch<React.SetStateAction<boolean>>;
}

// ⚙️ Functional component
const ContractSign: React.FC<PropsT> = ({ changeNextDisable }) => {
  useEffect(() => {
    changeNextDisable(true);
  }, []);

  const changeHandler = (target: HTMLButtonElement) => {
    const newValue = target.ariaChecked === 'true' ? true : false;
    changeNextDisable(newValue);
  };

  return (
    <>
      <div className="mt-5 pl-5">
        <ul className="list-decimal *:mt-5 *:opacity-80">
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            adipisci minima non explicabo, ratione vero vel magnam? Neque, harum
            maiores aliquid, sapiente ipsum libero incidunt autem, praesentium
            pariatur optio totam.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            adipisci minima non explicabo, ratione vero vel magnam? Neque, harum
            maiores aliquid, sapiente ipsum libero incidunt autem, praesentium
            pariatur optio totam.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            adipisci minima non explicabo, ratione vero vel magnam? Neque, harum
            maiores aliquid, sapiente ipsum libero incidunt autem, praesentium
            pariatur optio totam.
          </li>
        </ul>
      </div>

      <label className="mt-5 flex items-center gap-2.5 select-none">
        <Checkbox
          onClick={(e) => changeHandler(e.currentTarget)}
          className="!text-white"
        />
        I have read and agree to the terms and conditions
      </label>
    </>
  );
};
export default ContractSign;
