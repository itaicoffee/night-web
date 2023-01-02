import * as React from "react";

export function InputField(props: {
  title: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  const [value, setValue] = React.useState(props.placeholder);
  const inputClassNames = [
    "bg-gray-50",
    "border",
    "border-gray-300",
    "text-gray-900",
    "text-sm",
    "rounded-lg",
    "focus:ring-blue-500",
    "focus:border-blue-500",
    "block",
    "w-full",
    "p-2.5",
    "dark:bg-gray-700",
    "dark:border-gray-600",
    "dark:placeholder-gray-400",
    "dark:text-white",
    "dark:focus:ring-blue-500",
    "dark:focus:border-blue-500",
    "min-w-min",
  ];
  return (
    <div className="">
      <label
        htmlFor="default-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.title}
      </label>
      <input
        type="text"
        id="default-input"
        className={inputClassNames.join(" ")}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          props.onChange(e.target.value);
        }}
      />
    </div>
  );
}
