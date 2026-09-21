import styled from "@emotion/styled";

interface EventImageProps {
  imageUrl?: string;
  eventType: string;
}

const gradientsByType: Record<string, string> = {
  События: "linear-gradient(180deg, #0099FF)",
  Олимпиада: "linear-gradient(180deg, #FF9500, #FFBD61)",
  Конкурс: "linear-gradient(180deg, #7378FF, #ACAFFF)",
  Стажировка: "linear-gradient(180deg, #787878, #161616)",
  Вакансия: "linear-gradient(135deg, #87C0FF, #007AFF)",
};
export const EventsTimer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 21;
  padding: 10px 12px;
  border-radius: 10px;
  background-color: #d9ebfff2;
  font-size: 16px;
  font-weight: 600;
`;
export const EventsIsNew = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 21;
  padding: 4px 8px;
  border-radius: 10px;
  background-color: #d9ebfff2;
  font-size: 16px;
  font-weight: 600;
`;
export const EventCardContainer = styled.div`
  min-width: 360px;
  max-width: 360px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow:
    0 32px 64px 0 rgba(0, 0, 0, 0.04),
    0 0 2px 1px rgba(0, 0, 0, 0.02);
  background: #fff;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s;
  position: relative;
  cursor: pointer;
`;

export const BadgeNew = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  background: #fff;
  color: #000;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 12px;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  z-index: 5;
`;

export const EventImage = styled.div<EventImageProps>`
  height: 160px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  position: relative;
  z-index: 2;
  background: ${({ imageUrl, eventType }) =>
    imageUrl
      ? `url(${imageUrl}) center/cover no-repeat`
      : gradientsByType[eventType] ||
        "linear-gradient(180deg, #0099FF, #FFFFFF)"};
`;

export const EventInfo = styled.div`
  padding: 10px 12px 12px 12px;
  background: #fff;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  position: relative;
  z-index: 1;
`;

export const EventTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 2px;
`;

export const EventType = styled.div`
  font-size: 0.9rem;
  color: #888;
`;

export const CompanyText = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin: 4px 0;
`;

export const DateText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  padding: 8px 12px;
  border-radius: 10px;
  background: #d9ebff;
  width: max-content;
`;

export const TagsContainer = styled.div`
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

export const Tag = styled.span`
  background: #f0f0f0;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 11px;
`;
