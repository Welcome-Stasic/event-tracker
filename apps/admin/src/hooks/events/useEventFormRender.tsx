import { useState } from "react";
import {
  type FormValues,
  type EventFormErrors,
  type IField,
} from "@repo/types";
import * as S from "../../styles/style.eventsForm";

export const useEventFormRender = (
  formData: FormValues,
  errors: EventFormErrors,
  handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSkillsChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const renderField = (field: IField) => {
    const fieldName = field.name;
    const hasError = !!errors[fieldName as keyof typeof errors];
    const isFocused = focusedField === fieldName;

    const commonProps = {
      isFocused,
      hasError,
      onFocus: () => setFocusedField(fieldName),
      onBlur: () => setFocusedField(null),
    };

    switch (field.type) {
      case "textarea":
        return (
          <S.Textarea
            {...commonProps}
            name={fieldName}
            value={formData[fieldName]?.toString() ?? ""}
            onChange={handleTextareaChange}
          />
        );
      case "datetime-local":
        return (
          <S.Input
            {...commonProps}
            type="datetime-local"
            name={fieldName}
            value={formData[fieldName]?.toString() ?? ""}
            onChange={handleInputChange}
          />
        );
      case "skills":
        return (
          <S.Input
            {...commonProps}
            type="text"
            name={fieldName}
            value={(formData.hardSkills || []).join(", ")}
            onChange={handleSkillsChange}
          />
        );
      default:
        return (
          <S.Input
            {...commonProps}
            type="text"
            name={fieldName}
            value={formData[fieldName]?.toString() ?? ""}
            onChange={handleInputChange}
          />
        );
    }
  };

  return {
    focusedField,
    setFocusedField,
    renderField,
  };
};
