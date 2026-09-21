import { makeAutoObservable, runInAction } from "mobx";
import type { EventItem } from "@repo/types";

class EventsStore {
  events: EventItem[] = [];
  filterTypes: string[] = [];
  filterStartDate: string = "";
  filterEndDate: string = "";
  currentType: string = "Все";
  currentPage: number = 1;
  itemsPerPage: number = 6;
  searchQuery: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  loadEvents(events: EventItem[]) {
    try {
      const data = events;
      runInAction(() => {
        this.events = data;
      });
    } catch (error) {
      console.log(error);
    }
  }
  setFilters(types: string[], startDate: string, endDate: string) {
    this.filterTypes = types;
    this.filterStartDate = startDate;
    this.filterEndDate = endDate;
  }

  resetFilters() {
    this.filterTypes = [];
    this.filterStartDate = "";
    this.filterEndDate = "";
  }
  get filteredEvents(): EventItem[] {
    let base = this.events;
    const type = this.currentType;
    const now = Date.now();

    if (type === "Архив") {
      base = this.eventsArchive;
    } else if (type !== "Все") {
      base = this.events.filter(
        (e) => e.type === type && new Date(e.startDate).getTime() >= now,
      );
    } else {
      base = this.events.filter((e) => new Date(e.startDate).getTime() >= now);
    }

    let result = base;

    if (this.filterTypes.length > 0) {
      result = result.filter((e) => this.filterTypes.includes(e.type || ""));
    }

    if (this.filterStartDate) {
      const start = new Date(this.filterStartDate).getTime();
      result = result.filter((e) => new Date(e.startDate).getTime() >= start);
    }

    if (this.filterEndDate) {
      const end = new Date(this.filterEndDate).getTime();
      result = result.filter((e) => {
        const eventEnd = e.endDate
          ? new Date(e.endDate).getTime()
          : new Date(e.startDate).getTime();
        return eventEnd <= end;
      });
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase().trim();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          (e.description && e.description.toLowerCase().includes(query)),
      );
    }

    return result;
  }

  getEventById(id: string): EventItem | undefined {
    return this.events.find((i) => i.id === id);
  }

  getEventsByType(type: string): EventItem[] | undefined {
    return this.events.filter((i) => i.type === type);
  }
  addEvent(data: EventItem) {
    return (this.events = [...this.events, data]);
  }
  updateEvent(data: EventItem) {
    const index = this.events.findIndex((i) => i.id === data.id);
    if (index !== -1) {
      this.events[index] = data;
    }
  }
  deleteEvent(id: string) {
    this.events = this.events.filter((event) => event.id !== id);
  }
  get eventsArchive(): EventItem[] {
    const now = Date.now();
    return this.events.filter(
      (event) => new Date(event.startDate).getTime() < now,
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  get totalPages() {
    return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  }

  get paginatedEvents() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredEvents.slice(start, end);
  }

  setCurrentType(type: string) {
    this.currentType = type;
    this.currentPage = 1;
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
  }
}
export default EventsStore;
