import { useState, useEffect, useRef, ChangeEvent } from "react";

interface IProps {
  min: number;
  max: number;
  onChange: ({ min, max }: { min: number; max: number }) => void;
}
export const RangeSlider = ({ min, max, onChange }: IProps) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);
  return (
    <div className=" grid place-items-center bg-red-300">
      <div className="flex flex-col">
        <div>min {minVal}zł</div>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className=" mb-3"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
        />
        <div>max {maxVal}zł</div>
      </div>
      <div ref={range}></div>
    </div>
  );
};
