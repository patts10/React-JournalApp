import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { JournalScreen } from "../Components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRouter";
import { PrivateRoute } from "./PrivateRouter";

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [ checking, setChecking ] = useState(true);
  const [ logginIn, setLogginIn ] = useState(false)

  useEffect(() => {
    
    const auth = getAuth();
    onAuthStateChanged( auth, (user) => {
      console.log(user);
      if ( user?.uid ) {
        dispatch( login( user.uid, user.displayName ));
        setLogginIn(true);
      } else {
        setLogginIn(false);
      }
      setChecking(false);
    })
  
  }, [ dispatch, setChecking ]);

  if ( checking ) {
    return (
      <h1>Wait...</h1>
    )
  }
  

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/*" element={
            <PublicRoute isAuth={ logginIn }>
              <AuthRouter/>
            </PublicRoute>
          } />
          <Route path="/" element={
            <PrivateRoute  isAuth={ logginIn }>
              <JournalScreen />
            </PrivateRoute>
          } />

        </Routes>
      </div>
    </BrowserRouter>
  );
};
