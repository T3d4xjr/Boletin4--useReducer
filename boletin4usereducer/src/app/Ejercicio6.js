import { useReducer, useState } from "react";

export default function UserManagementApp() {
    const [state, dispatch] = useReducer(userReducer, initialUsers);

    function handleAddUser(user) {
        dispatch({ type: 'add_user', user });
    }

    function handleUpdateUser(updatedUser) {
        dispatch({ type: 'update_user', user: updatedUser });
    }

    function handleDeleteUser(userId) {
        dispatch({ type: 'delete_user', id: userId });
    }

    function handleResetList() {
        dispatch({ type: 'reset_list' });
    }

    return (
        <>
            <h1>Gestión de Usuarios</h1>
            <AddUserForm onAddUser={handleAddUser} />
            <UserList
                users={state}
                onUpdateUser={handleUpdateUser}
                onDeleteUser={handleDeleteUser}
            />
            <button onClick={handleResetList}>Resetear Lista</button>
        </>
    );
}

function userReducer(state, action) {
    switch (action.type) {
        case 'add_user': {
            return [...state, { ...action.user, id: nextId++ }];
        }
        case 'update_user': {
            return state.map(user =>
                user.id === action.user.id ? { ...user, ...action.user } : user
            );
        }
        case 'delete_user': {
            return state.filter(user => user.id !== action.id);
        }
        case 'reset_list': {
            return initialUsers;
        }
        default: {
            throw new Error('Acción desconocida: ' + action.type);
        }
    }
}

let nextId = 4;
const initialUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

function AddUserForm({ onAddUser }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div>
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                onClick={() => {
                    if (name && email) {
                        onAddUser({ name, email });
                        setName('');
                        setEmail('');
                    }
                }}
            >
                Añadir Usuario
            </button>
        </div>
    );
}

function UserList({ users, onUpdateUser, onDeleteUser }) {
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    <EditableUser
                        user={user}
                        onUpdateUser={onUpdateUser}
                        onDeleteUser={onDeleteUser}
                    />
                </li>
            ))}
        </ul>
    );
}

function EditableUser({ user, onUpdateUser, onDeleteUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    return (
        <div>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            onUpdateUser({ id: user.id, name, email });
                            setIsEditing(false);
                        }}
                    >
                        Guardar
                    </button>
                </>
            ) : (
                <>
                    {user.name} ({user.email})
                    <button onClick={() => setIsEditing(true)}>Editar</button>
                </>
            )}
            <button onClick={() => onDeleteUser(user.id)}>Eliminar</button>
        </div>
    );
}
