import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./app.css";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { EmailConfirmation } from "./pages/EmailConfirmation";
import { Home } from "./pages/Home";
import { AuthLayout } from "./layouts/Auth.layout";
import { EmailVerification } from "./pages/EmailVerification";

export function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/confirmation" element={<EmailConfirmation />} />
          <Route path="/verify-email" element={<EmailVerification />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}
