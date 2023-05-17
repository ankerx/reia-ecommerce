import { Radio } from "@material-tailwind/react";

interface Props {
  handleFilterByPrice: (price: string[]) => void;
}
export const CheckboxContainer = ({ handleFilterByPrice }: Props) => {
  const options = [
    { label: "0-50", value: ["0", "50"] },
    { label: "51-100", value: ["51", "100"] },
    { label: "101-200", value: ["101", "200"] },
  ];
  return (
    <div className="flex flex-col mt-6">
      {options.map((item) => {
        return (
          <Radio
            name="type"
            key={item.label}
            color="brown"
            label={item.label}
            value={item.value}
            onChange={() => {
              handleFilterByPrice(item.value);
            }}
          />
        );
      })}
    </div>
  );
};
