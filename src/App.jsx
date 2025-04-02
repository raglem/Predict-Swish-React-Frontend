import react from "react"
import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Games from "./pages/Games"
import Predict from "./pages/Predict"
import Leagues from "./pages/Leagues"
import CreateLeague from "./pages/CreateLeague"
import UpdateLeague from "./pages/UpdateLeague"
import Notifications from "./pages/Notifications"
import ProtectedRoute from "./components/ProtectedRoute"

import { Flex } from "@chakra-ui/react"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <Flex direction="column" h="100vh" w="100vw" align="flexStart">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route 
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games"
            element={
              <ProtectedRoute>
                <Games />
              </ProtectedRoute>
            }
          />
          <Route
            path="/predict"
            element={
              <ProtectedRoute>
                <Predict />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leagues"
            element={
              <ProtectedRoute>
                <Leagues />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leagues/create"
            element={
              <ProtectedRoute>
                <CreateLeague />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leagues/update/:leagueId"
            element={
              <ProtectedRoute>
                <UpdateLeague />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <NotFound/>
            }
          />
        </Routes>
      </BrowserRouter>
    </Flex>
  )
}

export default App
