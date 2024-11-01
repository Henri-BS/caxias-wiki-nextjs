import * as Yup from 'yup'

export interface LoginFormProps {
    name?: string;
    email: string;
    password: string;
    passwordMatch?: string;
}

export const loginFormSchema: LoginFormProps = { 
    email: '', 
    name: '', 
    password: '', 
    passwordMatch: '' 
}

export const loginValidationSchema  = Yup.object().shape({
    email: Yup.string().trim().required('Email é obrigatório!').email('Email inválido!'),
    password: Yup.string().required('A senha é obrigatória!').min(8, 'A senha deve ter no mínimo 8 caracteres!'),
    passwordMatch: Yup.string().oneOf( [Yup.ref('password')], 'As senhas não coincidem!' )
})


export interface WikiFormProps {
  name: string;
  description: string;
  tags: string;
  imageUrl: string;
}

export const wikiFormSchema: WikiFormProps = {
  name: "",
  description: "",
  tags: "",
  imageUrl: "",
};

export const wikiValidationSchema = Yup.object().shape({
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

export interface ImageFormProps {
  name: string;
  notes: string;
  file: string | Blob;
  wiki: string
}

export const imageFormSchema: ImageFormProps = {
  name: "",
  notes: "",
  file: "",
  wiki: ""
};

export const imageValidationSchema = Yup.object().shape({
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
