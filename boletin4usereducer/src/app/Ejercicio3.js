import { useReducer,useState } from "react";
export default function TaskApp() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    function handleAddTask(text) {
        dispatch({
            type: 'added',
            id: nextId++,
            text: text,
        });
    }

    function handleDeleteTask(taskId) {
        dispatch({
            type: 'deleted',
            id: taskId,
        });
    }

    function handleToggleTask(updatedTask) {
        dispatch({
            type: 'updated',
            task: updatedTask,
        });
    }

    return (
        <>
            <h1>Tareas.</h1>
            <AddTask onAddTask={handleAddTask} />
            <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onToggleTask={handleToggleTask} />
        </>
    );
}

function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'added': {
            return [
                ...tasks,
                {
                    id: action.id,
                    text: action.text,
                    done: false,
                },
            ];
        }
        case 'deleted': {
            return tasks.filter((t) => t.id !== action.id);
        }
        case 'updated': {
            return tasks.map((task) => (task.id === action.task.id ? action.task : task));
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

let nextId = 3;
const initialTasks = [
    { id: 0, text: 'Visitar el Museo Kafka', done: true },
    { id: 1, text: 'Ver espectáculo de títeres', done: false },
    { id: 2, text: 'Foto del muro de Lennon', done: false },
];

function AddTask({ onAddTask }) {
    const [text, setText] = useState('');
    return (
        <>
            <input
                placeholder="Agregar tarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                onClick={() => {
                    setText('');
                    onAddTask(text);
                }}>
                Agregar
            </button>
        </>
    );
}

function TaskList({ tasks, onDeleteTask, onToggleTask }) {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <Task task={task} onDelete={onDeleteTask} onChange={onToggleTask} />
                </li>
            ))}
        </ul>
    );
}

function Task({ task, onDelete, onChange }) {
    return (
        <label>
            <input
                type="checkbox"
                checked={task.done}
                onChange={(e) => {
                    onChange({
                        ...task,    
                        done: e.target.checked,
                    });
                }}
            />
            {task.text}
            <button onClick={() => onDelete(task.id)}>Borrar</button>
        </label>
    );
}
