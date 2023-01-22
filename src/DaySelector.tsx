import * as React from "react";
import { Button } from "./Button";

export function DaySelector(props: {
  defaultDate: string;
  onDateChange: (date: string) => void;
}) {
  const [date, setDate] = React.useState<string>(props.defaultDate);
  return (
    <div className="bg-neutral-100 rounded-md">
      <div className="flex px-6 py-4">
        <div className="flex-1 inline-block flex items-center">
          <span>When?</span>
        </div>
        <div className="flex-none">
          <input
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
            onChange={
              (e) => {
                props.onDateChange(e.target.value);
                setDate(e.target.value);
              }
            }
            defaultValue={date}
          />
        </div>
      </div>
    </div>
  );
}

export function NumSeatsSelector(props: {
  defaultNumSeats: number;
  onNumSeatsChange: (numSeats: number) => void;
}) {
  const [numSeats, setNumSeats] = React.useState<number>(
    props.defaultNumSeats
  );
  return (
    <div className="bg-neutral-100 rounded-md flex">
      <div className="flex-1 inline-block flex items-center">
        <span>How many people?</span>
      </div>
        <div className="flex-none">
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
            onChange={
              (e) => {
                props.onNumSeatsChange(
                  parseInt(e.target.value)
                );
                setNumSeats(parseInt(e.target.value));
              }
            }
            defaultValue={numSeats}
          />
        </div>
      </div>
    
  );
}
