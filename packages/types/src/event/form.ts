export type FormValues = {
  title: string;
  description: string;
  eventType: number;
  startDate: string;
  endDate: string;
  organization: string;
  hardSkills: string[];
  position: string;
  createdAt: string;
};

export type FormFieldUiType =
  | "text"
  | "textarea"
  | "datetime-local"
  | "select"
  | "skills";

export interface IField {
  name: keyof FormValues;
  label: string;
  type: FormFieldUiType;
}

export type RequiredEventField =
  | "title"
  | "description"
  | "eventType"
  | "startDate"
  | "endDate"
  | "organization"
  | "position";

export type EventFormErrors = {
  title?: string;
  description?: string;
  eventType?: string;
  startDate?: string;
  endDate?: string;
  organization?: string;
  position?: string;
  hardSkills?: string;
};

export const requiredFields: RequiredEventField[] = [
  "title",
  "description",
  "eventType",
  "startDate",
  "endDate",
  "organization",
  "position",
];

export const isRequiredField = (
  key: keyof FormValues,
): key is RequiredEventField => {
  return requiredFields.includes(key as RequiredEventField);
};

export const eventFieldsConfig: Record<number, IField[]> = {
  0: [
    { name: "title", label: "Название", type: "text" },
    { name: "organization", label: "Организация", type: "text" },
    { name: "startDate", label: "Дата начала", type: "datetime-local" },
    { name: "endDate", label: "Дата окончания", type: "datetime-local" },
    { name: "description", label: "Описание", type: "textarea" },
  ],
  1: [
    { name: "title", label: "Название", type: "text" },
    { name: "organization", label: "Организация", type: "text" },
    { name: "startDate", label: "Дата от", type: "datetime-local" },
    { name: "endDate", label: "Дата до", type: "datetime-local" },
    { name: "description", label: "Описание", type: "textarea" },
  ],
  2: [
    { name: "title", label: "Название", type: "text" },
    { name: "hardSkills", label: "Hard Skills", type: "skills" },
    { name: "startDate", label: "Дата начала", type: "datetime-local" },
    { name: "endDate", label: "Дата окончания", type: "datetime-local" },
    { name: "description", label: "Описание", type: "textarea" },
  ],
  3: [
    { name: "title", label: "Название", type: "text" },
    { name: "hardSkills", label: "Hard Skills", type: "skills" },
    { name: "position", label: "Рассматриваемая позиция", type: "text" },
    { name: "startDate", label: "Дата начала", type: "datetime-local" },
    { name: "endDate", label: "Дата окончания", type: "datetime-local" },
    { name: "description", label: "Описание", type: "textarea" },
  ],
  4: [
    { name: "title", label: "Название", type: "text" },
    { name: "position", label: "Рассматриваемая позиция", type: "text" },
    { name: "startDate", label: "Дата начала", type: "datetime-local" },
    { name: "endDate", label: "Дата окончания", type: "datetime-local" },
    { name: "description", label: "Описание", type: "textarea" },
  ],
};