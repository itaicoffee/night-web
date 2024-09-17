import * as React from "react";
import { LoadingButton, RedButton } from "./Button";
import { Entry } from "./Interfaces";

interface VenueDeck {
  name: string;
  venueNames: string[];
}

const venueDecks: VenueDeck[] = [
  {
    name: "West Village",
    venueNames: [
      "4 charles",
      "carbone",
      "port sa'id",
      "i sodi",
      "via carota",
      "l'artusi",
      "don angie",
      "libertine",
    ],
  },
  {
    name: "Group Dinner in Manhattan",
    venueNames: [
      // 4 charles, carbone, i sodi, via carota, l'artusi, don angie, manhatta financial district, The Noortwyck, Loring Place, goa new york,  dame, fairfax, koloman, foul witch, claud, le rock, joseph leonard, pastis, peter lugers, lure fishbar, Jeffrey's Grocery, Torrisi Bar & Restaurant, misi williamsburg, Txikito, c as in charlie, Kafana, keens, keens, laser wolf, al coro, Gem Wine
      "4 charles",
      "carbone",
      "i sodi",
      "via carota",
      "don angie",
      "Loring Place",
      "The Noortwyck",
      "fairfax",
      "koloman",
      "claud",
      "le rock",
      "manhatta financial district",
      "joseph leonard",
      "pastis",
      "lure fishbar",
      "Jeffrey's Grocery",
      "Torrisi Bar & Restaurant",
      "misi williamsburg",
      "Txikito",
      "c as in charlie",
      "keens",
    ]
  },
  {
    name: "Brunch",
    venueNames: [
      "sunday in brooklyn",
      "Baby Blues Luncheonette",
      "Clinton St. Baking Co",
      "Golden Diner chinatown",
      "Russ & Daughters Cafe",
      "k'far",
      "reunion cafe",
    ],
  },
  {
    name: "Korean",
    venueNames: [
      "c as in charlie",
    ],
  },
  {
    name: "Steak Night",
    venueNames: ["4 charles", "keens", "peter lugers"],
  },
  {
    name: "Fun",
    venueNames: ["laser wolf", "al coro", "Gem Wine"],
  },
];

