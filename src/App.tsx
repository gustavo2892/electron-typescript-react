import { MemoryRouter as Router } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import { ChakraProvider } from "@chakra-ui/react";
import DefaultRoute from './routes';

import './i18n';

export function App() {
  return (
    <ChakraProvider>
      <AppContextProvider>
        <Router>
          <DefaultRoute />
        </Router>
      </AppContextProvider>
    </ChakraProvider>
  )
}