import { AppContextProvider } from './context/AppContext';
import { ChakraProvider } from "@chakra-ui/react";
import DefaultRoute from './routes';
import { theme } from './styles/theme';

import './i18n';

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppContextProvider>
        <DefaultRoute />
      </AppContextProvider>
    </ChakraProvider>
  )
}