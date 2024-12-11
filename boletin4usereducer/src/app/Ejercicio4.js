import { useReducer, useState } from "react";

export default function CartApp() {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    function handleAddProduct(product) {
        dispatch({
            type: 'added',
            product,
        });
    }

    function handleIncrementProduct(productId) {
        dispatch({
            type: 'incremented',
            id: productId,
        });
    }

    function handleDecrementProduct(productId) {
        dispatch({
            type: 'decremented',
            id: productId,
        });
    }

    function handleRemoveProduct(productId) {
        dispatch({
            type: 'removed',
            id: productId,
        });
    }

    return (
        <>
            <h1>Carrito de Compras</h1>
            <AddProduct onAddProduct={handleAddProduct} />
            <CartList
                cart={cart}
                onIncrementProduct={handleIncrementProduct}
                onDecrementProduct={handleDecrementProduct}
                onRemoveProduct={handleRemoveProduct}
            />
        </>
    );
}

function cartReducer(cart, action) {
    switch (action.type) {
        case 'added': {
            const existingProduct = cart.find((item) => item.id === action.product.id);
            if (existingProduct) {
                return cart.map((item) =>
                    item.id === action.product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...cart, { ...action.product, quantity: 1 }];
        }
        case 'incremented': {
            return cart.map((item) =>
                item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        }
        case 'decremented': {
            return cart.map((item) =>
                item.id === action.id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        }
        case 'removed': {
            return cart.filter((item) => item.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

let nextId = 1;
const initialCart = [];

function AddProduct({ onAddProduct }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    return (
        <>
            <input
                placeholder="Nombre del producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Precio"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button
                onClick={() => {
                    if (name && price) {
                        onAddProduct({ id: nextId++, name, price: parseFloat(price) });
                        setName('');
                        setPrice('');
                    }
                }}
            >
                Agregar Producto
            </button>
        </>
    );
}

function CartList({ cart, onIncrementProduct, onDecrementProduct, onRemoveProduct }) {
    return (
        <ul>
            {cart.map((item) => (
                <li key={item.id}>
                    {item.name} - {item.price}€  x {item.quantity}
                    <button onClick={() => onIncrementProduct(item.id)}>+</button>
                    <button onClick={() => onDecrementProduct(item.id)}>-</button>
                    <button onClick={() => onRemoveProduct(item.id)}>Eliminar</button>
                </li>
            ))}
           
        </ul>
    );
}
