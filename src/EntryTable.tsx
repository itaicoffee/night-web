import * as React from 'react';
import { Badge } from './Badge';
import { Entry } from "./Entry";
import { dayOfWeek, summarizeList } from './Utils';

export function EntryTable(props: {
  entries: Entry[];
  onEditButtonClick: (entry: Entry) => void;
}) {
  const classNames = [
    "mx-auto",
    "max-w-7xl",
    // "px-4",
    "lg:flex",
    "lg:items-center",
    "lg:justify-between",
    "w-full",
    // "p-4",
    // "text-center",
    // "bg-white",
    "border",
    // "rounded-lg",
    // "shadow-md",
    // "sm:p-8",
    // "dark:bg-gray-800",
    // "dark:border-gray-700",
  ]
  return (
    <div className={classNames.join(" ")}>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Day
            </th>
            <th scope="col" className="py-3 px-6">
              Time
            </th>
            <th scope="col" className="py-3 px-6">
              Seats
            </th>
            <th scope="col" className="py-3 px-6">
              Venues
            </th>
            <th scope="col" className="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {props.entries.map((entry, index) => (
            <tr key={entry.uid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6 flex justify-start">
                {entry.day}
                <div className="px-2">
                <Badge text={dayOfWeek(entry.day)} />
                </div>
              </td>
              <td className="py-4 px-6">
                {entry.fromTime} - {entry.toTime}
              </td>
              <td className="py-4 px-6">
                {entry.numSeats}
              </td>
              <td className="py-4 px-6">
                {/* Join the venueNames array into a string separated by commas */}
                {summarizeList(entry.venueNames, 4)}
              </td>
              <td className="py-4 px-6">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => props.onEditButtonClick(entry)}
                >Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
