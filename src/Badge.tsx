import * as React from 'react';

export function Badge(props: { text: string; }) {
  return (
    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
      {props.text}
    </span>
  );
}
