import type { EventType } from "../enums";

export interface EventItem {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  startDate: string;
  endDate: string;
  organization: string;
  hardSkills: string[];
  position: string;
  salary: number;
  externalUrl: string;
  createdAt: string;
  type: string;
  company: string;
  date: string;
  isNew: boolean;
  tags: string[];
  imageUrl: string;
}