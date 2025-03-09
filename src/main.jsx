import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { Provider } from "@/components/ui/provider"
import { NotificationProvider} from "./components/Notification"
import { UserProvider } from './context/CurrentUser.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <UserProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </UserProvider>
    </Provider>
  </StrictMode>,
)
