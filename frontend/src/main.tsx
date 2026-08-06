import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


//Lang
import "@/i18n/langConfig";
//context
import { SidebarProvider } from '@/context/SidebarContext'
import { ModalOpenedContextProvider } from "@/context/ModalOpenedContext";
import { ThemeProvider } from "@/context/ThemeContext";

createRoot(document.getElementById('root')!).render(

    <StrictMode>

        <SidebarProvider>
           <ModalOpenedContextProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </ModalOpenedContextProvider>
          </SidebarProvider>

    </StrictMode>,

)