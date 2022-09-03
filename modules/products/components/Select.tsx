import { Product } from "@chec/commerce.js/types/product";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

interface IProps {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: string[] | undefined;
}
export const Select = ({ onChange, options }: IProps) => {
  return (
    <div className="lg:w-full ">
      <label
        htmlFor="oils"
        className="block my-3 text-sm font-medium text-gray-900 dark:text-gray-400 "
      >
        Select category
      </label>
      <select
        onChange={onChange}
        className="bg-gray-50 border border-brown-300 text-gray-900 text-sm rounded-lg focus:ring-brown-500 focus:border-brown-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-brown-500 dark:focus:border-brown-500"
      >
        <option>all</option>
        {options?.map((value) => {
          return (
            <option value={value} key={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};
