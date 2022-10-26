import Greetings from './components/Greetings'
import { AppContextProvider } from './context/AppContext';
import { ChakraProvider } from "@chakra-ui/react";

import './i18n';

export function App() {
  return (
    <ChakraProvider>
      <AppContextProvider>
        <Greetings />
      </AppContextProvider>
    </ChakraProvider>
  )
}