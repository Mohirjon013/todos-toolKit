import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo } from '../redtool/slices/crudSlice';




export default function CustomTable({ tHead, rows, setEditModal, setUpdateValue, setEditId}) {
    const todos = useSelector((state) => state.crud.todos)
    const dispatch = useDispatch()

    function handleEditClick(id){
        setEditModal(true)
        setEditId(id)
        const updateFind = todos.find(item => item.id === id)
        console.log(updateFind);
        
        setUpdateValue(updateFind.title)

    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
                <TableHead>

                    <TableRow>

                        {tHead.map(item => <TableCell align='center' key={item.id}>{item.title}</TableCell>)}
                        {/* <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody >
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align='center'>
                                {row.id}
                            </TableCell>
                            <TableCell component="th" scope="row" align='center'>
                                {row.title}
                            </TableCell>
                            <TableCell component="th" scope="row" align='right'>
                            <div className="flex justify-center">
                                <IconButton
                                    onClick={() => dispatch(deleteTodo(row.id))}
                                    size="medium"
                                    edge="start"
                                    color="error"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                >
                                    <DeleteIcon color='error'/>
                                </IconButton>
                                <IconButton
                                    onClick={() => handleEditClick(row.id)}
                                    size="medium"
                                    edge="start"
                                    color="success"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                >
                                    <EditIcon color='success'/>
                                </IconButton>
                            </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}