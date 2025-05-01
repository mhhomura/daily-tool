import React from 'react';
/* import Button from 'react-bootstrap/Button'; */
import Modal from 'react-bootstrap/Modal';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import Form from 'react-bootstrap/Form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import localforage from '../storage';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import {
    Button,
    StyledModalContent,
    StyledModalHeader,
    StyledModalFooter,
    Stripe
} from './styles'
import CheckboxList from './taskItens';


const TaskList = ({ lists, children, deleteList }) => {

    const [show, setShow] = React.useState(false);
    const [themeMode, setThemeMode] = React.useState(localStorage.getItem('theme'));
    const [success, setSucces] = React.useState(false);
    const [deleted, setDeleted] = React.useState(false);
    const [listOfTasks, setListOfTasks] = React.useState(lists.tasks);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [tasklist, setTaskList] = React.useState({
        text: '',
        completed: false,
        id: null
    });

    const createTask = async () => {
        if (!tasklist?.text) {
            alert("You’re so close! Don't make the form feel lonely.")
        } else {
            try {
                const existingList = await localforage.getItem(lists?.id);
                if (!existingList) {
                    alert("Oops! The list doesn't exist.");
                    return;
                }
                const taskIndex = existingList.taskIndex || 0;
                const updatedTask = {
                    ...tasklist,
                    id: `task_${taskIndex}`
                };
                const updatedList = {
                    ...existingList,
                    taskIndex: taskIndex + 1,
                    tasks: [...(existingList.tasks || []), updatedTask]
                };

                await localforage.setItem(lists.id, updatedList);

                setSucces(true);
                setTimeout(() => setSucces(false), 3000);
                const tasksLi = await localforage.getItem(lists?.id);
                setListOfTasks(tasksLi?.tasks)
                clear();

            } catch (error) {
                alert('Something went wrong. Even computers have their bad days');
            }
        }

    };

    const deleteTask = async (taskId) => {
        try {
            const existingList = await localforage.getItem(lists?.id);
            if (!existingList || !existingList.tasks) return;

            const updatedTasks = existingList.tasks
                .filter(task => task.id !== taskId)
                .map((task, index) => ({
                    ...task,
                    id: `task_${index}`
                }));
            const updatedList = {
                ...existingList,
                tasks: updatedTasks,
                taskIndex: updatedTasks.length
            };

            await localforage.setItem(lists.id, updatedList);
            setListOfTasks(updatedTasks);
            setDeleted(true);
            setTimeout(() => {
                setDeleted(false)
            }, 3000);
        } catch (error) {
            alert('Something went wrong while deleting the task.');
        }
    };

    const completeTask = async (taskId) => {
        try {
            const existingList = await localforage.getItem(lists?.id);
            if (!existingList || !existingList.tasks) return;

            const updatedTasks = existingList.tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            );

            const updatedList = {
                ...existingList,
                tasks: updatedTasks
            };

            await localforage.setItem(lists.id, updatedList);
            setListOfTasks(updatedTasks);
        } catch (error) {
            alert('Something went wrong while deleting the task.');
        }
    };

    const clear = () => {
        setTaskList((prevState) => ({
            ...prevState,
            text: '',
            id: null,
        }))
    }
    React.useEffect(() => {
        setThemeMode(localStorage.getItem('theme'));
    }, [localStorage.getItem('theme')])

    /* 
        React.useEffect(() => {
            if (lists?.id) {
                const task = localforage.getItem(lists?.id);
                setListOfTasks(task?.tasks)
            }
        }, []) */
    /* Criar a pagina com a lista de tarefa, ao clicar no card da lista, abre a lista de task, pensar em como fazer isso
    ver pra implementar a questão de arrastar e soltar igual o trello. */


    return (
        <>
            <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
                <div onClick={handleShow}>
                    {children}
                </div>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                >
                    <Stripe $bgcolor={lists?.colorselected?.value} style={{ borderRadius: '6px 6px 0px 0px' }} />
                    <StyledModalHeader style={{ borderRadius: '0px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <Modal.Title>{lists?.listName}</Modal.Title>
                                <small>{lists?.listDesc}</small>
                            </div>
                            <div>
                                <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                    </StyledModalHeader>
                    <StyledModalContent >
                        <CheckboxList list={listOfTasks} onDelete={deleteTask} check={completeTask} setList={setListOfTasks} listId={lists?.id}/>
                        <Form>
                            <Form.Group className="mb-3" htmlFor="task" style={{ paddingTop: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Form.Control type="text" id='task' placeholder="New item" value={tasklist.text}
                                        onChange={(e) => setTaskList((prevState) => ({
                                            ...prevState,
                                            text: e.target.value
                                        }))} 
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                createTask();
                                            }
                                        }}/>
                                    <AddCircleIcon sx={{ cursor: 'pointer' }} onClick={createTask} />
                                </div>
                            </Form.Group>
                        </Form>
                    </StyledModalContent>
                    <StyledModalFooter>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteList(lists?.id)} />
                        </IconButton>
                    </StyledModalFooter>
                    {success &&
                        <Alert severity="success">
                            You did it! Now you have more things to do!.
                        </Alert>}
                    {deleted &&
                        <Alert severity="success">
                            Gooood, one thing les!.
                        </Alert>}
                </Modal>
            </ThemeProvider>
        </>
    );
}

export default TaskList;