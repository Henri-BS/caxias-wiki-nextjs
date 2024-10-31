import * as Yup from "yup";

export interface FormProps {
  name: string;
  notes: string;
  file: string | Blob;
  wiki: string
}

export const formSchema: FormProps = {
  name: "",
  notes: "",
  file: "",
  wiki: ""
};

export const formValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("O campo nome é obrigatório!")
    .min(3, "O nome deve ter no mínimo 3 caracteres!")
    .max(50, "O nome deve ter no máximo 50 caracteres!"),

  file: Yup.mixed<Blob>()
    .required("Selecione a imagem para enviar!")
    .test("size", "O arquivo não pode ser maior que 5 MB", (file) => {
      return file.size < 5000000;
    })
    .test("type", "Formatos permitidos: jpeg, gif or png", (file) => {
      return (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif"
      );
    }),
});
