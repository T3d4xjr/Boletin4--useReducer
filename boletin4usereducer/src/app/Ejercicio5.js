import { useReducer, useState } from "react";

export default function UserFilterApp() {
    const [state, dispatch] = useReducer(filterReducer, { users: initialUsers, query: '', filteredUsers: initialUsers });

    function handleSearch(query) {
        dispatch({
            type: 'searched',
            query,  
        });
    }

    return (
        <>
            <h1>Filtro de Usuarios</h1>
            <SearchBox query={state.query} onSearch={handleSearch} />
            <UserList users={state.filteredUsers} />
        </>
    );
}

function filterReducer(state, action) {
    switch (action.type) {
        case 'searched': {
            const query = action.query.toLowerCase();
            return {
                ...state,
                query,
                filteredUsers: state.users.filter(
                    (user) =>
                        user.name.toLowerCase().includes(query) ||
                        user.email.toLowerCase().includes(query)
                ),
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

function SearchBox({ query, onSearch }) {
    return (
        <input
            placeholder="Buscar por nombre o email"
            value={query}
            onChange={(e) => onSearch(e.target.value)}
        />
    );
}

function UserList({ users }) {
    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    {user.name} ({user.email})
                </li>
            ))}
        </ul>
    );
}
