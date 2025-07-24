import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChakraProvider ,extendTheme } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import { GraphProvider } from './context/graphcontext.jsx'
const theme = extendTheme({})
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <ChakraProvider theme={theme}>
      <GraphProvider>
    <App />
    </GraphProvider></ChakraProvider>
  </StrictMode></BrowserRouter>,
)