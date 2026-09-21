import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import type { EventItem } from "@repo/types";
import * as S from "../styles/styles.eventsCard";
import { useStore } from "../store/storeProvider";
import { observer } from "mobx-react-lite";
import { useEventImage } from "../hooks/events/useEventImage.ts";

interface EventCardProps extends EventItem {}

const EventCard: React.FC<EventCardProps> = memo(observer(
  ({ id, title, type, company, date, createdAt, tags, imageUrl }) => {
    const { themeStore } = useStore();
    const navigate = useNavigate();
    const { data: firstImage } = useEventImage(id, 1);
    const isNewEvent: boolean =
      Date.now() - new Date(createdAt).getTime() < 24 * 60 * 60 * 1000;
    return (
      <S.EventCardContainer onClick={() => navigate(`/events/${id}`)}>
        {isNewEvent ? (
          <S.BadgeNew theme={themeStore.theme}>NEW</S.BadgeNew>
        ) : (
          ""
        )}
        <S.EventImage
          imageUrl={firstImage || imageUrl}
          eventType={type ? type : ""}
        />
        <S.EventInfo theme={themeStore.theme}>
          <S.EventTitle>{title}</S.EventTitle>
          <S.EventType>{type}</S.EventType>
          <S.CompanyText>{company}</S.CompanyText>
          <S.DateText>{date}</S.DateText>
          {tags && tags.length > 0 && (
            <S.TagsContainer>
              {tags.map((tag) => (
                <S.Tag theme={themeStore.theme} key={tag}>
                  {tag}
                </S.Tag>
              ))}
            </S.TagsContainer>
          )}
        </S.EventInfo>
      </S.EventCardContainer>
    );
  },
));

export default EventCard;
