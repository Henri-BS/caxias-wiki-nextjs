import * as Yup from "yup";

export interface FormProps {
  name: string;
  description: string;
  tags: string;
  imageUrl: string;
}

export const formSchema: FormProps = {
  name: "",
  description: "",
  tags: "",
  imageUrl: "",
};

export const formValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("O campo nome é obrigatório!")
    .min(3, "O nome deve ter no mínimo 3 caracteres!")
    .max(50, "O nome deve ter no máximo 50 caracteres!"),

  tags: Yup.string()
    .trim()
    .required("A tag é obrigatória!")
    .max(100, "As Tags devem ter no máximo 100 caracteres"),
});
