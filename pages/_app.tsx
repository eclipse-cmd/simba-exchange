import "@assets/app.scss";
// import "@assets/js/bundle.js";
// import "@assets/js/scripts.js";
// import "@assets/js/libs/datatable-btns.js";
import Progress from "@components/Progress/Index";
import reducer from "@store/reducer";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { createContext, useEffect, useReducer, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InitialState, User } from "types";

//initial store state
const initialState = {
  users: null,
  auth: null,
  token: null,
  wallet: null
};

//context provider
export const AppContext = createContext<{
  state: InitialState,
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

function MyApp({ Component, pageProps }: AppProps) {
  const
    [state, dispatch] = useReducer(reducer, initialState),
    [isAnimating, setIsAnimating] = useState<boolean>(false),
    router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeError", handleStop);
    router.events.on("routeChangeComplete", handleStop);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeError", handleStop);
      router.events.off("routeChangeComplete", handleStop);
    };
  }, [router]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ToastContainer position="bottom-center" autoClose={10000} hideProgressBar={false} limit={2} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Progress isAnimating={isAnimating} />
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;