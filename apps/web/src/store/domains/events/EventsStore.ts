import { makeAutoObservable, runInAction } from "mobx";
import type { EventItem } from "@repo/types";
// import { mockEvents } from "../../../hooks/EventsDate";

class EventsStore {
  events: EventItem[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }

  loadEvents(events: EventItem[]) {
    try {
      const data = events;
      runInAction(() => {
        this.events = data;
      });
    } catch(error) {
      console.log(error);
    }
  }

  getEventById(id: string): EventItem | undefined {
      return this.events.find(i => i.id === id);
  }

}
export default EventsStore;
