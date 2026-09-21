import EventCard from "./EventCard";
import * as S from "../../styles/styles.events";
import type { EventItem } from "@repo/types";
import { observer } from "mobx-react-lite";

interface EventSectionProps {
  events: EventItem[];
  emptyPlaceholder?: string;
}

export const EventSection = observer(
  ({
    events,
    emptyPlaceholder = "Пока нет ивентов в данной группе",
  }: EventSectionProps) => {
    const isEmpty = events.length === 0;

    return (
      <S.EventsList empty={isEmpty}>
        {!isEmpty ? (
          events.map((event) => <EventCard key={event.id} {...event} />)
        ) : (
          <S.EmptyPlaceholder>{emptyPlaceholder}</S.EmptyPlaceholder>
        )}
      </S.EventsList>
    );
  },
);
