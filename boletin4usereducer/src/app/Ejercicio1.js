import { useReducer } from "react";

export default function Contador() {
    const [contador, dispatch] = useReducer(contadorReducer, 0); 

    function incrementar() {
        dispatch({
            type: 'incrementar',
        });
    }

    function decrementar() {
        dispatch({
            type: 'decrementar',
        });
    }

    function reiniciar() {
        dispatch({
            type: 'reiniciar',
        });
    }

    return (
        <div>
            <p>Contador: {contador}</p>
            <button onClick={incrementar}>Incrementar</button>
            <button onClick={decrementar}>Decrementar</button>
            <button onClick={reiniciar}>Reiniciar</button>
        </div>
    );
}

function contadorReducer(contador, action) {
    switch (action.type) {
        case 'incrementar': {
            return contador + 1;
        }
        case 'decrementar': {
            return contador - 1;
        }
        case 'reiniciar': {
            return 0; 
        }
        default:
            return contador;
    }
}
