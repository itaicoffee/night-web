import { Entry } from "./Entry";

export class Network {
  static getEntries(userUid: string, callback: (entries: Entry[]) => void) {
    console.log(`loading entries for user ${userUid}`);
    fetch(`/api/users/${userUid}/entries`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`loaded ${data["entries"].length} entries`);
        callback(data["entries"]);
      });
  }

  static createEntry(entry: Entry, callback: () => void) {
    console.log(`creating entry ${entry.uid} for user ${entry.userUid}`);
    fetch(`/api/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`created entry`);
        callback();
      });
  }

  static patchEntry(entry: Entry, callback: () => void) {
    console.log(`patching entry ${entry.uid} for user ${entry.userUid}`);
    fetch(`/api/entries/${entry.uid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`patched entry`);
        callback();
      });
  }

  static deleteEntry(entryUid: string, callback: () => void) {
    console.log(`deleting entry ${entryUid}`);
    fetch(`/api/entries/${entryUid}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`deleted entry`);
        callback();
      });
  }
}