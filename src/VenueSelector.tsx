import * as React from "react";
import { SvgSearch } from "./Assets";
import { Button } from "./Button";

export const VenueSelector = (props: {}) => {
  const [searchText, setSearchText] = React.useState<string>("");
  return (
    <div className="bg-neutral-100 rounded-md">
      <div className="px-6 pt-4">Which restaurants?</div>
      <div className="px-6 py-4">
        <SearchBar
          onChange={(value: string) => {
            setSearchText(value);
          }}
        />
        {searchText && <SearchResults venueNames={[searchText, searchText]} />}
      </div>
    </div>
  );
};

const SearchBar = (props: { onChange: (value: string) => void }) => {
  const inputClassNames = [
    "flex-1",
    "bg-neutral-200",
    "p-2.5",
    "ring-0",
    "focus:ring-0",
    "shadow-none",
    "focus:shadow-none",
    "focus:outline-none",
    "border-none",
    "focus:border-none",
  ];
  return (
    <div className="flex bg-neutral-200 rounded-lg pr-2">
      <div className="flex flex-col justify-center">
        <div className="px-2 flex">
          <div className="flex-1">
            <SvgSearch />
          </div>
        </div>
      </div>
      <input
        type="text"
        id="restaurantName"
        className={inputClassNames.join(" ")}
        placeholder="Add a restaurant"
        required={false}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
    </div>
  );
};

const SearchResultItem = (props: { venueName: string }) => {
  return (
    <div id={props.venueName} className="flex">
      <div className="flex-1 inline-block flex items-center">
        <span>{props.venueName}</span>
      </div>
      <div className="flex-none">
        <Button title="Add" onClick={() => {}} />
      </div>
    </div>
  );
};

const SearchResults = (props: { venueNames: string[] }) => {
  return (
    <div className="py-2">
      {props.venueNames.map((venueName) => (
        <div className="py-2">
          <SearchResultItem venueName={venueName} />
        </div>
      ))}
    </div>
  );
};
