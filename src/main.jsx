import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { Provider } from "@/components/ui/provider"
import { NotificationProvider} from "./components/Notification"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
    <NotificationProvider>
      <App />
    </NotificationProvider>,
    </Provider>
  </StrictMode>,
)
