import React from "react";

import { ContentWrapper, PageContainer } from "../styles/global";
import FilterModal from "./FilterModal";
import { HeaderPage } from "./HeaderPage";

import { UsersTable } from "./users/UsersTable";
import { useUsersPage } from "../hooks/account/useUsersPage";
import { Loader } from "./loader";

import StudentModal from "./StudentModal";
import { Pagination } from "./Pagination";

const UsersPage: React.FC = () => {
  const {
    currentRows,
    totalPages,
    currentPage,

    isLoading,
    error,

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
  } = useUsersPage();

  return (
    <PageContainer>
      <HeaderPage
        title="Пользователи"
        textButton="Добавить пользователя"
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        onClickFilter={openFilterModal}
        onClickAddModal={openCreateModal}
      />

      {isLoading && <Loader />}
      {error && <div>{error}</div>}

      <ContentWrapper style={{ margin: "0 auto" }}>
        {!isLoading && !error && (
          <>
            <UsersTable rows={currentRows} onRowClick={openDetailsModal} />

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
        <FilterModal
          isOpen={isFilterOpen}
          value={filters}
          onClose={closeFilterModal}
          onApply={applyFilters}
        />
        <StudentModal
          isOpen={isUserModalOpen}
          onClose={closeUserModal}
          mode={modalMode}
          studentId={selectedUserId}
        />
      </ContentWrapper>
    </PageContainer>
  );
};

export default UsersPage;
