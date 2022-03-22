import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { JournalScreen } from "../Components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { login } from "../actions/auth";

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
        <Switch>
          <Route path={"/auth"} component={AuthRouter} />
          <Route exact path={"/"} component={JournalScreen} />

          <Redirect to={ '/auth/login' } />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
