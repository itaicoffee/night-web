import * as React from 'react';
import { LoadingButton, RedButton } from './Button';
import { Entry } from "./Entry";

interface VenueDeck {
  name: string;
  venueNames: string[];
}

const venueDecks: VenueDeck[] = [
  { name: "Miami", venueNames: ["Stanzione 87", "NIU Wine", "Macchialina Taverna Rustica", "The River Oyster Bar", "Jaguar SunStanzione 87", "NIU Wine", "Macchialina Taverna Rustica", "Jaguar Sun", "The River Oyster Bar", "Jaguar Sun", "KYU Miami", "Krüs Kitchen", "QP Tapas", "Klaw", "Doya", "Tropezón", "Cafe Latrova"] },
  { name: "West Village", venueNames: ["Carbone", "L'artusi"] },
];

const VenueDeckTable = (props: {
  venueDecks: { deck: VenueDeck, isAdded: boolean }[],
  onVenueDeckSelect: (index: number) => (void),
}) => {
  const classNames = [
    "mx-auto",
    "max-w-7xl",
    "lg:flex",
    "lg:items-center",
    "lg:justify-between",
    "w-full",
    "border",
  ]
  return (
    <div className={classNames.join(" ")}>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Name
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
          {props.venueDecks && props.venueDecks.map(({ deck, isAdded }, index) => (
            <tr key={deck.name} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6 flex justify-start">
                {deck.name}
              </td>
              <td className="py-4 px-6">
                {deck.venueNames.join(", ")}
              </td>
              <td className="py-4 px-6">
                <a
                  href="#"
                  className={"font-medium hover:underline" + (isAdded ? " text-red-600 dark:text-red-500" : " text-blue-600 dark:text-blue-500")}
                  onClick={() => props.onVenueDeckSelect(index)}
                >
                  {isAdded ? "Remove" : "Add"}
                </a>
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
  const selectedVenueDecks = venueDecks.filter((deck) => {
    return !deck.venueNames.find((name) => !mutatingEntry.venueNames.includes(name));
  });
  const isCreating = props.onDeleteButtonClick === undefined;
  const selectVenueDeck = (deck: VenueDeck) => {
    const isDeckSelected = selectedVenueDecks
      .map((deck) => deck.name)
      .includes(deck.name);
    var newVenueNames: string[];
    if (isDeckSelected) {
      newVenueNames = mutatingEntry.venueNames
        .filter((name) => !deck.venueNames.includes(name));
    } else {
      newVenueNames = mutatingEntry.venueNames
        .concat(deck.venueNames);
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
      venueNames: newVenueNames
    }
    setMutatingEntry(newMutatingEntry);
  };
  return (
    <div id="editUserModal" tabIndex={-1} aria-hidden="true"
      className="absolute inset-0 h-screen flex">
      <div className="m-auto relative w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <form action="#" className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {isCreating ? "Create" : "Edit"}
            </h3>
            <button onClick={props.onCloseButtonClick} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="editUserModal">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              {/* "Day", placeholder: "2022-08-20" */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="day" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Day</label>
                <input
                  type="date" name="day" id="day" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={props.entry.day} required
                  value={mutatingEntry.day}
                  onChange={(e) => setMutatingEntry({ ...mutatingEntry, day: e.target.value })} />
              </div>
              {/* "From Time", placeholder: "12:00" */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="from-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From Time</label>
                <input
                  type="time" name="from-time" id="from-time" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                  value={mutatingEntry.fromTime}
                  onChange={(e) => setMutatingEntry({ ...mutatingEntry, fromTime: e.target.value })} />
              </div>
              {/* "To Time", placeholder: "13:00" */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="to-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To Time</label>
                <input
                  type="time" name="to-time" id="to-time" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                  value={mutatingEntry.toTime}
                  onChange={(e) => setMutatingEntry({ ...mutatingEntry, toTime: e.target.value })} />
              </div>
              {/* "Number of seats", placeholder: 2, mininum value: 1 */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="number-of-seats" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of seats</label>
                <input
                  type="number" name="number-of-seats" id="number-of-seats" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2" required
                  value={mutatingEntry.numSeats}
                  onChange={(e) => setMutatingEntry({ ...mutatingEntry, numSeats: parseInt(e.target.value) })} />
              </div>
              {/* "Venue names", placeholder: "Room 1, Room 2" */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="venue-names" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Venue names</label>
                <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Venue 1, Venue 2, ..."
                  value={mutatingEntry.venueNames.join(", ")}
                  onChange={(e) => setMutatingEntry({ ...mutatingEntry, venueNames: e.target.value.split(", ") })} />
              </div>
            </div>
          </div>
          <VenueDeckTable
            venueDecks={venueDecks.map((deck) => {
              return {
                deck,
                isAdded: selectedVenueDecks
                  .map((deck) => deck.name)
                  .includes(deck.name),
              };
            })}
            onVenueDeckSelect={(index) => {
              selectVenueDeck(venueDecks[index]);
            }}
          />
          {/* Modal footer */}
          <div className="flex justify-between p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            {props.isUpdating ? <LoadingButton title="Updating" /> : (
              <button
                type="button"
                onClick={(e) => {
                  props.onSubmitButtonClick(mutatingEntry);
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={props.isUpdating}
              >
                Save
              </button>)}
            {!props.isUpdating && props.onDeleteButtonClick && <RedButton title="Delete" onClick={() => {
              props.onDeleteButtonClick && props.onDeleteButtonClick(mutatingEntry)
            }} />}
          </div>
        </form>
      </div>
    </div>
  );
}
