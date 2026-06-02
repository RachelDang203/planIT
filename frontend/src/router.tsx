import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import AddTaskAdvanced from './pages/AddTaskAdvanced';
import AddTaskBasic from './pages/AddTaskBasic';
import AIDetail from './pages/AIDetail';
import AILoading from './pages/AILoading';
import AIResult from './pages/AIResult';
import Calendar from './pages/Calendar';
import Dashboard from './pages/Dashboard';
import Deadlines from './pages/Deadlines';
import Login from './pages/Login';
import Notifications from './pages/Notifications';
import PasswordReset from './pages/PasswordReset';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import SignUp from './pages/SignUp';
import Success from './pages/Success';
import TaskDetail from './pages/TaskDetail';
import TaskList from './pages/TaskList';
import Welcome from './pages/Welcome';

type PlanITRoute = {
  path: string;
  element: JSX.Element;
};

export const routes: PlanITRoute[] = [
  { path: '/', element: <Welcome /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/login', element: <Login /> },
  { path: '/reset', element: <PasswordReset /> },
  { path: '/task/new', element: <AddTaskBasic /> },
  { path: '/task/new/more', element: <AddTaskAdvanced /> },
  { path: '/ai/loading', element: <AILoading /> },
  { path: '/ai/result', element: <AIResult /> },
  { path: '/ai/detail', element: <AIDetail /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/tasks', element: <TaskList /> },
  { path: '/tasks/:id', element: <TaskDetail /> },
  { path: '/progress', element: <Progress /> },
  { path: '/deadlines', element: <Deadlines /> },
  { path: '/calendar', element: <Calendar /> },
  { path: '/notifications', element: <Notifications /> },
  { path: '/settings', element: <Settings /> },
  { path: '/success', element: <Success /> },
];

export default function AppRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<AppLayout>{route.element}</AppLayout>}
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}