import { useParams } from "react-router-dom";
import { PageContainer } from "../../../styles/global";
import { HeaderEvent } from "./HeaderEvent";
import { FormSection } from "./FormSection";
import { Loader } from "../../loader";
import { useEventById } from "../../../hooks/events/useEventByID.ts";

export const FormEventPage = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = id ? true : false;
  const { data: event, isLoading } = useEventById(id || "");
  if (isLoading) return <Loader />;

  return (
    <PageContainer>
      <HeaderEvent
        title={isEdit ? "Редактирование ивента" : "Создание ивента"}
      />
      <FormSection key={id} data={event} />
    </PageContainer>
  );
};
