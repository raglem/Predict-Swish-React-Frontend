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
import Notifications from "./pages/Notifications"
import ProtectedRoute from "./components/ProtectedRoute"

import { Flex } from "@chakra-ui/react"
import { ACCESS_TOKEN } from "./constants"

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
            element={<Games />}
          />
          <Route
            path="/predict"
            element={<Predict />}
          />
          <Route
            path="/leagues"
            element={<Leagues />}
          />
          <Route
            path="/leagues/create"
            element={<CreateLeague />}
          />
          <Route
            path="/notifications"
            element={<Notifications />}
          />
        </Routes>
      </BrowserRouter>
    </Flex>
  )
}

export default App
