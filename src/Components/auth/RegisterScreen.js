import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startWithRegisterEmailPasswordName } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';

import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { msgError } = useSelector( state => state.ui )


  const [ formValues, handleInputChange ] = useForm({
    name: 'Patts',
    email: 'patts@gmail.com',
    password: '123456',
    password2: '123456'
  });
  
  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if ( isFormValid() ) {
      dispatch(startWithRegisterEmailPasswordName( name, email, password ));
    }
    
  } 

  const isFormValid = () => {

    if ( name.trim().length === 0 ) {
      dispatch(setError('Name is required'));
      return false;
    } else if ( !validator.isEmail( email )) {
      dispatch(setError('Email is not valid'));
      return false;
    } else if ( password !== password2 || password.length < 6 ) {
      dispatch(setError('Password should be at least 6 characters and match each other'));
      return false;
    }
    dispatch(removeError());
    return true;
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={ handleRegister }>

        {
          msgError &&
        (<div className='auth__alert-error'>
          { msgError }
        </div>)
        }

        <input
          type="text"
          placeholder="name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={ name }
          onChange={ handleInputChange }
        />

        <input
          type="text"
          placeholder="email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={ email }
          onChange={ handleInputChange }
        />

        <input
          type="password"
          placeholder="password"
          name="password"
          className="auth__input"
          value={ password }
          onChange={ handleInputChange }
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={ password2 }
          onChange={ handleInputChange }
        />

        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </button>

        <Link to={"/auth/register"} className="link">
          Already registered?
        </Link>
      </form>
    </>
  )
}
