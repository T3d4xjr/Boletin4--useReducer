import React, { useReducer } from 'react';

const initialState = {
  name: '',
  email: ''
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.cargar };
    case 'SET_EMAIL':
      return { ...state, email: action.cargar };
    case 'RESET_FORM':
      return { ...initialState };
    default:
      return state;
  }
}

function Formulario() {
  const [state, dispatch] = useReducer(formReducer, initialState);


  const handleNameChange = (event) => {
    dispatch({ type: 'SET_NAME', cargar: event.target.value });
  };

  const handleEmailChange = (event) => {
    dispatch({ type: 'SET_EMAIL', cargar: event.target.value });
  };


  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <div>
      <h2>Formulario</h2>
      <form>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={state.name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={state.email}
            onChange={handleEmailChange}
          />
        </div>
        <button type="button" onClick={handleReset}>
          Resetear
        </button>
      </form>
    </div>
  );
}

export default Formulario;
