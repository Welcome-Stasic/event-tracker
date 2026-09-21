import React from "react";

import type { UserTableRow } from "@repo/types";

import styled from "@emotion/styled";
import OutsideLinkIcon from "../../assets/outside-link.svg";
export const TableWrapper = styled.div`
  border: 1px solid #aad3ff;
  border-radius: 12px;
  overflow: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  background: white;
  color: #71717a;
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  padding: 16px;
  border-bottom: 1px solid #aad3ff;
`;

export const ThCenter = styled(Th)`
  text-align: center;
`;

export const Td = styled.td`
  min-width: 300px;
  padding: 5px 16px;
  border-bottom: 1px solid #aad3ff;
  color: #111827;
  font-size: 15px;
  vertical-align: middle;
`;

export const TdCenter = styled.td`
  text-align: center;
  padding: 5px 16px;
  border-bottom: 1px solid #aad3ff;
  color: #111827;
  font-size: 15px;
  vertical-align: middle;
`;

export const Tr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
`;

export const Badge = styled.span`
  background: #f2f2f3;
  color: #2f2f35;
  font-size: 13px;
  line-height: 1;
  padding: 12px 23px;
  border-radius: 10px;
  white-space: nowrap;
  font-weight: 600;
`;
export const TdBadges = styled.td`
  max-width: 300px;
  padding: 5px 16px;
  border-bottom: 1px solid #aad3ff;
  color: #111827;
  font-size: 15px;
  vertical-align: middle;
`;

export const BadgeContainer = styled.div`
  display: flex;
  gap: 14px;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;
export const LinkIconWrapper = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;

  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: #f2f2f3;
  }

  img {
    width: 16px;
    height: 16px;
    display: block;
  }
`;
type UsersTableProps = {
  rows: UserTableRow[];
  onRowClick: (userId: string) => void;
};

export const UsersTable: React.FC<UsersTableProps> = ({ rows, onRowClick }) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <Th>ФИО</Th>
            <ThCenter>Username</ThCenter>
            <ThCenter>Проект</ThCenter>
            <ThCenter>Направление, курс</ThCenter>
            <ThCenter>Telegram</ThCenter>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <Tr
              key={row.id}
              onClick={() => {
                onRowClick(row.id);
              }}
              style={{ cursor: "pointer" }}
            >
              <Td>{row.fio}</Td>

              <TdCenter>{row.username}</TdCenter>

              <TdCenter>{row.project}</TdCenter>

              <TdBadges>
                <BadgeContainer>
                  {row.badges.map((badge, index) => (
                    <Badge key={`${badge}-${index}`}>{badge}</Badge>
                  ))}
                </BadgeContainer>
              </TdBadges>

              <TdCenter>
                {row.telegramLink ? (
                  <LinkIconWrapper
                    href={row.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src={OutsideLinkIcon} alt="Открыть ссылку" />
                  </LinkIconWrapper>
                ) : (
                  "—"
                )}
              </TdCenter>
            </Tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};
