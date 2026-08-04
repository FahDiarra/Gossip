import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { SidebarProvider } from '@/context/SidebarContext'
import { ModalOpenedContextProvider } from "@/context/ModalOpenedContext";

createRoot(document.getElementById('root')!).render(

    <StrictMode>

        <SidebarProvider>
           <ModalOpenedContextProvider>
               <App />
         </ModalOpenedContextProvider>
        </SidebarProvider>

    </StrictMode>,

)