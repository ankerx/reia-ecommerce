import { useFilter } from "../hooks/useFilter";

interface IProps {
  categories: string[] | undefined;
}
const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const FilterCategory = ({ categories, handleSearchByCategory }: IProps) => {
  return (
    <>
      <p className="text-xl mb-3">Categories</p>
      <ul className="text-md">
        <li className="mb-1">
          <button onClick={() => handleSearchByCategory("all")}>All</button>
        </li>
        {categories?.map((item) => {
          return (
            <li className="mb-1" key={item}>
              <button onClick={() => handleSearchByCategory(item)}>
                {capitalizeFirstLetter(item)}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
