import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ✅ Get all todos (Protected Route)
export const getTodosAsync = createAsyncThunk(
    "todos/getTodosAsync",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token; // Get JWT token from Redux store
            const resp = await fetch("http://localhost:5000/api/todos", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`, // ✅ Attach token for authentication
                },
            });

            if (!resp.ok) throw new Error("Failed to fetch todos");
            const todos = await resp.json();
            return { todos };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ✅ Add new todo (Protected Route)
export const addTodoAsync = createAsyncThunk(
    "todos/addTodoAsync",
    async (payload, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const resp = await fetch("http://localhost:5000/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title: payload.title }),
            });

            if (!resp.ok) throw new Error("Failed to add todo");
            const todo = await resp.json();
            return { todo };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ✅ Toggle Todo Completion
export const toggleTodoAsync = createAsyncThunk(
    "todos/toggleTodoAsync",
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const resp = await fetch(`http://localhost:5000/api/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!resp.ok) throw new Error("Failed to toggle todo");
            const updatedTodo = await resp.json();
            return { updatedTodo };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ✅ Delete Todo
export const deleteTodoAsync = createAsyncThunk(
    "todos/deleteTodoAsync",
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            const resp = await fetch(`http://localhost:5000/api/todos/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!resp.ok) throw new Error("Failed to delete todo");
            return { id };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        status: "idle", // Tracks loading state
        error: null, // Stores error messages
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Fetch Todos
            .addCase(getTodosAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.todos = action.payload.todos;
            })
            .addCase(getTodosAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // ✅ Add Todo
            .addCase(addTodoAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.todos.push(action.payload.todo);
            })
            .addCase(addTodoAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // ✅ Toggle Todo Completion
            .addCase(toggleTodoAsync.fulfilled, (state, action) => {
                const index = state.todos.findIndex(todo => todo._id === action.payload.updatedTodo._id);
                if (index !== -1) {
                    state.todos[index].completed = action.payload.updatedTodo.completed;
                }
            })
            .addCase(toggleTodoAsync.rejected, (state, action) => {
                state.error = action.payload;
            })

            // ✅ Delete Todo
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo._id !== action.payload.id);
            })
            .addCase(deleteTodoAsync.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export default todoSlice.reducer;
