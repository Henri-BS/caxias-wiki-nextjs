import * as Yup from "yup";

export interface LoginForm {
  name: string;
  email: string;
  password: string;
  passwordMatch: string;
}

export const formSchema: LoginForm = {
  name: "",
  email: "",
  password: "",
  passwordMatch: "",
};

export const formValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("O campo email é obrigatório!")
    .email("Email inválido!"),

  name: Yup.string()
    .trim()
    .required("O campo nome é obrigatório!")
    .min(3, "O nome deve ter no mínimo 3 caracteres!")
    .max(50, "O nome deve ter no máximo 50 caracteres!"),

  password: Yup.string()
    .required("Selecione a imagem para enviar!")
    .min(8, "A senha deve ter no mínimo 8 caracteres!"),

  passwordMatch: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas devem ser iguais!")
});
