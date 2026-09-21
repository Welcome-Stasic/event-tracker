import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import * as S from "../styles/styles.EventDetailPage";
import { Alert, Box } from "@mui/material";
import { useWebHaptics } from "web-haptics/react";
import { useStore } from "../store/storeProvider";
import { observer } from "mobx-react-lite";
import { useEvents } from "../hooks/events/useEvents.ts";
import { useAddEventUser } from "../hooks/events/useAddEventUser.ts";
import { useRemoveEventUser } from "../hooks/events/useRemoveEventUser.ts";
import { Loader } from "./loader";
import { useEventImage } from "../hooks/events/useEventImage.ts";
import { useAlert } from "../hooks/useAlert.ts";

const EventDetail = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { myEventsStore, themeStore } = useStore();
  const theme = themeStore.theme;
  const { trigger } = useWebHaptics();
  const [searchParams] = useSearchParams();
  const { data: events, isLoading } = useEvents();
  const eventItem = events?.find((e) => e.id === id);
  const addMutation = useAddEventUser();
  const removeMutation = useRemoveEventUser();
  const paramsMy = searchParams.get("from") === "my";
  const { data: firstImage } = useEventImage(id!, 1);
  const { alert, showAlert, closeAlert } = useAlert();
  const gradients: Record<string, string> = {
    События: "linear-gradient(180deg, #0099FF)",
    Олимпиада: "linear-gradient(180deg, #FF9500, #FFBD61)",
    Конкурс: "linear-gradient(180deg, #7378FF, #ACAFFF)",
    Стажировка: "linear-gradient(180deg, #787878, #161616)",
    Вакансия: "linear-gradient(135deg, #87C0FF, #007AFF)",
  };
  if (isLoading) return <Loader />;

  if (!eventItem) {
    return (
      <S.Container theme={theme} style={{ padding: 16 }}>
        <S.BackButton className="btn-event" onClick={() => navigate(-1)}>
          Назад
        </S.BackButton>
        <S.NotFound>Ивент не найден</S.NotFound>
      </S.Container>
    );
  }

  const gradient =
    gradients[eventItem.type] || "linear-gradient(135deg, #787878, #161616)";

  const isAdded = myEventsStore.isEventAdded(eventItem?.id);

  const handleToggle = () => {
    trigger();
    if (isAdded) {
      myEventsStore.removeEvents(eventItem.id);
      removeMutation.mutate(eventItem.id, {
        onSuccess: () => {
          showAlert(`Вы отписались от события ${eventItem.title}`, "success");
          setTimeout(() => navigate(-1), 1000);
        },
      });
    } else {
      myEventsStore.addEvents(eventItem);
      addMutation.mutate(eventItem.id);
      showAlert(`Успешно подписались на событие ${eventItem.title}`, "success");
    }
  };
  const btnText = () => {
    if (paramsMy) {
      return "Отписаться";
    }
    return isAdded ? "Уже участвуете" : "Участвовать";
  };
  const isBtnActive = () => {
    if (paramsMy) {
      return true;
    }
    if (!paramsMy && !isAdded) {
      return true;
    }
    return false;
  };

  const isDis =
    !isBtnActive() || addMutation.isPending || removeMutation.isPending;

  return (
    <S.Container theme={theme}>
      {alert.open && (
        <Box
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            right: 16,
            zIndex: 1300,
            maxWidth: "calc(100% - 32px)",
            animation: "slideDown 0.3s ease-in-out",
            "@keyframes slideDown": {
              from: {
                opacity: 0,
                transform: "translateY(-20px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <Alert
            onClose={closeAlert}
            icon={false}
            severity={alert.severity}
            variant="filled"
            sx={{
              animation: "slideDown 0.3s ease-in-out",
              backgroundColor:
                alert.severity === "success"
                  ? "#4CAF50"
                  : alert.severity === "error"
                    ? "#f44336"
                    : alert.severity === "warning"
                      ? "#ff9800"
                      : "#2196F3",
              color: "white",
              fontWeight: 500,
            }}
          >
            {alert.message}
          </Alert>
        </Box>
      )}
      <S.Header gradient={gradient} style={{ position: "relative" }}>
        {firstImage && (
          <img
            src={firstImage}
            alt="event header"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
            }}
          />
        )}
      </S.Header>
      <S.Grid>
        <S.Card>
          <S.Info theme={theme}>
            <S.Title>{eventItem.title}</S.Title>
            <S.ChipsRow>
              <S.Chip theme={theme} muted>
                c {eventItem.date}
              </S.Chip>
              <S.Chip theme={theme}>{eventItem.type}</S.Chip>
              {eventItem.tags?.map((tag) => (
                <S.Chip theme={theme} key={tag} muted>
                  {tag}
                </S.Chip>
              ))}
            </S.ChipsRow>
            <S.Description>{eventItem.description}</S.Description>
            <div style={{ display: "flex" }}>
              <S.CtaButton
                gradient={gradient}
                disabled={isDis}
                onClick={handleToggle}
              >
                {btnText()}
              </S.CtaButton>
            </div>
          </S.Info>
        </S.Card>
      </S.Grid>
    </S.Container>
  );
});

export default EventDetail;
