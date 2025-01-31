import { BuildType, Config } from "./Config";
import { Entry, User } from "./Interfaces";

const API_PREFIX = Config.getBuildType() === BuildType.DEV ? "/api" : "";
console.log(`API_PREFIX: ${API_PREFIX}`);

export class Network {
  static getEntries(userUid: string, callback: (entries: Entry[]) => void) {
    console.log(`loading entries for user ${userUid}`);
    fetch(`${API_PREFIX}/users/${userUid}/entries`)
      .then((response) => response.json())
      // Handle exception
      .then((data) => {
        console.log(`loaded ${data["entries"].length} entries`);
        callback(data["entries"]);
      })
      .catch((error) => {
        console.log("Error: ", error);
        callback([]);
      });
  }

  static createEntry(entry: Entry, callback: (entry: Entry | null) => void) {
    console.log(`creating entry ${entry.uid} for user ${entry.userUid}`);
    fetch(`${API_PREFIX}/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`created entry`);
        callback(data.entry);
      })
      .catch((error) => {
        console.log("Error: ", error);
        callback(null);
      });
  }

  static patchEntry(entry: Entry, callback: () => void) {
    console.log(`patching entry ${entry.uid} for user ${entry.userUid}`);
    fetch(`${API_PREFIX}/entries/${entry.uid}`, {
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

  static deleteEntry(entryUid: string, callback: (boolean) => void) {
    console.log(`deleting entry ${entryUid}`);
    fetch(`${API_PREFIX}/entries/${entryUid}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`deleted entry`);
        callback(true);
      })
      .catch((error) => {
        console.log("Error: ", error);
        callback(false);
      });
  }

  static createProcess(userUid: string, callback?: (boolean) => void) {
    console.log(`creating process for user ${userUid}`);
    fetch(`${API_PREFIX}/users/${userUid}/processes`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`created process`);
        callback && callback(true);
      })
      .catch((error) => {
        console.log("Error: ", error);
        callback && callback(false);
      });
  }

  static getUser(userUid: string, callback: (user: User | null) => void) {
    console.log(`getting user ${userUid}`);
    fetch(`${API_PREFIX}/users/${userUid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`got user ${data.user.uid}`);
        callback(data.user);
      })
      .catch((error) => {
        console.log("Error: ", error);
        callback(null);
      });
  }

  static getUserTestStatus(
    userUid: string,
    callback: (success: boolean) => void
  ) {
    console.log(`getting user ${userUid} test status`);
    fetch(`${API_PREFIX}/users/${userUid}/test`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`got test status ${data.success}`);
        callback(data.success);
      })
      .catch((error) => {
        console.log("Error: ", error);
        callback(false);
      });
  }
}
