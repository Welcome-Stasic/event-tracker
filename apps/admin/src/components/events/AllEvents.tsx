// components/events/AllEvents.tsx
import { observer } from "mobx-react-lite";
import { Loader } from "../loader";
import { EventSection } from "./EventSection";
import { ContentWrapper, PageContainer } from "../../styles/global";
import { HeaderPage } from "../HeaderPage";
import { Pagination } from "../Pagination";
import { EventsContainer } from "../../styles/styles.events";
import styled from "@emotion/styled";
import { FilterModalEvents } from "./modal/FilterModalEvents";
import { useAllEvents } from "../../hooks/events/useAllEvents";

const AllEvents = observer(() => {
  const {
    isLoading,
    isFilterOpen,
    typeItems,
    allTypes,
    displayEvents,
    handleType,
    openFilter,
    closeFilter,
    goToCreateEvent,
    eventsStore,
    searchQuery,
    handleSearchChange,
  } = useAllEvents();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <HeaderPage
        title="Ивенты"
        textButton="Создать ивент"
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        onClickFilter={openFilter}
        onClickAddModal={goToCreateEvent}
      />
      <ContentWrapper style={{ margin: "0px auto" }}>
        <TypeEventsContainer>
          <TypesEvent>
            {allTypes.map((type) => (
              <TypeItemWrapper
                key={type}
                className={type === typeItems ? "active" : ""}
              >
                <TypeItem
                  active={type === typeItems}
                  onClick={() => handleType(type)}
                >
                  {type}
                </TypeItem>
              </TypeItemWrapper>
            ))}
          </TypesEvent>
        </TypeEventsContainer>
        <EventsContainer>
          <EventSection events={displayEvents} />
        </EventsContainer>
        <Pagination
          totalPages={eventsStore.totalPages}
          currentPage={eventsStore.currentPage}
          onPageChange={(page) => eventsStore.setPage(page)}
        />
        <FilterModalEvents isOpen={isFilterOpen} onClose={closeFilter} />
      </ContentWrapper>
    </PageContainer>
  );
});

export default AllEvents;

const TypeEventsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 20px;
`;
const TypeItemWrapper = styled.div`
  display: flex;
  align-items: center;
  &::after {
    content: "";
    display: block;
    width: 1px;
    height: 12px;
    background: #00000026;
  }
  &:last-child::after {
    display: none;
  }

  &.active::after {
    display: none;
  }
  &:has(+ .active)::after {
    display: none;
  }
`;
const TypesEvent = styled.div`
  border-radius: 10px;
  background: #f4f4f7;
  padding: 5px;
  display: flex;
`;
const TypeItem = styled.div<{ active?: boolean }>`
  padding: 6px 24px;
  cursor: pointer;
  ${(p) =>
    p.active &&
    `
    background: #FFFFFF;
    border: 0.5px solid #0000000A;
    box-shadow: 0px 3px 1px 0px #0000000A;
    box-shadow: 0px 3px 8px 0px #0000001F;
    border-radius: 7px;
  `}
`;
