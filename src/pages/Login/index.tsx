import {
  SimpleGrid,
  Button,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import * as S from './styles'
import { Input } from '../../components/Form/Input'
import { Checkbox } from '../../components/Form/Checkbox'
import { loginUserFormSchema } from '../../schemas/user'
import useNavigation from '../../utils/useNavigation';

export type LoginUserFormData = {
  username: string
  password: string
}

const Login = () => {
  const nav = useNavigation();

  const { register, handleSubmit, formState, control } = useForm({
    resolver: yupResolver(loginUserFormSchema),
  })

  const handleLoginUser: SubmitHandler<LoginUserFormData> = async values => {
    console.log('Values => ', values);
    nav.goToHome();
  }
  return (
    <S.Wrapper as="form" onSubmit={handleSubmit(handleLoginUser)} padding="0">
      <SimpleGrid w="100%">
        <Input
          nameForm="username"
          placeholder="Usuário"
          {...register('username')}
          error={formState.errors.username}
        />
      </SimpleGrid>
      <SimpleGrid w="100%" mt="4">
        <Input
          nameForm="password"
          type="password"
          placeholder="Senha"
          {...register('password')}
          error={formState.errors.password}
        />
      </SimpleGrid>
      <SimpleGrid w="100%" mt="5">
        <Checkbox
          nameForm="rememberMe"
          label="Manter conectado"
          control={control}
          {...register('rememberMe')}
        />
      </SimpleGrid>

      <SimpleGrid w="100%" mt="5">
        <Button
          colorScheme="blue"
          type="submit"
          isLoading={formState.isSubmitting}
        >
          Acessar
        </Button>
      </SimpleGrid>
    </S.Wrapper>
  )
}

export default Login
