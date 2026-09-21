import EventsStore from "./domains/events/EventsStore.ts";
import ManagerStore from "./domains/manager/ManagerStore.ts";

export interface IRootStore {
  eventsStore: EventsStore;
  managerStore: ManagerStore;
}

class RootStore {
  eventsStore: EventsStore;
  managerStore: ManagerStore;
  constructor() {
    this.eventsStore = new EventsStore();
    this.managerStore = new ManagerStore();
  }
}

export default RootStore;
