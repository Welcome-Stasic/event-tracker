// import * as S from "../../../styles/styles.AccountPage";

// interface FieldProps {
//   label: string;
//   value: string | number;
//   onChange?: (value: string) => void;
//   type?: "text" | "number" | "select" | "textarea";
//   options?: Array<{ value: string; label: string }>;
//   disabled?: boolean;
//   focused?: boolean;
//   onFocus?: () => void;
//   onBlur?: () => void;
//   isEditing: boolean;
//   placeholder?: string;
//   min?: number;
//   max?: number;
// }

// export const Field = ({
//   label,
//   value,
//   onChange,
//   type = "text",
//   options,
//   disabled,
//   focused,
//   onFocus,
//   onBlur,
//   isEditing,
//   placeholder,
//   min,
//   max,
// }: FieldProps) => {
//   return (
//     <S.Field>
//       <S.FieldLabel isEditing={isEditing} isFocused={focused}>
//         {label}
//       </S.FieldLabel>
//       {type === "select" ? (
//         <S.Select
//           isEditing={isEditing}
//           value={value}
//           onChange={(e) => onChange?.(e.target.value)}
//           onFocus={onFocus}
//           onBlur={onBlur}
//           disabled={disabled}
//         >
//           {options?.map((opt) => (
//             <option key={opt.value} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//         </S.Select>
//       ) : type === "textarea" ? (
//         <S.TextareaWrapper isEditing={isEditing}>
//           <S.Textarea
//             value={value}
//             onChange={(e) => onChange?.(e.target.value)}
//             onFocus={onFocus}
//             onBlur={onBlur}
//             disabled={disabled}
//             placeholder={placeholder}
//           />
//         </S.TextareaWrapper>
//       ) : (
//         <S.Input
//           isEditing={isEditing}
//           type={type}
//           value={value}
//           onChange={(e) => onChange?.(e.target.value)}
//           onFocus={onFocus}
//           onBlur={onBlur}
//           disabled={disabled}
//           placeholder={placeholder}
//           min={min}
//           max={max}
//         />
//       )}
//     </S.Field>
//   );
// };
