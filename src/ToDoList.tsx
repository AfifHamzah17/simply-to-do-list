import React, { useState, useEffect } from 'react';
import ToDoListHTML from './ToDoListHTML';

interface Item {
    id: number;
    text: string;
    completed: boolean;
    deadline: string;
    priority: boolean;
}

const ToDoList: React.FC = () => {
    const [todos, setTodos] = useState<Item[]>(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const [input, setInput] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filterOption, setFilterOption] = useState<string>("All Task");

    const handleAdd = () => {
        if (input.trim() !== "") {
            const today = new Date();
            const todayString = today.toISOString().split('T')[0];
    
            if (new Date(todayString) > new Date()) {
                alert("Deadline tidak bisa kurang dari hari ini!");
                return;
            }
    
            const newTodo: Item = { id: Date.now(), text: input, completed: false, deadline: todayString, priority: false };
            setTodos([...todos, newTodo]);
            setInput("");
        }
    }

    const handleToggle = (id: number) => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })
        );
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const handleEdit = (id: number, newText: string) => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, text: newText };
                }
                return todo;
            })
        );
    }

    const handleDeadlineChange = (id: number, newDeadline: string) => {
        if (new Date(newDeadline) < new Date()) {
            alert("Deadline tidak bisa kurang dari hari ini!");
            return;
        }

        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, deadline: newDeadline };
                }
                return todo;
            })
        );
    }

    const handlePriorityToggle = (id: number) => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, priority: !todo.priority };
                }
                return todo;
            })
        );
    }

    const filteredTodos = todos.filter(todo => {
        if (filterOption === "Completed Task") {
            return todo.completed;
        } else if (filterOption === "Uncompleted Task") {
            return !todo.completed;
        } else if (filterOption === "Task Priority") {
            return todo.priority;
        } else if (filterOption === "Task Date") {
            return true;
        } else {
            return true;
        }
    }).filter(todo => {
        return todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    }).filter(todo => {
        if (filterOption === "Task Priority") {
            return todo.priority;
        } else {
            return true;
        }
    }).sort((a, b) => {
        if (filterOption === "Task Date") {
            const deadlineDifference = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
            if (deadlineDifference !== 0) {
                return deadlineDifference;
            }
        }
        if (a.priority && !b.priority) return -1;
        if (!a.priority && b.priority) return 1;
        return 0;
    });

    return (
        <ToDoListHTML
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterOption={filterOption}
            setFilterOption={setFilterOption}
            filteredTodos={filteredTodos}
            input={input}
            setInput={setInput}
            handleAdd={handleAdd}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleDeadlineChange={handleDeadlineChange}
            handlePriorityToggle={handlePriorityToggle}
        />
    );
}

export default ToDoList;
