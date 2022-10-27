import Login from './pages/Login';
import { AppContextProvider } from './context/AppContext';
import { ChakraProvider } from "@chakra-ui/react";
// import DefaultRoute from './routes';

import './i18n';

export function App() {
  return (
    <ChakraProvider>
      <AppContextProvider>
        <Login />
      </AppContextProvider>
    </ChakraProvider>
  )
}