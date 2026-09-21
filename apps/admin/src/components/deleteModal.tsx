import * as S from "../styles/style.modal.warning";

interface DeleteModalProps {
  setShowDeleteConfirm: (value: boolean) => void;
  title: string;
  handleDelete: () => void;
}

export const DeleteModal = ({
  setShowDeleteConfirm,
  title,
  handleDelete,
}: DeleteModalProps) => {
  return (
    <S.ConfirmOverlay onClick={() => setShowDeleteConfirm(false)}>
      <S.ConfirmDialog onClick={(e) => e.stopPropagation()}>
        <S.ConfirmTitle>{title}</S.ConfirmTitle>
        <S.ConfirmButtons>
          <S.ConfirmDeleteBtn type="button" onClick={handleDelete}>
            Да, удалить
          </S.ConfirmDeleteBtn>
          <S.ConfirmCancelBtn
            type="button"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Не удалять
          </S.ConfirmCancelBtn>
        </S.ConfirmButtons>
      </S.ConfirmDialog>
    </S.ConfirmOverlay>
  );
};
