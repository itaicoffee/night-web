import * as React from 'react';
import { Button } from './Button';
import { Entry } from './Entry';
import { EntryEditModal } from './EntryEditModal';
import { EntryTable } from './EntryTable';
import { InputAndButtonCard } from './InputAndButtonCard';
import { createEntry, deleteEntry, getEntries, patchEntry } from './Network';
import { createUuid, readUrlQueryParameter, today, updateUrlQueryParameter } from './Utils';

interface CounterState {
  entries: Entry[] | null;
  entryInEdit: Entry | null;
  isEntryUpdating: boolean;
  userUid: string | null;
  entryInCreation: Entry | null;
}

export default class Main extends React.Component<any, CounterState> {
  constructor(props: any) {
    super(props);
    // Read the user UID from the URL query parameter "user-uid"
    const userUid = readUrlQueryParameter("user-uid");
    this.state = {
      entries: null,
      entryInEdit: null,
      isEntryUpdating: false,
      userUid: userUid,
      entryInCreation: null,
    };
  }

  loadEntries = (callback?: () => void) => {
    if (!this.state.userUid) {
      return;
    }
    getEntries(this.state.userUid, (entries) => {
      this.setState({ entries: entries }, callback);
    });
  };

  createEntry_ = (entry: Entry) => {
    this.setState({ isEntryUpdating: true }, () => {
      createEntry(entry, () => {
        this.loadEntries(() => {
          this.setState({ isEntryUpdating: false, entryInCreation: null });
        });
      });
    });
  };

  patchEntry_ = (entry: Entry) => {
    this.setState({ isEntryUpdating: true });
    patchEntry(entry, () => {
      this.loadEntries(() => {
        this.closeModal();
      });
    });
  };

  deleteEntry_ = (entryUid: string) => {
    this.setState({ isEntryUpdating: true });
    deleteEntry(entryUid, () => {
      this.loadEntries(() => {
        this.closeModal();
      });
    });
  };

  closeModal = () => {
    this.setState({
      entryInEdit: null,
      entryInCreation: null,
      isEntryUpdating: false,
    });
  };

  onModalCloseButtonClick = () => {
    this.closeModal();
  };

  setUserUid = (userUid: string) => {
    console.log(`setting user uid to ${userUid}`);
    this.setState({ userUid: userUid }, this.attemptLogin);
    updateUrlQueryParameter("user-uid", userUid);
  };

  attemptLogin = () => {
    if (!this.state.userUid) {
      return;
    }
    this.loadEntries();
  }

  componentDidMount() {
    this.loadEntries();
  }

  render() {
    return (
      <div className="bg-gray-50 h-full px-8 py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <InputAndButtonCard
              title="User UID"
              placeholder={this.state.userUid || "Enter your user UID"}
              onSubmit={(value) => {
                this.setUserUid(value);
              }} />
            <div className="py-8">
              <Button title="New" onClick={() => {
                this.setState({
                  entryInCreation: {
                    uid: createUuid(),
                    userUid: this.state.userUid || "",
                    day: today(),
                    fromTime: "19:00",
                    toTime: "20:00",
                    numSeats: 2,
                    venueNames: [],
                  }
                });
              }} />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-4">
          {this.state.entries && <EntryTable entries={this.state.entries} onEditButtonClick={(entry: Entry) => {
            this.setState({ entryInEdit: entry });
          }} />}
        </div>
        {this.state.entryInEdit && <EntryEditModal
          entry={this.state.entryInEdit}
          isUpdating={this.state.isEntryUpdating}
          onCloseButtonClick={this.onModalCloseButtonClick}
          onSubmitButtonClick={(entry: Entry) => { this.patchEntry_(entry) }}
          onDeleteButtonClick={(entry: Entry) => { this.deleteEntry_(entry.uid) }}
        />
        }
        {this.state.entryInCreation && <EntryEditModal
          entry={this.state.entryInCreation}
          isUpdating={this.state.isEntryUpdating}
          onCloseButtonClick={this.onModalCloseButtonClick}
          onSubmitButtonClick={(entry: Entry) => { this.createEntry_(entry) }}
        />}
      </div>
    );
  }
}