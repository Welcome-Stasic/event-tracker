import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { EventItem } from "@repo/types";
import * as S from "../../styles/styles.eventsCard";
import { observer } from "mobx-react-lite";
import { formatDate } from "../../utils/formatDate";
import { getTimeToStart } from "../../utils/getTimeToStart";
import { useEventImage } from "../../hooks/events/useEventImage";

type EventCardProps = EventItem;

const EventCard: React.FC<EventCardProps> = observer(
  ({ id, title, type, startDate, imageUrl, createdAt }) => {
    const navigate = useNavigate();
    const { data: firstImage } = useEventImage(id, 1);
    const [timeRemaining, setTimeRemaining] = useState<string>("");
    const isNewEvent: boolean =
      Date.now() - new Date(createdAt).getTime() < 24 * 60 * 60 * 1000;
    useEffect(() => {
      const updateTimer = () => {
        const safeStartDate = startDate ?? "";
        setTimeRemaining(getTimeToStart(safeStartDate));
      };
      updateTimer();
      const interval = setInterval(updateTimer, 60000);
      return () => clearInterval(interval);
    }, [startDate]);

    return (
      <S.EventCardContainer onClick={() => navigate(`/events/${id}`)}>
        <S.EventsTimer>{timeRemaining}</S.EventsTimer>
        {isNewEvent ? <S.EventsIsNew>New</S.EventsIsNew> : ""}
        <S.EventImage
          imageUrl={firstImage || imageUrl}
          eventType={type ? type : ""}
        />
        <S.EventInfo>
          <S.EventTitle>{title}</S.EventTitle>
          <S.DateText>{formatDate(startDate ?? "")}</S.DateText>
        </S.EventInfo>
      </S.EventCardContainer>
    );
  },
);

export default EventCard;