const VenueDeckTable = (props: {
  venueDecks: { deck: VenueDeck; isAdded: boolean }[];
  onVenueDeckSelect: (index: number) => void;
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
              Venues
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {props.venueDecks.map(({ deck, isAdded }, index) => (
            <tr key={deck.name}>
              <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {deck.name}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-300 hidden sm:table-cell">
                <div className="max-w-xs truncate">
                  {deck.venueNames.join(", ")}
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => props.onVenueDeckSelect(index)}
                  className={`w-20 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isAdded
                      ? "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-800 dark:text-red-100 dark:hover:bg-red-700"
                      : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700"
                  }`}
                >
                  {isAdded ? "Remove" : "Add"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export function EntryEditModal(props: {
  entry: Entry;
  isUpdating: boolean;
  onCloseButtonClick: () => void;
  onSubmitButtonClick: (entry: Entry) => void;
  onDeleteButtonClick?: (entry: Entry) => void;
}) {
  const [mutatingEntry, setMutatingEntry] = React.useState<Entry>(props.entry);
  const [selectedTab, setSelectedTab] = React.useState<'details' | 'venues'>('details');
  const isCreating = props.onDeleteButtonClick === undefined;

  const selectVenueDeck = (deck: VenueDeck) => {
    const isDeckSelected = !deck.venueNames.find(
      (name) => !mutatingEntry.venueNames.includes(name)
    );
    var newVenueNames: string[];
    if (isDeckSelected) {
      newVenueNames = mutatingEntry.venueNames.filter(
        (name) => !deck.venueNames.includes(name)
      );
    } else {
      newVenueNames = mutatingEntry.venueNames.concat(deck.venueNames);
    }
    // 1. trim whitespace
    // 2. remove empty strings
    // 3. remove duplicates
    newVenueNames = newVenueNames
      .map((name) => name.trim())
      .filter((name) => name.length > 0)
      .filter((name, index, self) => self.indexOf(name) === index);
    const newMutatingEntry: Entry = {
      uid: mutatingEntry.uid,
      userUid: mutatingEntry.userUid,
      day: mutatingEntry.day,
      fromTime: mutatingEntry.fromTime,
      toTime: mutatingEntry.toTime,
      numSeats: mutatingEntry.numSeats,
      venueNames: newVenueNames,
    };
    setMutatingEntry(newMutatingEntry);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-4xl mx-auto rounded-lg shadow-lg">
        {/* Modal header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {isCreating ? "Create New Entry" : "Edit Entry"}
          </h2>
          <button
            onClick={props.onCloseButtonClick}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab navigation */}
        <div className="border-b dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              onClick={() => setSelectedTab('details')}
              className={`${
                selectedTab === 'details'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-3 px-4 sm:py-4 sm:px-6 border-b-2 font-medium text-sm flex-1 text-center`}
            >
              Details
            </button>
            <button
              onClick={() => setSelectedTab('venues')}
              className={`${
                selectedTab === 'venues'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-3 px-4 sm:py-4 sm:px-6 border-b-2 font-medium text-sm flex-1 text-center`}
            >
              Venues
            </button>
          </nav>
        </div>

        {/* Modal body */}
        <div className="p-4 sm:p-6 max-h-[calc(100vh-250px)] overflow-y-auto">
          {selectedTab === 'details' && (
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {/* Day input */}
              <div>
                <label htmlFor="day" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Day
                </label>
                <input
                  type="date"
                  name="day"
                  id="day"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm px-3 py-2"
                  value={mutatingEntry.day}
                  onChange={(e) => setMutatingEntry({ ...mutatingEntry, day: e.target.value })}
                />
              </div>

              {/* From Time and To Time inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="from-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    From Time
                  </label>
                  <input
                    type="time"
                    name="from-time"
                    id="from-time"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm px-3 py-2"
                    value={mutatingEntry.fromTime}
                    onChange={(e) => setMutatingEntry({ ...mutatingEntry, fromTime: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="to-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    To Time
                  </label>
                  <input
                    type="time"
                    name="to-time"
                    id="to-time"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm px-3 py-2"
                    value={mutatingEntry.toTime}
                    onChange={(e) => setMutatingEntry({ ...mutatingEntry, toTime: e.target.value })}
                  />
                </div>
              </div>

              {/* Number of seats input */}
              <div>
                <label htmlFor="number-of-seats" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of seats
                </label>
                <input
                  type="number"
                  name="number-of-seats"
                  id="number-of-seats"
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm px-3 py-2"
                  value={mutatingEntry.numSeats}
                  onChange={(e) => setMutatingEntry({ ...mutatingEntry, numSeats: parseInt(e.target.value) })}
                />
              </div>
            </div>
          )}

          {selectedTab === 'venues' && (
            <div>
              <div className="mb-4">
                <label htmlFor="venue-names" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Venue names
                </label>
                <textarea
                  id="venue-names"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm px-3 py-2"
                  placeholder="Venue 1, Venue 2, ..."
                  value={mutatingEntry.venueNames.join(", ")}
                  onChange={(e) => setMutatingEntry({ ...mutatingEntry, venueNames: e.target.value.split(", ") })}
                />
              </div>
              <VenueDeckTable
                venueDecks={venueDecks.map((deck) => ({
                  deck,
                  isAdded: !deck.venueNames.find((name) => !mutatingEntry.venueNames.includes(name)),
                }))}
                onVenueDeckSelect={(index) => selectVenueDeck(venueDecks[index])}
              />
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="flex flex-col sm:flex-row justify-end items-stretch p-4 sm:p-6 border-t dark:border-gray-700 space-y-3 sm:space-y-0 sm:space-x-3">
          {props.isUpdating ? (
            <LoadingButton title="Updating" className="w-full sm:w-auto" />
          ) : (
            <button
              type="button"
              onClick={() => props.onSubmitButtonClick(mutatingEntry)}
              className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={props.isUpdating}
            >
              Save
            </button>
          )}
          {!props.isUpdating && props.onDeleteButtonClick && (
            <RedButton
              title="Delete"
              onClick={() => props.onDeleteButtonClick(mutatingEntry)}
              className="w-full sm:w-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
}
