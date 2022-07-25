import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function AddBook(props) {

    const [open, setOpen] = useState(false);
    const [book, setBook] = useState({author: '', isbn: '', price: '', title: '', year: ''});

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setBook({author: '', isbn: '', price: '', title: '', year: ''})
    }

    const handleSave = () => {
        // If any of the text field is empty, alert will be send
        if (book.author.length && book.isbn.length && book.price.length && book.title.length && book.year.length != 0) {
            props.addBook(book);
            handleClose();
        }
        else {
            alert('Required data missing');
        }
    }

    const inputChanged = (event) => {
        setBook({...book, [event.target.name]: event.target.value});
    }

    return(
        <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                Add book
            </Button>
            <Dialog open={open}>
                <DialogTitle>New Book</DialogTitle>
                <DialogContent>
                    <TextField
                        name="author"
                        value={book.author}
                        onChange={inputChanged}
                        margin="dense"
                        label="Author"
                        fullWidth
                    />
                    <TextField
                        name="isbn"
                        value={book.isbn}
                        onChange={inputChanged}
                        margin="dense"
                        label="Isbn"
                        fullWidth
                    />
                    <TextField
                        name="price"
                        value={book.price}
                        onChange={inputChanged}
                        margin="dense"
                        label="Price"
                        fullWidth
                    />
                     <TextField
                        name="title"
                        value={book.title}
                        onChange={inputChanged}
                        margin="dense"
                        label="Title"
                        fullWidth
                    /> 
                    <TextField
                        name="year"
                        value={book.year}
                        onChange={inputChanged}
                        margin="dense"
                        label="Year"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default AddBook;