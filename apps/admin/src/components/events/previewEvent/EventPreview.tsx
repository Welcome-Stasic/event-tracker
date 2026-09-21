import type { EventItem } from "@repo/types";
import * as S from "../../../styles/login.style";
import * as E from "../../../styles/style.previewEvent";
import { useEventForm } from "../../../hooks/events/useEventForm";
import { useEventImage } from "../../../hooks/events/useEventImage";
import styled from "@emotion/styled";
import { useState } from "react";
import { DeleteModal } from "../../deleteModal";
import { useNavigate } from "react-router-dom";
import { ToastNotification } from "../../ToastNotification";

export const EventPreview = ({ event }: { event: EventItem | undefined }) => {
  const { handleDelete, handleEdit, dateTimeDisplay } = useEventForm(event);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();
  const [deleteToast, setDeleteToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const image1 = useEventImage(event?.id, 1);
  const image2 = useEventImage(event?.id, 2);
  const image3 = useEventImage(event?.id, 3);
  const image4 = useEventImage(event?.id, 4);
  const images = [image1, image2, image3, image4];

  return (
    <>
      <E.PreviewPageWrapper>
        <E.PreviewContent>
          <S.ImageContainer>
            {images.map((query, idx) => (
              <S.Image key={idx}>
                {query.data && (
                  <img
                    src={query.data}
                    alt={`event ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                )}
              </S.Image>
            ))}
          </S.ImageContainer>

          <S.Title style={{ textAlign: "left", marginBottom: "26px" }}>
            {event?.title}
          </S.Title>

          {dateTimeDisplay && <E.DateTime>{dateTimeDisplay}</E.DateTime>}

          <E.Description>{event?.description}</E.Description>

          <E.ButtonsContainer>
            <DeleteBtn type="button" onClick={() => setShowDeleteConfirm(true)}>
              Удалить
            </DeleteBtn>
            <EditBtn type="button" onClick={handleEdit}>
              Редактировать
            </EditBtn>
          </E.ButtonsContainer>
        </E.PreviewContent>
      </E.PreviewPageWrapper>
      {showDeleteConfirm && (
        <DeleteModal
          setShowDeleteConfirm={setShowDeleteConfirm}
          title="Удалить ивент?"
          handleDelete={async () => {
            const success = await handleDelete();
            if (success) {
              setDeleteToast({ message: "Событие удалено", type: "success" });
            } else {
              setDeleteToast({ message: "Ошибка при удалении", type: "error" });
            }
            setShowDeleteConfirm(false);
          }}
        />
      )}
      {deleteToast && (
        <ToastNotification
          message={deleteToast.message}
          type={deleteToast.type}
          onClose={() => {
            setDeleteToast(null);
            if (deleteToast.type === "success") {
              navigate(-1);
            }
          }}
        />
      )}
    </>
  );
};

const DeleteBtn = styled(S.SubmitButton)`
  font-size: 17px;
  font-weight: 600;
  background: #e5393533;
  color: #e53935b2;
  width: 50%;
  margin-top: 0;

  &:hover {
    background: #e539354d;
  }
`;

const EditBtn = styled(S.SubmitButton)`
  font-size: 17px;
  font-weight: 600;
  background:
    linear-gradient(90deg, #7086f3 0%, #1e7ee8 100%),
    linear-gradient(0deg, #007aff, #007aff);
  color: white;
  width: 50%;
  margin-top: 0;
`;
