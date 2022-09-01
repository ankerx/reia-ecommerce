import { ChangeEvent } from "react";

interface IProps {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: string[] | undefined;
}
export const Select = ({ onChange, options }: IProps) => {
  return (
    <div className="lg:w-full bg-blue-gray-200">
      <label
        htmlFor="oils"
        className="block my-3 text-sm font-medium text-gray-900 dark:text-gray-400 "
      >
        Select category
      </label>
      <select
        onChange={onChange}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option>Choose category</option>
        {options?.map((value) => {
          return <option key={value}>{value}</option>;
        })}
      </select>
    </div>
  );
};
