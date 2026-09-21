import EventsStore from "./domains/events/EventsStore";
import MyEventsStore from "./domains/events/MyEventsStore";
import ThemeStore from "./domains/theme/ThemeStore";
import UserStore from "./domains/user/UserStore";

export interface IRootStore {
  eventsStore: EventsStore;
  myEventsStore: MyEventsStore;
  themeStore: ThemeStore;
  userStore: UserStore;
}

class RootStore {
  eventsStore: EventsStore;
  myEventsStore: MyEventsStore;
  themeStore: ThemeStore;
  userStore: UserStore;
  constructor() {
    this.eventsStore = new EventsStore();
    this.myEventsStore = new MyEventsStore();
    this.themeStore = new ThemeStore();
    this.userStore = new UserStore();
  }
}

export default RootStore;
