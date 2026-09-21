import { useStore } from "../../store/storeProvider";
import { useEvents } from "../../hooks/events/useEvents";
import { useState, useCallback, useEffect } from "react";
import { useQueryState } from "nuqs";
import { useNavigate } from "react-router-dom";

export const useAllEvents = () => {
  const { isLoading } = useEvents();
  const { eventsStore } = useStore();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [typeItems, setTypeItems] = useQueryState("type", {
    defaultValue: "Все",
  });
  const [searchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
  });

  useEffect(() => {
    eventsStore.setCurrentType(typeItems || "Все");
  }, [typeItems, eventsStore]);

  useEffect(() => {
    eventsStore.setSearchQuery(searchQuery || "");
  }, [searchQuery, eventsStore]);

  const allTypes = [
    "Все",
    "События",
    "Конкурс",
    "Олимпиада",
    "Стажировка",
    "Вакансия",
    "Архив",
  ];

  const handleType = useCallback(
    (type: string) => {
      setTypeItems(type);
    },
    [setTypeItems],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      eventsStore.setPage(1);
    },
    [setSearchQuery, eventsStore],
  );

  const openFilter = useCallback(() => setIsFilterOpen(true), []);
  const closeFilter = useCallback(() => setIsFilterOpen(false), []);
  const goToCreateEvent = useCallback(
    () => navigate("/events/create"),
    [navigate],
  );

  return {
    isLoading,
    isFilterOpen,
    typeItems,
    allTypes,
    displayEvents: eventsStore.paginatedEvents,
    handleType,
    openFilter,
    closeFilter,
    goToCreateEvent,
    eventsStore,
    searchQuery,
    handleSearchChange,
  };
};
