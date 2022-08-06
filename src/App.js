import * as React from "react";
// styles
import "./global.css";
// Router
import { Routes, Route } from "react-router-dom";

// Component and pages
import {
  Home,
  EmailConfirm,
  Login,
  Register,
  TwitchGaming,
  YoutubeGaming,
  PrivacyPolicy,
  TermsAndConditions,
  MyProfile,
  AboutUs
} from "./pages";

import ProtectedRoute from "./ProtectedRoute";
import { GameDetails } from "./components";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Home />}>
          <Route path=":id" element={<GameDetails />} />
        </Route>

        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />

        <Route path="/twitch-gaming" element={<TwitchGaming />} />
        <Route path="/youtube-gaming" element={<YoutubeGaming />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/email-confirm" element={<EmailConfirm />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

        {/* Fallback route */}
        <Route path="*" element={<h2>Page doesn&apos;t exist</h2>} />
      </Routes>
    </div>
  );
}

export default App;
