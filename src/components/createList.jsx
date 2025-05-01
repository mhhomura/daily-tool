import React from 'react';
/* import Button from 'react-bootstrap/Button'; */
import Modal from 'react-bootstrap/Modal';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import localforage from '../storage';
import Alert from '@mui/material/Alert';

import {
    Button,
    StyledModalContent,
    StyledModalHeader,
    StyledModalFooter
} from './styles'

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected || state.isFocused
            ? state.data.value
            : state.data.value,
        color: 'white',
        boxShadow: state.isFocused ? '0 0 0 2px rgba(255,255,255,0.5) inset' : 'none',
        cursor: 'pointer',
    }),
    singleValue: (provided, state) => ({
        ...provided,
        backgroundColor: state.data.value,
        color: 'white',
        padding: '4px 8px',
        borderRadius: 4,
    }),
    control: (base) => ({
        ...base,
        borderColor: '#ccc',
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#aaa',
        },
    }),
};


const CreateList = () => {

    const [show, setShow] = React.useState(false);
    const [themeMode, setThemeMode] = React.useState(localStorage.getItem('theme'));
    const [success, setSucces] = React.useState(false);

    const [list, setList] = React.useState({
        colorselected: null,
        listName: '',
        listDesc: '',
        id: null
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const colorOptions = [
        { value: '#2CD0FF', label: 'Cyan Blue' },
        { value: '#FFA630', label: 'Warm Orange' },
        { value: '#6C5CE7', label: 'Medium Purple' },
        { value: '#00B894', label: 'Aqua Green' },
        { value: '#FF6B6B', label: 'Coral Red' },
    ];

    const createList = async () => {
        if (!list?.listName || !list?.listDesc || !list?.colorselected) {
            alert("You’re so close! Don't make the form feel lonely.")
        } else {
            try {

                const index = await localforage.getItem('listIndex') || 0;
                await localforage.setItem('listIndex', index + 1);
                const updatedList = {
                    ...list,
                    id: `list_${index}`
                };
                await localforage.setItem(`list_${index}`, updatedList);
                setSucces(true);
                setTimeout(() => {
                    setSucces(false);
                }, 3000);
                handleClose();
                clear();

            } catch (error) {
                alert('Something went wrong. Even computers have their bad days');
            }
        }

    };

    const clear = () => {
        setList((prevState) => ({
            ...prevState,
            listDesc: '',
            listName: '',
            colorselected: null,
            id: null,

        }))
    }
    React.useEffect(() => {
        setThemeMode(localStorage.getItem('theme'));
    }, [localStorage.getItem('theme')])


    return (
        <>
            <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
                <Button onClick={handleShow}>
                    Create a new list
                </Button>

                <Modal
                    show={show}
                    onHide={handleClose}
                   /*  backdrop="static" */
                    keyboard={false}
                >
                    <StyledModalHeader>
                        <Modal.Title>Create a new List</Modal.Title>
                    </StyledModalHeader>
                    <StyledModalContent >
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="name" >List Name</Form.Label>
                                <Form.Control id="name" type="text" placeholder="Enter the list name" value={list?.listName}
                                    onChange={(e) => setList((prevState) => ({
                                        ...prevState,
                                        listName: e.target.value
                                    }))} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label htmlFor="desc" >List Description</Form.Label>
                                <Form.Control id="desc" type="text" placeholder="List description" value={list?.listDesc}
                                    onChange={(e) => setList((prevState) => ({
                                        ...prevState,
                                        listDesc: e.target.value
                                    }))} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="color" >List Color</Form.Label>
                                <Select
                                    id="color"
                                    options={colorOptions}
                                    styles={customStyles}
                                    onChange={(selectedOption) => setList((prevState) => ({
                                        ...prevState,
                                        colorselected: selectedOption
                                    }))}
                                    placeholder="Select list color"
                                />
                            </Form.Group>
                        </Form>
                    </StyledModalContent>
                    <StyledModalFooter>
                        <Button onClick={createList}>Create</Button>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                    </StyledModalFooter>
                    {success &&
                        <Alert severity="success">
                            You did it! Now your list is officially in the universe.
                        </Alert>}
                </Modal>
            </ThemeProvider>
        </>
    );
}

export default CreateList;