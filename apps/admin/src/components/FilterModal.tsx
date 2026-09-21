/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import type { Course, Direction, Project, UsersFilters } from "@repo/types";
import {
  DIRECTION_LABELS,
  PROJECT_LABELS,
  PROJECT_OPTIONS,
} from "@repo/types";

type FilterModalProps = {
  isOpen: boolean;
  value: UsersFilters;
  onClose: () => void;
  onApply: (filters: UsersFilters) => void;
};

const COURSE_OPTIONS: Course[] = [1, 2, 3, 4];
const DIRECTION_OPTIONS: Direction[] = [0, 1];

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.6);

  display: flex;
  align-items: flex-start;
  justify-content: flex-end;

  padding-top: 130px;
  padding-right: 40px;
`;

const ModalCard = styled.div`
  width: 350px;
  background: #ffffff;
  border: 1px solid #aad3ff;
  border-radius: 24px;
  padding: 20px;
  position: relative;
  right: 95px;
`;
const Columns = styled.div`
  display: flex;
  gap: 60px;
  align-items: flex-start;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background: transparent;
  font-size: 36px;
  line-height: 1;
  cursor: pointer;
  color: #1677ff;
`;

const Section = styled.div``;

const SectionTitle = styled.h3`
  margin: 0 0 10px;
  font-weight: 500;
  font-size: 16px;
  color: #000;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const OptionRow = styled.label`
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  font-size: 16px;
  color: #111827;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const CheckboxBox = styled.span<{ checked: boolean }>`
  width: 15px;
  height: 15px;
  border-radius: 4px;
  border: 1px solid #9ec5ff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #1677ff;
  font-size: 14px;
  flex-shrink: 0;
  background: #f7fbff;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
`;

const SecondaryButton = styled.button`
  min-width: 140px;
  height: 46px;
  border: 1px solid #cfd8e3;
  border-radius: 12px;
  background: #fff;
  color: #111827;
  font-size: 16px;
  cursor: pointer;
`;

const PrimaryButton = styled.button`
  min-width: 160px;
  height: 46px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(90deg, #7b8df8 0%, #1e88ff 100%);
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const checkMark = "✓";

const arraysEqual = <T,>(a: T[], b: T[]) =>
  a.length === b.length && a.every((item) => b.includes(item));

const toggleArrayValue = <T,>(list: T[], value: T): T[] => {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
};

const defaultFilters: UsersFilters = {
  projects: [],
  courses: [],
  directions: [],
};

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  value,
  onClose,
  onApply,
}) => {
  const [draft, setDraft] = useState<UsersFilters>(value);

  useEffect(() => {
    if (isOpen) {
      setDraft(value);
    }
  }, [isOpen, value]);

  if (!isOpen) {
    return null;
  }

  const handleToggleProject = (project: Project) => {
    setDraft((prev) => ({
      ...prev,
      projects: toggleArrayValue(prev.projects, project),
    }));
  };

  const handleToggleCourse = (course: Course) => {
    setDraft((prev) => ({
      ...prev,
      courses: toggleArrayValue(prev.courses, course),
    }));
  };

  const handleToggleDirection = (direction: Direction) => {
    setDraft((prev) => ({
      ...prev,
      directions: toggleArrayValue(prev.directions, direction),
    }));
  };

  const handleReset = () => {
    setDraft(defaultFilters);
  };

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  const isResetDisabled =
    arraysEqual(draft.projects, defaultFilters.projects) &&
    arraysEqual(draft.courses, defaultFilters.courses) &&
    arraysEqual(draft.directions, defaultFilters.directions);

  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <CloseButton type="button" onClick={onClose} aria-label="Закрыть">
          ×
        </CloseButton>

        <Columns>
          <Column>
            <Section>
              <SectionTitle>Проект</SectionTitle>

              <OptionsList>
                {PROJECT_OPTIONS.map((project) => {
                  const checked = draft.projects.includes(project);

                  return (
                    <OptionRow key={project}>
                      <HiddenCheckbox
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggleProject(project)}
                      />
                      <CheckboxBox checked={checked}>
                        {checked ? checkMark : null}
                      </CheckboxBox>
                      <span>{PROJECT_LABELS[project]}</span>
                    </OptionRow>
                  );
                })}
              </OptionsList>
            </Section>
            <Section>
              <SectionTitle>Направление</SectionTitle>

              <OptionsList>
                {DIRECTION_OPTIONS.map((direction) => {
                  const checked = draft.directions.includes(direction);

                  return (
                    <OptionRow key={direction}>
                      <HiddenCheckbox
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggleDirection(direction)}
                      />
                      <CheckboxBox checked={checked}>
                        {checked ? checkMark : null}
                      </CheckboxBox>
                      <span>{DIRECTION_LABELS[direction]}</span>
                    </OptionRow>
                  );
                })}
              </OptionsList>
            </Section>
          </Column>
          <Column>
            <Section>
              <SectionTitle>Курс</SectionTitle>

              <OptionsList>
                {COURSE_OPTIONS.map((course) => {
                  const checked = draft.courses.includes(course);

                  return (
                    <OptionRow key={course}>
                      <HiddenCheckbox
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggleCourse(course)}
                      />
                      <CheckboxBox checked={checked}>
                        {checked ? checkMark : null}
                      </CheckboxBox>
                      <span>{course}</span>
                    </OptionRow>
                  );
                })}
              </OptionsList>
            </Section>
          </Column>
        </Columns>

        <Footer>
          <SecondaryButton
            type="button"
            onClick={handleReset}
            disabled={isResetDisabled}
          >
            Сбросить
          </SecondaryButton>

          <PrimaryButton type="button" onClick={handleApply}>
            Применить
          </PrimaryButton>
        </Footer>
      </ModalCard>
    </Overlay>
  );
};

export default FilterModal;
