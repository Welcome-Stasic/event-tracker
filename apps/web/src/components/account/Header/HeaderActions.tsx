// import { IconEdit } from "../../../icon/icons";
// import * as S from "../../../styles/styles.AccountPage";

// interface HeaderActionsProps {
//   isEditing: boolean;
//   onEditStart: () => void;
//   onCancel: () => void;
//   onSave: () => void;
// }

// export const HeaderActions = ({
//   isEditing,
//   onEditStart,
//   onCancel,
//   onSave,
// }: HeaderActionsProps) => {
//   if (!isEditing) {
//     return (
//       <S.AccountHeaderActions>
//         <S.AccountAction onClick={onEditStart}>
//           <IconEdit />
//         </S.AccountAction>
//       </S.AccountHeaderActions>
//     );
//   }

//   return (
//     <S.AccountHeaderActions>
//       <S.AccountAction className="cancel" onClick={onCancel}>
//         ✕
//       </S.AccountAction>
//       <S.AccountAction className="save" onClick={onSave}>
//         ✓
//       </S.AccountAction>
//     </S.AccountHeaderActions>
//   );
// };
