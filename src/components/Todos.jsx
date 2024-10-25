import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, updateTodo } from '../redtool/slices/crudSlice'
import CustomTable from './CustomTable'
import CustomModal from './CustomModal'

function Todos() {
    const todos = useSelector((state) => state.crud.todos)
    const dispatch = useDispatch()
    const [todoValue, setTodoValue] = useState("")

    const [editModal, setEditModal] = useState(false)
    const [updateValue, setUpdateValue] = useState("")
    const [editId, setEditId] = useState(null)

    const tableHeadValue = [
        {
            id:1,
            title:"ID",
        },
        {
            id:2,
            title:"Task",
            
        },
        {
            id:3,
            title:"Action",
        }
    ]

    function handleSubmit(e){
        e.preventDefault()
        const data = {
            id:todos.length ? todos[todos.length - 1].id + 1 : 1,
            title:todoValue
        }
        dispatch(addTodo(data))
        setTodoValue("")
    }

    function handleUpdateBtn(e){
        e.preventDefault()
        console.log("salom");
        
        setEditModal(false)
        dispatch(updateTodo({id:editId, title:updateValue}))
        // console.log(dispatch(updateTodo({id:editId, title:updateValue})));
        
        
    }
    return (
        <>
            <form onSubmit={handleSubmit} autoComplete='off' className='w-[400px] mx-auto mt-7 flex gap-3 items-center'>
                <TextField size='small' className='w-full' value={todoValue} onChange={(e) => setTodoValue(e.target.value)} variant='outlined' type='text' label='Add todo' ></TextField>
                <Button size='medium' className='py-7.5' type='submit'variant='contained' >Submit</Button>
            </form>
            <div className="w-[500px] mx-auto mt-10 ">
                {/* {todos && todos.map(item => (
                    <div key={item.id} className='flex gap-3'>
                        <p>{item.id}</p>
                        <p>{item.title}</p>
                    </div>
                ))} */}
                <CustomTable tHead={tableHeadValue} rows={todos} setUpdateValue={setUpdateValue} setEditId={setEditId} setEditModal={setEditModal}/>
            </div>
            <CustomModal open={editModal} setOpen={setEditModal}>
                <form onSubmit={handleUpdateBtn}  className='flex items-center gap-2'>
                    <TextField value={updateValue || ""} onChange={(e) => setUpdateValue(e.target.value)} variant='outlined' size='small' sx={{width:"100%"}} id="outlined-basic" type='text' label="Update todos" />
                    <Button size='medium' className='py-7.5' type='submit'variant='contained' >Update</Button>
                </form> 
            </CustomModal>
        </>
    )
}

export default Todos
