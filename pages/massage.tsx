import { NextPage } from "next";

import { Banner } from "@/modules/UI/Banner";
import Main from "@/modules/massage/Main";

import img from "../src/assets/massage.jpg";

const Massage: NextPage = () => {
  return (
    <section className="bg-main min-h-[100vh] text-center ">
      <Banner text="Massage" img={img} />
      <Main />
    </section>
  );
};

export default Massage;
