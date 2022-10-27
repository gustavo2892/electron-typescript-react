import * as yup from 'yup';

export const loginUserFormSchema = yup.object().shape({
  username: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório').min(6, 'No mínimo 6 caracteres')
})

export const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
  password: yup.string().required('Campo obrigatório').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais'),
  gender: yup.string().required('Selecione uma opção'),
  description: yup.string().required('Campo obrigatório'),
  radio: yup.string().required('Selecione uma opção').nullable(),
  rememberMe: yup.boolean(),
  stringArray: yup.array().min(1, 'Selecione pelo menos uma opção').required('Campo obrigatório'),
  enableEmails: yup.boolean(),
  date: yup.string().required('Campo obrigatório').nullable(),
  textEditor: yup.string().test(
    "validation-default-value",
    "Campo obrigatório 2",
    function (value) {
      if (value === '<p></p>') {
        return false;
      }
      return true;
    }
  )
.required('Campo obrigatório')
});