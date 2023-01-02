import * as React from 'react';

export function Badge(props: { text: string; }) {
  return (
    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
      {props.text}
    </span>
  );
}

// Enum for badge colors
export enum BadgeColor {
  Default = "bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800",
  Dark = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  Red = "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900",
  Green = "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900",
  Yellow = "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900",
  Indigo = "bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900",
  Purple = "bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900",
  Pink = "bg-pink-100 text-pink-800 dark:bg-pink-200 dark:text-pink-900",
}

export function ColorBadge(props: { text: string, color: BadgeColor }) {
  return (
    <span className={`${props.color} text-xs font-semibold mr-2 px-2 py-0.5 rounded`}>
      {props.text}
    </span>
  );
}