import { Entry } from "./Entry";

const API_PREFIX = "/api";

export class Network {
  static getEntries(userUid: string, callback: (entries: Entry[]) => void) {
    console.log(`loading entries for user ${userUid}`);
    fetch(`{API_PREFIX}/users/${userUid}/entries`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`loaded ${data["entries"].length} entries`);
        callback(data["entries"]);
      });
  }

  static createEntry(entry: Entry, callback: () => void) {
    console.log(`creating entry ${entry.uid} for user ${entry.userUid}`);
    fetch(`{API_PREFIX}/entries`, {
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
    fetch(`{API_PREFIX}/entries/${entry.uid}`, {
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
    fetch(`{API_PREFIX}/entries/${entryUid}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`deleted entry`);
        callback();
      });
  }
}