import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Landing from './pages/public/Landing';
import Pricing from './pages/public/Pricing';
import Onboarding from './pages/public/Onboarding';
import SignIn from './pages/public/SignIn';
import Dashboard from './pages/Dashboard';
import ClientList from './pages/ClientList';
import ClientProfile from './pages/ClientProfile';
import AddCase from './pages/AddCase';
import InProgress from './pages/InProgress';
import ForReview from './pages/ForReview';
import Finalized from './pages/Finalized';
import Errors from './pages/Errors';
import Files from './pages/Files';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Authenticated App Routes */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<ClientList />} />
          <Route path="clients/:clientId" element={<ClientProfile />} />
          <Route path="add-case" element={<AddCase />} />
          <Route path="in-progress" element={<InProgress />} />
          <Route path="for-review" element={<ForReview />} />
          <Route path="finalized" element={<Finalized />} />
          <Route path="errors" element={<Errors />} />
          <Route path="files" element={<Files />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
