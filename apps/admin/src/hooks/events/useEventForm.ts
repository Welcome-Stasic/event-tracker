/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  type FormValues,
  type EventItem,
  type EventType,
  type EventFormErrors,
  isRequiredField,
  eventFieldsConfig,
} from "@repo/types";
import { useCreateEvent } from "./useCreateEvent";
import { useChangeEvent } from "./useChangeEvent";
import { useDeleteEvent } from "./useDeleteEvent";
import { formatDateRange } from "../../utils/formatDateRange";
import { formatDate } from "../../utils/formatDate";

const defaultValues: FormValues = {
  title: "",
  description: "",
  eventType: 0,
  startDate: "",
  endDate: "",
  organization: "",
  hardSkills: [],
  position: "",
  createdAt: "",
};
export const useEventForm = (initialData?: EventItem) => {
  const navigate = useNavigate();
  const createMutation = useCreateEvent();
  const updateMutation = useChangeEvent();
  const deleteMutation = useDeleteEvent();
  const [errors, setErrors] = useState<EventFormErrors>({});
  let dateTimeDisplay = "";
  if (initialData?.endDate) {
    dateTimeDisplay = formatDateRange(
      initialData.startDate,
      initialData.endDate,
    );
  } else if (initialData?.startDate) {
    dateTimeDisplay = formatDate(initialData.startDate);
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e);
  };
  const [formData, setFormData] = useState<FormValues>(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      return {
        title: rest.title || "",
        description: rest.description || "",
        eventType: rest.eventType,
        startDate: rest.startDate || "",
        endDate: rest.endDate || "",
        organization: rest.organization || "",
        hardSkills: rest.hardSkills || [],
        position: rest.position || "",
        createdAt: rest.createdAt || "",
      };
    }
    return defaultValues;
  });
  const validateForm = (): EventFormErrors => {
    const nextErrors: EventFormErrors = {};
    const visibleFields =
      eventFieldsConfig[formData.eventType]?.map((f) => f.name) || [];

    if (visibleFields.includes("title") && !formData.title.trim()) {
      nextErrors.title = "Обязательное поле";
    }
    if (visibleFields.includes("description") && !formData.description.trim()) {
      nextErrors.description = "Обязательное поле";
    }

    if (formData.eventType === undefined || formData.eventType === null) {
      nextErrors.eventType = "Обязательное поле";
    }
    if (!formData.startDate) {
      nextErrors.startDate = "Обязательное поле";
    }
    if (!formData.endDate) {
      nextErrors.endDate = "Обязательное поле";
    }

    if (
      visibleFields.includes("organization") &&
      !formData.organization.trim()
    ) {
      nextErrors.organization = "Обязательное поле";
    }
    if (visibleFields.includes("position") && !formData.position.trim()) {
      nextErrors.position = "Обязательное поле";
    }
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        nextErrors.endDate = "Дата окончания не может быть раньше даты начала";
      }
    }

    return nextErrors;
  };

  const isSubmit = createMutation.isPending || updateMutation.isPending;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (isRequiredField(name as keyof FormValues)) {
      setErrors((prev) => {
        if (!prev[name as keyof EventFormErrors]) return prev;
        const next = { ...prev };
        delete next[name as keyof EventFormErrors];
        return next;
      });
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(",").map((s) => s.trim());
    setFormData((prev) => ({ ...prev, hardSkills: skills }));
  };

  const valDate = (data: FormValues) => ({
    ...data,
    eventType: Number(data.eventType) as EventType,
    startDate: data.startDate ? new Date(data.startDate).toISOString() : "",
    endDate: data.endDate ? new Date(data.endDate).toISOString() : "",
  });

  const handleSubmit = async (
    e: React.FormEvent,
  ): Promise<EventItem | null> => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return null;
    }
    try {
      let result: EventItem;
      if (initialData?.id) {
        const payload = valDate(formData);
        const eventToUpdate: EventItem = {
          ...initialData,
          ...payload,
          id: initialData.id,
        };
        await updateMutation.mutateAsync({
          id: initialData.id,
          data: eventToUpdate,
        });
        result = eventToUpdate;
      } else {
        const payload = valDate(formData);
        result = await createMutation.mutateAsync(payload);
      }
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleDelete = async (): Promise<boolean> => {
    if (!initialData?.id) return false;
    try {
      await deleteMutation.mutateAsync(initialData.id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const handleEdit = () => {
    navigate("edit");
  };

  return {
    formData,
    errors,
    handleChange,
    handleSkillsChange,
    handleTextareaChange,
    handleInputChange,
    handleSubmit,
    handleDelete,
    handleEdit,
    isSubmit,
    isDelete: deleteMutation.isPending,
    dateTimeDisplay,
  };
};
