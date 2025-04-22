import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'


function AddTodo(props) {
    const [open, setOpen] = useState(false);
    const [todo, setTodo] = useState({ description: '', date: '', priority: '' })

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = () => {
        props.addTodo(todo);
        setTodo({ description: '', date: '', priority: '' })
        handleClose()
    }

    const inputChanged = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Button variant='outlined' onClick={handleOpen}>
                Add todo
            </Button>
            <Dialog open={open}>
                <DialogTitle>New todo</DialogTitle>
                <DialogContent>
                    <TextField
                        name='description'
                        value={todo.description}
                        onChange={inputChanged}
                        margin='dense'
                        label="Description"
                        fullWidth
                    />
                    <TextField
                        name='date'
                        value={todo.date}
                        onChange={inputChanged}
                        margin='dense'
                        label="Date"
                        fullWidth
                    />
                    <TextField
                        name='priority'
                        value={todo.priority}
                        onChange={inputChanged}
                        margin='dense'
                        label="Priority"
                        fullWidth
                    />


                </DialogContent>
                <DialogActions>
                    <Button color='primary' onClick={handleClose}>Cancel</Button>
                    <Button color='primary' onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddTodo