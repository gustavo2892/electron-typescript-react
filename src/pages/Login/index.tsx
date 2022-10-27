import { useEffect } from 'react';
import {
  SimpleGrid,
  Button,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as S from './styles'
import { Input } from '../../components/Form/Input'
import { Checkbox } from '../../components/Form/Checkbox'
import { loginUserFormSchema } from '../../schemas/user'
import useNavigation from '../../utils/useNavigation';
import { useAppContext } from '../../context/AppContext';
import { login } from '../../services/authentication.service';

export type LoginUserFormData = {
  username: string
  password: string
  keepConnected?: boolean;
}

const Login = () => {
  const { setAuthenticated, setLoggedUser, authenticated } = useAppContext();
  const nav = useNavigation();

  useEffect(() => {
    let mounted = true;
    if (authenticated && mounted) {
      nav.goBack();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const { register, handleSubmit, formState, control, reset } = useForm({
    resolver: yupResolver(loginUserFormSchema),
  })

  const handleLoginUser: SubmitHandler<LoginUserFormData> = async values => {
    login({ username: values.username.trim(), password: values.password.trim(), keepConnected: values.keepConnected })
      .then((user) => {
        setAuthenticated(true);
        setLoggedUser(user);
        nav.goToHome();
      })
      .catch(() => {
        reset();
      });
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
          nameForm="keepConnected"
          label="Manter conectado"
          control={control}
          {...register('keepConnected')}
        />
      </SimpleGrid>

      <SimpleGrid w="100%" mt="5">
        <Button
          type="submit"
          isLoading={formState.isSubmitting}
        >
          Acessar
        </Button>
      </SimpleGrid>
    </S.Wrapper>
  )
}

export default Login;
