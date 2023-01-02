import * as React from "react";

export function Button(props: {
  title: string;
  onClick: () => void;
  icon?: Icons;
  isDisabled?: boolean;
}) {
  // py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700
  return (
    <div>
      <a
        href="#"
        className={
          (props.isDisabled ? "hidden" : "") +
          " select-none inline-flex items-center text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900"
        }
        onClick={() => {
          !props.isDisabled && props.onClick();
        }}
      >
        {!!props.icon && icons[props.icon]}
        <span className="flex-1 px-2">{props.title}</span>
      </a>
      <div
        className={
          (props.isDisabled ? "" : "hidden") +
          " cursor-not-allowed select-none inline-flex items-center text-gray-900 block w-full bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-gray-700"
        }
      >
        {!!props.icon && icons[props.icon]}
        <span className="flex-1 px-2">{props.title}</span>
      </div>
    </div>
  );
}

export function WrapperButton(props: any) {
  const classNames = [
    "text-white",
    "bg-blue-700",
    "hover:bg-blue-800",
    "focus:ring-4",
    "focus:ring-blue-300",
    "font-medium",
    "rounded-lg",
    "text-sm",
    "px-5",
    "py-2.5",
    // "mr-2",
    // "mb-2",
    "dark:bg-blue-600",
    "dark:hover:bg-blue-700",
    "dark:focus:ring-blue-800",
  ];
  return (
    <div>
      <a
        href="#"
        className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900"
        onClick={props.onClick}
      >
        {/* Div children here */}
      </a>
    </div>
  );
}

export function RedButton(props: { title: string; onClick: () => void }) {
  const classNames = [
    "text-white",
    "bg-red-700",
    "hover:bg-red-800",
    "focus:ring-4",
    "focus:ring-red-300",
    "font-medium",
    "rounded-lg",
    "text-sm",
    "px-5",
    "py-2.5",
    // "mr-2",
    // "mb-2",
    "dark:bg-red-600",
    "dark:hover:bg-red-700",
    "dark:focus:ring-red-900",
  ];
  return (
    <button
      type="button"
      className={classNames.join(" ")}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}

export function LoadingButton(props: { title: string }) {
  return (
    <div className="block w-full py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
      <svg
        aria-hidden="true"
        role="status"
        className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="#1C64F2"
        />
      </svg>
      {props.title}
    </div>
  );
}

export enum Icons {
  Play = "PLAY",
  Plus = "PLUS",
}

const icons = {
  [Icons.Play]: (
    <svg
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
        clipRule="evenodd"
      />
    </svg>
  ),
  [Icons.Plus]: (
    <svg
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
};
