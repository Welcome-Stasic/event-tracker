// import { useEffect, useState } from "react";
// import { useGetAvatar } from "../../../hooks/useGetAvatar";
// import * as S from "../../../styles/styles.AccountPage";

// interface AvatarSectionProps {
//   isEditing: boolean;
//   onChangePhotoClick: () => void;
//   fullName: string;
//   telegramPhotoUrl?: string;
// }

// export const AvatarHeader = ({
//   isEditing,
//   onChangePhotoClick,
//   fullName,
//   telegramPhotoUrl,
// }: AvatarSectionProps) => {
//   const { data: avatarBlob } = useGetAvatar();
//   const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

//   useEffect(() => {
//     if (avatarBlob) {
//       const url = URL.createObjectURL(avatarBlob);
//       setAvatarUrl(url);
//       return () => URL.revokeObjectURL(url);
//     } else {
//       setAvatarUrl(null);
//     }
//   }, [avatarBlob]);

//   const photoUrl = telegramPhotoUrl || avatarUrl || undefined;

//   return (
//     <>
//       <S.AccountAvatarWrapper>
//         <S.AccountAvatar src={photoUrl} alt={fullName} />
//       </S.AccountAvatarWrapper>

//       {isEditing && (
//         <S.AccountChangePhoto onClick={onChangePhotoClick}>
//           Выбрать новую фотографию
//         </S.AccountChangePhoto>
//       )}
//     </>
//   );
// };
