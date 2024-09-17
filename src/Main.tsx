import * as React from "react";
import { Button, Icons, LoadingButton } from "./Button";
import { Entry, User } from "./Interfaces";
import { EntryEditModal } from "./EntryEditModal";
import { EntryTable } from "./EntryTable";
import { InputAndButtonCard } from "./InputAndButtonCard";
import { Network } from "./Network";
import {
  createUuid,
  nDaysAfterToday,
  readUrlQueryParameter,
  today,
  updateUrlQueryParameter,
  YesNoUnknown,
} from "./Utils";
import { BadgeColor, ColorBadge } from "./Badge";
import { VenueSelector } from "./VenueSelector";
import { DaySelector, NumSeatsSelector } from "./DaySelector";

interface CounterState {
  entries: Entry[] | null;
  entryInEdit: Entry | null;
  isEntryUpdating: boolean;
  userUid: string | null;
  user: User | null;
  entryInCreation: Entry | null;
  isRunning: boolean;
  isUserTestSuccessful: YesNoUnknown;
  showOnlyFutureEntries: boolean;
}

// TODO: unused
function LoadingButtonMain(props: {
  title: string;
  onClick: (then: () => void) => void;
}) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  return isLoading ? (
    <LoadingButton title="Loading…" />
  ) : (
    <Button
      title={props.title}
      onClick={() => {
        if (isLoading) {
          return;
        }
        setIsLoading(true);
        props.onClick(() => {
          setIsLoading(false);
        });
      }}
    />
  );
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
      user: null,
      entryInCreation: null,
      isRunning: false,
      isUserTestSuccessful: YesNoUnknown.Unknown,
      showOnlyFutureEntries: true,
    };
  }

  loadUser = (callback?: () => void) => {
    if (!this.state.userUid) {
      return;
    }
    Network.getUser(this.state.userUid, (user) => {
      if (!user) {
        return;
      }
      this.setState({ user }, callback);
    });
  };

  loadEntries = (callback?: () => void) => {
    if (!this.state.userUid) {
      return;
    }
    Network.getEntries(this.state.userUid, (entries) => {
      this.setState({ entries: entries }, callback);
    });
  };

  testUser = () => {
    if (!this.state.userUid) {
      return;
    }
    Network.getUserTestStatus(this.state.userUid, (isUserTestSuccessful) => {
      // isUserTestSuccessful is a bool
      // convert it to YesNoUnknown enum
      const yesNoUnknown = isUserTestSuccessful
        ? YesNoUnknown.Yes
        : YesNoUnknown.No;
      console.log(`isUserTestSuccessful: ${yesNoUnknown}`);
      this.setState({ isUserTestSuccessful: yesNoUnknown });
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
    this.loadUser();
    this.loadEntries();
  };

  componentDidMount() {
    this.loadUser();
    this.loadEntries();
    this.testUser();
  }

  onClickAdd = () => {
    this.setState({
      entryInCreation: {
        uid: createUuid(),
        userUid: this.state.userUid || "",
        day: today(),
        fromTime: "19:00",
        toTime: "20:00",
        numSeats: 2,
        venueNames: [],
      },
    });
  };

  onClickRun = () => {
    this.setState({ isRunning: true }, () => {
      this.state.userUid &&
        Network.createProcess(this.state.userUid, () => {
          this.setState({ isRunning: false });
        });
    });
  };

  toggleFutureEntries = () => {
    // Log the toggle action for future entries
    console.log(`Toggling future entries. Current state: ${!this.state.showOnlyFutureEntries}`);
    this.setState(prevState => ({
      showOnlyFutureEntries: !prevState.showOnlyFutureEntries
    }));
  };

  render() {
    const filteredEntries = this.state.entries?.filter(entry => {
      if (!this.state.showOnlyFutureEntries) return true;
      const entryDate = new Date(entry.day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return entryDate >= today;
    }) || null;

    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Reservation Manager
              </h3>
              {this.state.user ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  <ColorBadge
                    text={"Logged in as " + this.state.user.username}
                    color={BadgeColor.Green}
                  />
                  {
                    {
                      [YesNoUnknown.Yes]: (
                        <ColorBadge
                          text={"Resy token validated"}
                          color={BadgeColor.Green}
                        />
                      ),
                      [YesNoUnknown.No]: (
                        <ColorBadge
                          text={"Token failed"}
                          color={BadgeColor.Red}
                        />
                      ),
                      [YesNoUnknown.Unknown]: null,
                    }[this.state.isUserTestSuccessful]
                  }
                </div>
              ) : (
                <InputAndButtonCard
                  title="User UID"
                  placeholder={this.state.userUid || "Enter your user UID"}
                  onSubmit={(value) => {
                    this.setUserUid(value);
                  }}
                />
              )}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Actions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  title="Create Entry"
                  onClick={this.onClickAdd}
                  icon={Icons.Plus}
                  className="w-full"
                />
                <Button
                  title={this.state.isRunning ? "Running…" : "Run Process"}
                  onClick={this.onClickRun}
                  icon={Icons.Play}
                  isDisabled={this.state.isRunning}
                  className="w-full"
                />
                <Button
                  title={this.state.showOnlyFutureEntries ? "Show All Entries" : "Show Future Only"}
                  onClick={this.toggleFutureEntries}
                  icon={Icons.Change}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            {filteredEntries && (
              <EntryTable
                entries={filteredEntries}
                onEditButtonClick={(entry: Entry) => {
                  this.setState({ entryInEdit: entry });
                }}
              />
            )}
          </div>
        </div>
        
        {this.state.entryInEdit && (
          <EntryEditModal
            entry={this.state.entryInEdit}
            isUpdating={this.state.isEntryUpdating}
            onCloseButtonClick={this.onModalCloseButtonClick}
            onSubmitButtonClick={(entry: Entry) => {
              this.patchEntry(entry);
            }}
            onDeleteButtonClick={(entry: Entry) => {
              this.deleteEntry(entry.uid);
            }}
          />
        )}
        {this.state.entryInCreation && (
          <EntryEditModal
            entry={this.state.entryInCreation}
            isUpdating={this.state.isEntryUpdating}
            onCloseButtonClick={this.onModalCloseButtonClick}
            onSubmitButtonClick={(entry: Entry) => {
              this.createEntry(entry);
            }}
          />
        )}
      </div>
    );
  }
}
