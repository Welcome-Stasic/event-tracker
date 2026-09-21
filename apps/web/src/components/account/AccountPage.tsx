// import { observer } from "mobx-react-lite";
// import * as S from "../../styles/styles.AccountPage.ts";
// import { useNavigate } from "react-router-dom";
// import { useStore } from "../../store/storeProvider.tsx";

// const directionName: Record<number, string> = {
//   0: "Frontend",
//   1: "Backend",
//   2: "UX/UI",
// };

// const Account = observer(() => {
//   const navigate = useNavigate();
//   const { userStore } = useStore();
//   const updateUser = useUpdateUser();
//   const { data: avatarBlob } = useGetAvatar();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const data = userStore.user;
//   const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isCopied, setIsCopied] = useState(false);
//   return (
//     <S.AccountContainer isEditing={isEditing}>
//       <S.AccountCard></S.AccountCard>
//     </S.AccountContainer>
//   );
// });

// export default Account;
