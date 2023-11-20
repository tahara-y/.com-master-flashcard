import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';

function App() {
  return (
    <div className="App">
      <ChakraProvider toastOptions={{ defaultOptions: { position: 'top-right' } }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
