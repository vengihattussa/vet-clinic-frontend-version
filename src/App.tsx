import {useMemo} from "react";
import {isAuthenticated} from "./hooks/storage";
import HomePage from "./pages";
import Login from "./pages/Login";
import Provider from "./provider";
import {useAuth} from "./store";
import {useAppointment} from "./store/auth/appointment";
import "./style/index.css";
import Appointment from "./pages/WorkWith/Appointment";

const App = () => {
  const {isAuth} = useAuth();

  const {isAppointment} = useAppointment();

  const component = useMemo(() => {
    if (isAppointment) {
      return <Appointment />;
    }
    return <HomePage />;
  }, [isAppointment]);

  return <Provider>{isAuth || isAuthenticated() ? component : <Login />}</Provider>;
};

export default App;
