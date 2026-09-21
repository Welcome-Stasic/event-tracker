import { makeAutoObservable, runInAction } from "mobx";
import type { EventItem } from "@repo/types";

class MyEventsStore {
  myEvents: EventItem[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }

  loadMyEvents(events: EventItem[]) {
    try {
      const data = events;
      runInAction(() => {
        this.myEvents = data;
      });
    } catch(error) {
      console.log(error);
    }
  }
  addEvents(event: EventItem): void {
     this.myEvents = [...this.myEvents, event];
  }
  removeEvents(id: string): void {
      this.myEvents = this.myEvents.filter(event => event.id !== id);
  }
  isEventAdded = (eventId: string): boolean => {
    return this.myEvents.some((e) => e.id === eventId);
  };
}

export default MyEventsStore;
