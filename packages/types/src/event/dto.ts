import type { EventType } from "../enums";

export interface EventDto {
  id: string;
  title: string;
  description: string;
  eventType?: EventType;
  startDate?: string;
  endDate?: string;
  organization?: string;
  hardSkills?: string[];
  position?: string;
  salary?: number;
  externalUrl?: string;
  createdAt: string;
}

export interface CreateEventDto {
  title: string;
  description: string;
  eventType?: EventType;
  startDate?: string;
  endDate?: string;
  organization?: string;
  hardSkills?: string[];
  position?: string;
}