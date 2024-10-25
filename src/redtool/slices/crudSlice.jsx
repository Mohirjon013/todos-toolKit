import { createSlice } from "@reduxjs/toolkit";

export const crudSlices = createSlice({
    initialState: {
        todos:[]
    },
    name:"crud",
    reducers:{
        addTodo: (state, action) => {
            state.todos.push(action.payload)
            // [...state.todos, action.payload]
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id!==action.payload)
        },
        updateTodo: (state, action) => {
            const updateTodo  = state.todos.find(todo => todo.id === action.payload.id)
            if(updateTodo){
                updateTodo.title = action.payload.title
            }
        }
    }

})
export const { addTodo, deleteTodo, updateTodo } = crudSlices.actions

export default crudSlices.reducer