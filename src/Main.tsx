import * as React from 'react';
import { Button } from './Button';
import { Entry } from './Entry';
import { EntryEditModal } from './EntryEditModal';
import { EntryTable } from './EntryTable';
import { InputAndButtonCard } from './InputAndButtonCard';
import { Network } from './Network';
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
    Network.getEntries(this.state.userUid, (entries) => {
      this.setState({ entries: entries }, callback);
    });
  };

  createEntry = (entry: Entry) => {
    this.setState({ isEntryUpdating: true }, () => {
      Network.createEntry(entry, (_) => {
        this.loadEntries(() => {
          this.setState({ isEntryUpdating: false, entryInCreation: null });
        });
      });
    });
  };

  patchEntry = (entry: Entry) => {
    this.setState({ isEntryUpdating: true });
    Network.patchEntry(entry, () => {
      this.loadEntries(() => {
        this.closeModal();
      });
    });
  };

  deleteEntry = (entryUid: string) => {
    this.setState({ isEntryUpdating: true });
    Network.deleteEntry(entryUid, (_) => {
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
      <div className="bg-gray-50 h-full">
        <div className="mx-auto w-full max-w-7xl sm:px-8 lg:px-8">
          <div className="column-1">
            <InputAndButtonCard
              title="User UID"
              placeholder={this.state.userUid || "Enter your user UID"}
              onSubmit={(value) => {
                this.setUserUid(value);
              }} />
            <div className="column-1 lg:flex lg:justify-start">
              <div className="py-2 px-2">
                <Button title="Run" onClick={() => {
                  this.state.userUid && Network.createProcess(this.state.userUid);
                }} />
              </div>
              <div className="py-2 px-2">
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
        </div>
        <div className="sm:px-8 lg:px-8">
          {this.state.entries && <EntryTable entries={this.state.entries} onEditButtonClick={(entry: Entry) => {
            this.setState({ entryInEdit: entry });
          }} />}
        </div>
        {this.state.entryInEdit && <EntryEditModal
          entry={this.state.entryInEdit}
          isUpdating={this.state.isEntryUpdating}
          onCloseButtonClick={this.onModalCloseButtonClick}
          onSubmitButtonClick={(entry: Entry) => { this.patchEntry(entry) }}
          onDeleteButtonClick={(entry: Entry) => { this.deleteEntry(entry.uid) }}
        />
        }
        {this.state.entryInCreation && <EntryEditModal
          entry={this.state.entryInCreation}
          isUpdating={this.state.isEntryUpdating}
          onCloseButtonClick={this.onModalCloseButtonClick}
          onSubmitButtonClick={(entry: Entry) => { this.createEntry(entry) }}
        />}
      </div>
    );
  }
}