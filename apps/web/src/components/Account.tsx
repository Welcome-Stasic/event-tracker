import { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/styles.AccountPage.ts";
import { IconCop, IconCopy, IconEdit, IconTick } from "../icon/icons.tsx";

import { RouteName } from "../router/routes.tsx";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/storeProvider.tsx";
import { useUpdateUser } from "../hooks/account/useUpdateUser.ts";
import { Loader } from "./loader.tsx";
import type { IUpdateUser } from "@repo/types";
import { useGetAvatar } from "../hooks/account/useGetAvatar.ts";
import { useChangeAvatar } from "../hooks/account/useChangeAvatar.ts";

const directionName: Record<number, string> = {
  0: "Frontend",
  1: "Backend",
  2: "UX/UI",
};

const Account = memo(observer(() => {
  const changeAvatar = useChangeAvatar();
  const updateUser = useUpdateUser();
  const { userStore, themeStore } = useStore();
  const theme = themeStore.theme;
  const data = userStore.user;
  const { data: avatarBlob } = useGetAvatar();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const photoUrl =
    avatarUrl ||
    window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url ||
    undefined;

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(
    null,
  );
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [form, setForm] = useState({
    userName: "",
    fullName: "",
    age: "",
    phone: "",
    course: "",
    direction: "",
    telegramLink: "",
    portfolioLink: "",
    email: "",
    description: "",
    skills: "",
  });

  const [directionTags, setDirectionTags] = useState<string[]>([]);
  const [techTags, setTechTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const AVAILABLE_DIRECTIONS = ["Frontend", "Backend", "UX/UI"] as const;

  const updateField = <K extends keyof typeof form>(key: K, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (avatarBlob) {
      const url = URL.createObjectURL(avatarBlob);
      setAvatarUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setAvatarUrl(null);
    }
  }, [avatarBlob]);

  useEffect(() => {
    if (data && !isEditing) {
      const directionNum =
        Array.isArray(data.direction) && data.direction.length > 0
          ? data.direction[0]
          : 0;
      const directionStr = directionName[directionNum] || "";
      const fullName = [data.surname, data.name, data.patronymic]
        .filter(Boolean)
        .join(" ");

      const skillsStr = Array.isArray(data.skills)
        ? data.skills.join(", ")
        : "";

      setForm((prev) => ({
        ...prev,
        userName: data.username ?? "",
        fullName: fullName,
        age: String(data.age ?? ""),
        course: String(data.course ?? ""),
        direction: directionStr,
        telegramLink: data.telegramLink ?? "",
        portfolioLink: data.portfolioLink ?? "",
        email: data.email ?? "",
        description: data.description ?? "",
        skills: skillsStr,
      }));
      setDirectionTags(directionStr ? [directionStr] : []);
      setTechTags(data.skills ?? []);
    }
  }, [data, isEditing]);

  const handleEditStart = () => {
    setSelectedAvatarFile(null);
    setIsEditing(true);
    navigate(RouteName.ACCOUNT, {
      state: { isEditing: true },
      replace: true,
    });
  };

  const handleEditEnd = () => {
    setIsEditing(false);
    navigate(RouteName.ACCOUNT, {
      state: { isEditing: false },
      replace: true,
    });
  };

  const handleCancel = () => {
    setSelectedAvatarFile(null);
    handleEditEnd();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedAvatarFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (!data) return;

    const reverseDirectionMap: Record<string, number> = {
      Frontend: 0,
      Backend: 1,
      "UX/UI": 2,
    };

    const nameParts = form.fullName.split(" ").filter(Boolean);
    const [surname = "", name = "", patronymic = ""] = nameParts;

    const directionNumber =
      directionTags.length > 0
        ? reverseDirectionMap[directionTags[0]]
        : Array.isArray(data.direction) && data.direction.length > 0
          ? data.direction[0]
          : 0;

    const updates: IUpdateUser = {
      id: data.id,
      username: form.userName || data.username,
      email: form.email || data.email,
      name: name || data.name,
      surname: surname || data.surname,
      patronymic: patronymic || data.patronymic,
      description: form.description || data.description,
      telegramLink: form.telegramLink || data.telegramLink,
      portfolioLink: form.portfolioLink || data.portfolioLink,
      isSubscribedToNotifications: false,
      age: form.age ? Number(form.age) : data.age,
      direction:
        directionNumber ??
        (Array.isArray(data.direction) && data.direction.length > 0
          ? data.direction[0]
          : 0),
      course: form.course ? Number(form.course) : Number(data.course),
      skills: techTags.length ? techTags : data.skills,
      userRole: 2,
    };
    if (selectedAvatarFile) {
      changeAvatar.mutate(selectedAvatarFile, {
        onSuccess: () => {
          setSelectedAvatarFile(null);
          handleEditEnd();
        },
        onError: (error) => {
          console.error("Ошибка смены аватара:", error);
          handleEditEnd();
        },
      });
    }
    updateUser.mutate(updates, {
      onSuccess: () => {
        handleEditEnd();
      },
      onError: (error) => {
        console.error(error);
        handleEditEnd();
      },
    });
  };

  if (updateUser.isPending) return <Loader />;

  return (
    <S.AccountContainer>
      <S.AccountCard theme={theme}>
        <S.AccountHeader>
          <S.AccountHeaderActions>
            {!isEditing ? (
              <S.AccountAction theme={theme} onClick={handleEditStart}>
                <IconEdit />
              </S.AccountAction>
            ) : (
              <>
                <S.AccountAction
                  theme={theme}
                  className="cancel"
                  onClick={handleCancel}
                >
                  ✕
                </S.AccountAction>
                <S.AccountAction
                  theme={theme}
                  className="save"
                  onClick={handleSave}
                >
                  <IconTick />
                </S.AccountAction>
              </>
            )}
          </S.AccountHeaderActions>

          <S.AccountAvatarWrapper>
            <S.AccountAvatar src={photoUrl} alt={form.fullName} />
          </S.AccountAvatarWrapper>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />

          {isEditing && (
            <S.AccountChangePhoto onClick={() => fileInputRef.current?.click()}>
              {selectedAvatarFile
                ? selectedAvatarFile.name
                : "Выбрать новую фотографию"}
            </S.AccountChangePhoto>
          )}

          <S.AccountName>
            {isEditing ? (
              <>
                <S.Field>
                  <S.FieldLabel
                    theme={theme}
                    isEditing={isEditing}
                    isFocused={focusedField === "fullName"}
                  >
                    ФИО
                  </S.FieldLabel>
                  <S.Input
                    theme={theme}
                    isEditing={isEditing}
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                  />
                </S.Field>

                <S.Field>
                  <S.DirectionEditContainer theme={theme} isEditing={isEditing}>
                    <S.FieldLabel
                      theme={theme}
                      isEditing={isEditing}
                      isFocused={focusedField === "direction"}
                    >
                      Направление
                    </S.FieldLabel>
                    <S.EditCheckboxList>
                      {AVAILABLE_DIRECTIONS.map((opt) => {
                        const checked = directionTags[0] === opt;
                        return (
                          <S.EditCheckboxItem
                            theme={theme}
                            key={opt}
                            checked={checked}
                          >
                            <input
                              type="radio"
                              name="direction"
                              checked={checked}
                              onFocus={() => setFocusedField("direction")}
                              onBlur={() => setFocusedField(null)}
                              onChange={() => {
                                setDirectionTags([opt]);
                                updateField("direction", opt);
                              }}
                            />
                            <span>{opt}</span>
                          </S.EditCheckboxItem>
                        );
                      })}
                    </S.EditCheckboxList>
                  </S.DirectionEditContainer>
                </S.Field>

                <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                  <S.Field style={{ flex: 1 }}>
                    <S.FieldLabel
                      theme={theme}
                      isEditing={isEditing}
                      isFocused={focusedField === "age"}
                    >
                      Возраст
                    </S.FieldLabel>
                    <S.Input
                      theme={theme}
                      isEditing={isEditing}
                      type="number"
                      min={14}
                      max={25}
                      value={form.age}
                      onFocus={() => setFocusedField("age")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "" || (+val >= 14 && +val <= 25)) {
                          updateField("age", val);
                        }
                      }}
                      style={{
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                        backgroundSize: "16px",
                        paddingRight: "40px",
                      }}
                    />
                  </S.Field>

                  <S.Field style={{ flex: 1, position: "relative" }}>
                    <S.FieldLabel
                      theme={theme}
                      isEditing={isEditing}
                      isFocused={focusedField === "course"}
                    >
                      Курс
                    </S.FieldLabel>
                    <S.Select
                      theme={theme}
                      isEditing={isEditing}
                      value={form.course}
                      onFocus={() => setFocusedField("course")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => updateField("course", e.target.value)}
                    >
                      <option value="">Выбери курс</option>
                      <option value="1">1 курс</option>
                      <option value="2">2 курс</option>
                      <option value="3">3 курс</option>
                      <option value="4">4 курс</option>
                    </S.Select>
                  </S.Field>
                </div>
              </>
            ) : (
              <>
                <S.AccountFullname>{form.fullName}</S.AccountFullname>
                <S.AccountMeta>
                  {form.age} лет — {form.direction} — {form.course}
                </S.AccountMeta>
              </>
            )}
          </S.AccountName>
        </S.AccountHeader>

        <S.Field>
          <S.WebsiteField>
            {isEditing && (
              <S.FieldLabel
                theme={theme}
                isEditing={isEditing}
                isFocused={focusedField === "website"}
              >
                Ссылка на портфолио
              </S.FieldLabel>
            )}
            <S.WebsiteInput
              theme={theme}
              isEditing={isEditing}
              placeholder="url"
              readOnly={!isEditing}
              value={
                isEditing ? form.portfolioLink : (form.portfolioLink ?? "")
              }
              onFocus={() => setFocusedField("website")}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => updateField("portfolioLink", e.target.value)}
              onClick={() => {
                if (!isEditing && form?.telegramLink) {
                  window.open(form.telegramLink, "_blank");
                }
              }}
            />
            {!isEditing && form.telegramLink && (
              <S.CopyButton
                theme={theme}
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    await navigator.clipboard.writeText(
                      form?.telegramLink || "",
                    );
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {isCopied ? <IconCop /> : <IconCopy />}
              </S.CopyButton>
            )}
          </S.WebsiteField>
        </S.Field>

        <div style={{ display: "grid", gap: "20px", marginTop: "16px" }}>
          {(["userName", "email", "phone"] as const).map((key) => (
            <S.Field key={key}>
              <S.FieldLabel
                theme={theme}
                isEditing={isEditing}
                isFocused={focusedField === key}
              >
                {key === "userName"
                  ? "Username"
                  : key === "email"
                    ? "Почта"
                    : "Телефон"}
              </S.FieldLabel>
              <S.Input
                theme={theme}
                isEditing={isEditing}
                readOnly={!isEditing}
                value={isEditing ? form[key] : (form[key] ?? "")}
                onFocus={() => setFocusedField(key)}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => updateField(key, e.target.value)}
              />
            </S.Field>
          ))}

          <S.Field>
            <S.FieldLabel
              theme={theme}
              isEditing={isEditing}
              isFocused={focusedField === "about"}
            >
              О себе
            </S.FieldLabel>
            <S.TextareaWrapper theme={theme} isEditing={isEditing}>
              <S.Textarea
                theme={theme}
                readOnly={!isEditing}
                value={isEditing ? form.description : (form.description ?? "")}
                onFocus={() => setFocusedField("about")}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </S.TextareaWrapper>
          </S.Field>
        </div>

        {isEditing ? (
          <S.Field>
            <S.FieldLabel theme={theme} isEditing={isEditing}>
              Стек технологий
            </S.FieldLabel>
            <S.TagsBox theme={theme}>
              {techTags.map((t) => (
                <S.TechTag theme={theme} key={t}>
                  #{t}
                  <S.RemoveTag
                    onClick={() =>
                      setTechTags((prev) => prev.filter((x) => x !== t))
                    }
                  >
                    ×
                  </S.RemoveTag>
                </S.TechTag>
              ))}
            </S.TagsBox>
            <S.Field style={{ marginTop: "30px" }}>
              <S.FieldLabel
                theme={theme}
                isEditing={isEditing}
                isFocused={focusedField === "techStack"}
              >
                Технология
              </S.FieldLabel>
              <S.TechInput
                theme={theme}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="1C"
                onFocus={() => setFocusedField("techStack")}
                onBlur={() => setFocusedField(null)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
                    e.preventDefault();
                    const val = tagInput.trim();
                    if (!techTags.includes(val)) {
                      setTechTags([...techTags, val]);
                    }
                    setTagInput("");
                  }
                }}
              />
            </S.Field>

            <S.AddButton
              type="button"
              onClick={() => {
                if (tagInput.trim()) {
                  const val = tagInput.trim();
                  if (!techTags.includes(val)) {
                    setTechTags([...techTags, val]);
                  }
                  setTagInput("");
                }
              }}
              disabled={!tagInput.trim()}
            >
              Добавить
            </S.AddButton>
          </S.Field>
        ) : (
          techTags.length > 0 && (
            <S.Field>
              <S.TagsBox theme={theme}>
                <S.FieldLabel theme={theme} isEditing={isEditing}>
                  Стек технологий
                </S.FieldLabel>
                <S.AccountTagsList>
                  {techTags.map((tag) => (
                    <S.AccountTag theme={theme} key={tag}>
                      #{tag}
                    </S.AccountTag>
                  ))}
                </S.AccountTagsList>
              </S.TagsBox>
            </S.Field>
          )
        )}
      </S.AccountCard>
    </S.AccountContainer>
  );
}));

export default Account;
