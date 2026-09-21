import { useState, useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useEventForm } from "../../../hooks/events/useEventForm";
import {
  eventFieldsConfig,
  eventTypeMap,
  type EventItem,
} from "@repo/types";
import * as S from "../../../styles/style.eventsForm";
import { useEventFormRender } from "../../../hooks/events/useEventFormRender";
import { useEventImage } from "../../../hooks/events/useEventImage";
import {
  useAddEventImage,
  useDeleteEventImage,
} from "../../../hooks/events/useEventImageMutations";
import { API } from "@repo/api";
import { ToastNotification } from "../../ToastNotification";

export const FormSection = ({ data }: { data?: EventItem }) => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const {
    formData,
    errors,
    handleChange,
    handleSkillsChange,
    handleTextareaChange,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isSubmit,
  } = useEventForm(data);

  const { focusedField, setFocusedField, renderField } = useEventFormRender(
    formData,
    errors,
    handleTextareaChange,
    handleInputChange,
    handleSkillsChange,
  );

  const fields = eventFieldsConfig[formData.eventType] || [];
  const isEditMode = !!data?.id;
  const addImageMutation = useAddEventImage(data?.id ?? "");
  const deleteImageMutation = useDeleteEventImage(data?.id ?? "");
  const [pendingFiles, setPendingFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [previewUrls, setPreviewUrls] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSquareClick = (index: number) => {
    const hasImage = isEditMode
      ? imageQueries[index]?.data !== null &&
        imageQueries[index]?.data !== undefined
      : previewUrls[index] !== null;

    if (hasImage) {
      handleRemoveImage(index);
    } else {
      fileInputRefs.current[index]?.click();
    }
  };
  const imageQueries = [
    useEventImage(data?.id, 1),
    useEventImage(data?.id, 2),
    useEventImage(data?.id, 3),
    useEventImage(data?.id, 4),
  ];

  const getImageDisplayUrl = (index: number): string | null => {
    if (isEditMode) {
      const query = imageQueries[index];
      if (query.isLoading || !query.data) return null;
      return query.data;
    }
    return previewUrls[index];
  };

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const apiIndex = index + 1;

    if (isEditMode && data?.id) {
      addImageMutation.mutate({ index: apiIndex, file });
    } else {
      const newFiles = [...pendingFiles];
      const newPreviews = [...previewUrls];
      if (newPreviews[index]) URL.revokeObjectURL(newPreviews[index]!);
      newFiles[index] = file;
      newPreviews[index] = URL.createObjectURL(file);
      setPendingFiles(newFiles);
      setPreviewUrls(newPreviews);
    }
    event.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const apiIndex = index + 1;
    if (isEditMode && data?.id) {
      deleteImageMutation.mutate(apiIndex);
    } else {
      const newFiles = [...pendingFiles];
      const newPreviews = [...previewUrls];
      if (newPreviews[index]) URL.revokeObjectURL(newPreviews[index]!);
      newFiles[index] = null;
      newPreviews[index] = null;
      setPendingFiles(newFiles);
      setPreviewUrls(newPreviews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const event = await originalHandleSubmit(e);
    if (!event) {
      setToast({ message: "Ошибка при сохранении", type: "error" });
      return;
    }
    if (!isEditMode && event.id) {
      try {
        const uploadPromises = pendingFiles.map((file, idx) => {
          if (file) return API.events.addEventImage(event.id!, idx + 1, file);
          return Promise.resolve();
        });
        await Promise.all(uploadPromises);
      } catch (uploadError) {
        console.error(uploadError);
        setToast({ message: "Ошибка при загрузке изображений", type: "error" });
        return;
      }
    }

    setToast({
      message: isEditMode ? "Событие обновлено" : "Событие создано",
      type: "success",
    });
  };
  return (
    <>
      <S.FormEvent onSubmit={handleSubmit}>
        <S.ImageContainer>
          {[0, 1, 2, 3].map((index) => {
            const imageUrl = getImageDisplayUrl(index);
            const showPlus = !imageUrl;

            return (
              <S.Image
                key={index}
                isEdit={true}
                onClick={() => handleSquareClick(index)}
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={`event image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                )}
                {showPlus && <S.PlusCircle />}
                {!showPlus && <S.DeleteCircle />}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={(el) => {
                    fileInputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleFileChange(e, index)}
                />
              </S.Image>
            );
          })}
        </S.ImageContainer>

        <S.FormContainer>
          <S.Field>
            <S.FieldLabel
              isFocused={focusedField === "eventType"}
              hasError={!!errors.eventType}
            >
              Тип события
            </S.FieldLabel>
            <S.Select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              onFocus={() => setFocusedField("eventType")}
              onBlur={() => setFocusedField(null)}
              isFocused={focusedField === "eventType"}
              hasError={!!errors.eventType}
            >
              {Object.entries(eventTypeMap).map(([key, label]) => (
                <option key={key} value={Number(key)}>
                  {label}
                </option>
              ))}
            </S.Select>
          </S.Field>

          {fields.map((field) => (
            <S.Field key={field.name}>
              <S.FieldLabel
                isFocused={focusedField === field.name}
                hasError={!!errors[field.name as keyof typeof errors]}
              >
                {field.label}
              </S.FieldLabel>
              {renderField(field)}
            </S.Field>
          ))}

          <S.SubmitButton type="submit" disabled={isSubmit}>
            {isSubmit ? "Сохранение..." : "Сохранить"}
          </S.SubmitButton>
        </S.FormContainer>
      </S.FormEvent>
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => {
            setToast(null);
            if (toast.type === "success") {
              navigate(-1);
            }
          }}
        />
      )}
    </>
  );
};
