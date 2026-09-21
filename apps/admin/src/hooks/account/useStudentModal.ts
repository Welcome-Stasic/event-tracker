import { useEffect, useState } from "react";
import type {
  RequiredUserField,
  UserFormErrors,
  UserFormValues,
} from "@repo/types";
import {
  mapFormValuesToUserDto,
  mapUserToFormValues,
} from "../../types/user.mappers";
import { useUserById } from "./useUserById";
import { useUserUpdate } from "./useUserUpdate";
import { useUserRegister } from "./useUserRegister";
import { useUserDelete } from "./useUserDelete";
import { mapFormValuesToRegisterUserDto } from "../../types/user.mappers";
type ModalMode = "create" | "details";
type ViewMode = "view" | "edit";

type Params = {
  isOpen: boolean;
  mode: ModalMode;
  studentId?: string | null;
  onClose: () => void;
};

const createEmptyUserForm = (): UserFormValues => ({
  username: "",
  email: "",
  password: "",
  name: "",
  surname: "",
  patronymic: "",
  description: "",
  telegramLink: "",
  portfolioLink: "",
  isSubscribedToNotifications: false,
  age: null,
  directions: [],
  course: 1,
  project: 0,
  skills: [],
  userRole: 0,
  avatarUrl: "",
});
const requiredFields: RequiredUserField[] = [
  "username",
  "email",
  "name",
  "surname",
  "portfolioLink",
  "telegramLink",
];

const isRequiredField = (
  key: keyof UserFormValues,
): key is RequiredUserField => {
  return requiredFields.includes(key as RequiredUserField);
};
export const useStudentModal = ({
  isOpen,
  mode,
  studentId,
  onClose,
}: Params) => {
  const [viewMode, setViewMode] = useState<ViewMode>("view");
  const [formData, setFormData] = useState<UserFormValues>(
    createEmptyUserForm(),
  );
  const [errors, setErrors] = useState<UserFormErrors>({});
  const [fullNameInput, setFullNameInput] = useState("");
  const [loadedStudentId, setLoadedStudentId] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { mutateAsync: registerUserAsync, isPending: isRegisterLoading } =
    useUserRegister();
  const { mutateAsync: deleteUserAsync, isPending: isDeleteLoading } =
    useUserDelete();
  const isCreateMode = mode === "create";
  const isDetailsMode = mode === "details";
  const isEditMode = viewMode === "edit";
  const isViewMode = viewMode === "view";

  const shouldLoadUser = isOpen && isDetailsMode && Boolean(studentId);

  const {
    data: loadedUser,
    isLoading: isUserLoading,
    error,
  } = useUserById(studentId ?? null, shouldLoadUser);

  const { mutateAsync: updateUserAsync, isPending: isUpdateLoading } =
    useUserUpdate();

  const errorMessage =
    error instanceof Error
      ? error.message
      : error
        ? "Ошибка загрузки пользователя"
        : "";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSkillInput("");
    setFocusedField(null);
    setShowDeleteConfirm(false);
    setErrors({});

    if (isCreateMode) {
      const emptyForm = createEmptyUserForm();

      setFormData(emptyForm);
      syncFullNameInput(emptyForm);
      setLoadedStudentId(null);
      setViewMode("edit");
      return;
    }

    if (isDetailsMode) {
      setViewMode("view");
    }
  }, [isOpen, isCreateMode, isDetailsMode]);

  useEffect(() => {
    if (!loadedUser) {
      return;
    }

    const mappedUser = mapUserToFormValues(loadedUser);

    setFormData(mappedUser);
    syncFullNameInput(mappedUser);
    setLoadedStudentId(loadedUser.id);
  }, [loadedUser]);

  const updateField = <K extends keyof UserFormValues>(
    key: K,
    value: UserFormValues[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (isRequiredField(key)) {
      setErrors((prev) => {
        if (!prev[key]) {
          return prev;
        }

        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const toggleDirection = (direction: 0 | 1 | 2) => {
    if (isViewMode) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      directions: prev.directions.includes(direction)
        ? prev.directions.filter((item) => item !== direction)
        : [...prev.directions, direction],
    }));
  };

  const addSkill = () => {
    const nextSkill = skillInput.trim();

    if (!nextSkill) {
      return;
    }

    if (formData.skills.includes(nextSkill)) {
      setSkillInput("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, nextSkill],
    }));
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item !== skill),
    }));
  };

  const handleStartEdit = () => {
    if (isDetailsMode) {
      setViewMode("edit");
    }
  };
  const validateForm = (): UserFormErrors => {
    const nextErrors: UserFormErrors = {};

    if (!formData.username.trim()) {
      nextErrors.username = "Обязательное поле";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Обязательное поле";
    }

    if (isCreateMode && !formData.password.trim()) {
      nextErrors.password = "Обязательное поле";
    }

    if (!formData.name.trim()) {
      nextErrors.name = "Обязательное поле";
    }

    if (!formData.surname.trim()) {
      nextErrors.surname = "Обязательное поле";
    }

    if (!formData.telegramLink.trim()) {
      nextErrors.telegramLink = "Обязательное поле";
    }

    if (!formData.portfolioLink.trim()) {
      nextErrors.portfolioLink = "Обязательное поле";
    }

    return nextErrors;
  };
  const handleSave = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isCreateMode) {
      const dto = mapFormValuesToRegisterUserDto(formData);
      await registerUserAsync(dto);
      onClose();
      return;
    }

    if (isDetailsMode && loadedStudentId) {
      const dto = mapFormValuesToUserDto(formData, loadedStudentId);

      await updateUserAsync({
        userId: loadedStudentId,
        data: dto,
      });

      setViewMode("view");
    }
  };

  const handleDelete = async () => {
    if (!loadedStudentId) return;

    await deleteUserAsync(loadedStudentId);
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleCancel = () => {
    if (isCreateMode) {
      onClose();
      return;
    }

    if (loadedUser) {
      const mappedUser = mapUserToFormValues(loadedUser);

      setFormData(mappedUser);
      syncFullNameInput(mappedUser);
    }

    setSkillInput("");
    setFocusedField(null);
    setViewMode("view");
  };

  const normalizeNamePart = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "";
    }

    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  const syncFullNameInput = (data: UserFormValues) => {
    setFullNameInput(
      [data.surname, data.name, data.patronymic].filter(Boolean).join(" "),
    );
  };

  const handleFullNameChange = (value: string) => {
    setFullNameInput(value);
  };

  const handleFullNameBlur = () => {
    const parts = fullNameInput.trim().split(/\s+/);

    updateField("surname", normalizeNamePart(parts[0] ?? ""));
    updateField("name", normalizeNamePart(parts[1] ?? ""));
    updateField("patronymic", normalizeNamePart(parts.slice(2).join(" ")));

    setFocusedField(null);
  };
  return {
    formData,
    isLoading:
      isUserLoading || isUpdateLoading || isRegisterLoading || isDeleteLoading,
    error: errorMessage,
    errors,
    skillInput,
    focusedField,
    showDeleteConfirm,
    fullNameInput,

    isCreateMode,
    isDetailsMode,
    isEditMode,
    isViewMode,

    setSkillInput,
    setFocusedField,
    setShowDeleteConfirm,
    setViewMode,

    updateField,
    toggleDirection,
    addSkill,
    removeSkill,
    handleStartEdit,
    handleSave,
    handleDelete,
    handleCancel,
    handleFullNameChange,
    handleFullNameBlur,
  };
};
