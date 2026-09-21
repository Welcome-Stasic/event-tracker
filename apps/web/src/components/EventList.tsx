import React, { memo, type ComponentType } from "react";
import { EventSection } from "./EventSection";
import type { EventItem } from "@repo/types";
import type { IconBaseProps } from "@repo/types";

interface EventListProps {
  eventsByType: Record<string, EventItem[]>;
  allTypes: string[];
  iconByType: Record<string, ComponentType<IconBaseProps>>;
  onOpenGroup: (type: string) => void;
}

export const EventList: React.FC<EventListProps> = memo(({
  eventsByType,
  allTypes,
  iconByType,
  onOpenGroup,
}) => {
  return (
    <>
      {allTypes.map((type, index) => {
        const IconComponent = iconByType[type];
        return (
          <EventSection
            key={type}
            title={type}
            icon={IconComponent && <IconComponent />}
            events={eventsByType[type] || []}
            onOpenGroup={() => onOpenGroup(type)}
            first={index === 0}
            emptyPlaceholder="Пока нет ивентов"
          />
        );
      })}
    </>
  );
});
