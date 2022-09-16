import { MassageInfo } from "./components/MassageInfo";
import { faceMassageDescription, fullMassageDescription } from "./descriptions";

export const Heading = () => {
  return (
    <div>
      <h3 className="font-OldStandard text-2xl lg:text-3xl">
        A whole body hands-on treatment that helps you relax
      </h3>
      <div className="mt-10 ">
        <MassageInfo title="Whole body massage" description={fullMassageDescription} />
        <MassageInfo
          title="Rejuvenating face massage"
          flexPosition={true}
          description={faceMassageDescription}
        />
      </div>
      <div className="text-gray-700 mt-14 mx-24">
        <h4 className="text-2xl mb-6">Benefits of mobile massage</h4>
        <ul>
          <li className="my-2">
            The massage takes place at your home, making you feel comfortable and more relaxed, and
            this helps you enjoy the benefits of massage
          </li>
          <li className="my-2">
            Additionally, you can jump into bed immediately after the massage and finish your
            regeneration while you sleep.
          </li>
          <li className="my-2">
            You do not have to waste time returning home, you do not arouse further tensions and
            stress in your massaged body that could arise during the return by car.
          </li>
        </ul>
      </div>
    </div>
  );
};
