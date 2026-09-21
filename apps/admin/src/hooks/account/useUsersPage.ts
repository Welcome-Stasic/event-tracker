import { useMemo, useState } from "react";
import { useUsers } from "./useUsers";
import type { UserDto, UsersFilters } from "@repo/types";
import { mapUserToTableRow } from "../../types/user.mappers";

const ITEMS_PER_PAGE = 10;

const defaultFilters: UsersFilters = {
  projects: [],
  courses: [],
  directions: [],
};

const matchesFilters = (user: UserDto, filters: UsersFilters): boolean => {
  const matchesProject =
    filters.projects.length === 0 ||
    filters.projects.includes(user.project);

  const matchesCourse =
    filters.courses.length === 0 || filters.courses.includes(user.course);

  const matchesDirection =
    filters.directions.length === 0 ||
    user.directions.some((direction) => filters.directions.includes(direction));

  return matchesProject && matchesCourse && matchesDirection;
};

const matchesSearch = (user: UserDto, searchQuery: string): boolean => {
  if (!searchQuery.trim()) return true;

  const query = searchQuery.toLowerCase().trim();
  const fullName =
    `${user.name} ${user.surname} ${user.patronymic || ""}`.toLowerCase();

  return (
    fullName.includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.username.toLowerCase().includes(query)
  );
};

type ModalMode = "create" | "details";

export const useUsersPage = () => {
  const { data: users = [], isLoading, error } = useUsers();

  const errorMessage =
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
      ? error.message
      : error
        ? "Ошибка загрузки"
        : null;

  const [filters, setFilters] = useState<UsersFilters>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const searchedUsers = useMemo(
    () => users.filter((user) => matchesSearch(user, searchQuery)),
    [users, searchQuery],
  );

  const filteredUsers = useMemo(
    () => searchedUsers.filter((user) => matchesFilters(user, filters)),
    [searchedUsers, filters],
  );

  const tableRows = useMemo(
    () => filteredUsers.map(mapUserToTableRow),
    [filteredUsers],
  );

  const totalPages = Math.ceil(tableRows.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentRows = tableRows.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedUserId(null);
    setIsUserModalOpen(true);
  };

  const openDetailsModal = (userId: string) => {
    setModalMode("details");
    setSelectedUserId(userId);
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUserId(null);
  };

  const openFilterModal = () => setIsFilterOpen(true);
  const closeFilterModal = () => setIsFilterOpen(false);

  const applyFilters = (nextFilters: UsersFilters) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return {
    currentRows,
    totalPages,
    currentPage,

    isLoading,
    error: errorMessage,

    filters,
    isFilterOpen,
    isUserModalOpen,
    modalMode,
    selectedUserId,

    searchQuery,
    handleSearchChange,

    openFilterModal,
    closeFilterModal,
    applyFilters,

    openCreateModal,
    openDetailsModal,
    closeUserModal,

    handlePageChange,
  };
};