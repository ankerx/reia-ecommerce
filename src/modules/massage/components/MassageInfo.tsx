import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

import Image from "next/image";

import image from "../../../assets/hands.jpg";

interface IProps {
  title: string;
  description: string[];
  flexPosition?: boolean;
}
export const MassageInfo = ({ title, description, flexPosition }: IProps) => {
  return (
    <div className="w-full flex flex-col xl:flex-row items-center  my-5 text-gray-700 py-5 ">
      <div className="xl:w-3/5 ">
        <Image width={300} height={300} src={image} alt="profile-picture" className="rounded-lg" />
      </div>
      <div className={`w-full  ${flexPosition && "xl:order-first"}`}>
        <h4 className="text-2xl mb-6">{title}</h4>
        <ul>
          {description.map((item) => {
            return (
              <li className="my-2" key={item}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
