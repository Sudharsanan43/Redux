import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const getTodosAsync = createAsyncThunk(
//     "todos/getTodosAsync",
//     async (_, { rejectWithValue }) => {
//         try {
//             const resp = await fetch("http://localhost:7000/todos");
//             if (!resp.ok) throw new Error("Failed to fetch todos");
//             const todos = await resp.json();
//             return { todos };
//         } catch (error) {
//             return rejectWithValue(error.message); // ✅ Handle errors properly
//         }
//     }
// );

export const getTodosAsync=createAsyncThunk(
    'todos/getTodosAsync',
    async()=>{
        const resp=await fetch('http://localhost:7000/todos');
        if(resp.ok){
            const todos=await resp.json();
            return {todos};
        }
    }


)

// Add new todo to API
export const addTodoAsync = createAsyncThunk(
    "todos/addTodoAsync",
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await fetch("http://localhost:7000/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: payload.title }),
            });

            if (!resp.ok) throw new Error("Failed to add todo");
            const todo = await resp.json();
            return { todo };
        } catch (error) {
            return rejectWithValue(error.message); // ✅ Handle errors properly
        }
    }
);

export const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [
            { id: 1, title: "todo1", completed: false },
            { id: 2, title: "todo2", completed: false },
            { id: 3, title: "todo3", completed: true },
            { id: 4, title: "todo4", completed: false },
            { id: 5, title: "todo5", completed: false },
        ],
        status: "idle", // ✅ Tracks loading state
        error: null, // ✅ Stores error messages
    },
    reducers: {
        addTodo: (state, action) => {
            if (!action.payload || !action.payload.title) return;
        
            state.todos.push({
                id: new Date().getTime(),
                title: action.payload.title.trim(),
                completed: false,
            });
        },
        toggleComplete: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index].completed = !state.todos[index].completed;
            }
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
           
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
            });
    }
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
