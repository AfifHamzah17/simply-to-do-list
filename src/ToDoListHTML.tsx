import React from 'react';

interface Props {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterOption: string;
    setFilterOption: (option: string) => void;
    filteredTodos: Item[];
    input: string;
    setInput: (input: string) => void;
    handleAdd: () => void;
    handleToggle: (id: number) => void;
    handleDelete: (id: number) => void;
    handleEdit: (id: number, newText: string) => void;
    handleDeadlineChange: (id: number, newDeadline: string) => void;
    handlePriorityToggle: (id: number) => void;
}

interface Item {
    id: number;
    text: string;
    completed: boolean;
    deadline: string;
    priority: boolean; 
}

const ToDoListHTML: React.FC<Props> = ({
    searchTerm,
    setSearchTerm,
    filterOption,
    setFilterOption,
    filteredTodos,
    input,
    setInput,
    handleAdd,
    handleToggle,
    handleDelete,
    handleEdit,
    handleDeadlineChange,
    handlePriorityToggle
}) => {
    return (
        <div className='main-container' style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Simply To-Do List</h1>
            <div className="search-container">
                <input
                    type='text'
                    placeholder='Search tasks...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <div className="dropdown">
                    <button className="dropbtn">{filterOption}</button>
                    <div className="dropdown-content">
                        <button onClick={() => setFilterOption("All Task")}>All Task</button>
                        <button onClick={() => setFilterOption("Completed Task")}>Completed Task</button>
                        <button onClick={() => setFilterOption("Uncompleted Task")}>Uncompleted Task</button>
                        <button onClick={() => setFilterOption("Task Priority")}>Task Priority</button>
                        <button onClick={() => setFilterOption("Task Date")}>Task Date</button>
                    </div>
                </div>
            </div>
            <ul>
                {filteredTodos.map(todo => (
                    <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ flex: '1' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggle(todo.id)}
                                />
                                <span style={{ textDecoration: todo.completed ? "line-through" : "none", marginLeft: '10px' }}>
                                    {todo.text}
                                </span>
                                <span
                                    style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '5px' }}
                                    onClick={() => handlePriorityToggle(todo.id)}
                                >
                                    {todo.priority ? "⭐️" : "☆"}
                                </span>
                            </div>
                            <div style={{ marginLeft: '10px', fontSize: '0.8em' }}>Deadline: {todo.deadline}</div>
                        </div>
                        <div>
                            <button className="delete-btn delete-btn-danger" onClick={() => handleDelete(todo.id)} style={{ padding: '8px 5px', marginRight: '5px' }}>
                                <span className="delete-icon">🗑️</span>
                            </button>
                            <button className="edit-btn" onClick={() => {
                                const newText = prompt("Edit task:", todo.text);
                                if (newText !== null) {
                                    handleEdit(todo.id, newText);
                                }
                            }} style={{ padding: '8px 5px' }}>
                                ✏️
                            </button>
                            <input
                                type="date"
                                onChange={(e) => handleDeadlineChange(todo.id, e.target.value)}
                                value={todo.deadline}
                                style={{ padding: '8px 5px', marginLeft: '5px', fontSize: '0.8em' }}
                            />
                        </div>
                    </li>
                ))}
            </ul>

            <input
                type='text'
                placeholder='Whatchu Wanna Do Today Folks?'
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                style={{ width: '100%', maxWidth: 'calc(100% - 20px)', padding: '10px', marginBottom: '10px' }}
            />
            <button onClick={handleAdd} style={{ padding: '10px' }}>Add</button>
        </div>
    );
}

export default ToDoListHTML;
