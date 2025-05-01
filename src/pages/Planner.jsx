import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Container } from './styles';
import ListCard from '../components/list';
import CreateList from '../components/createList';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import CachedIcon from '@mui/icons-material/Cached';
import localforage from '../storage';
import TaskList from '../components/taskList';



function Planner() {
    const [themeMode, setThemeMode] = React.useState('light');

    const [mainDesc, setMainDesc] = React.useState('Click here to generate a motivational phrase')

    const motivationalQuotes = [
        "You miss 100% of the naps you don’t take.",
        "Follow your dreams – unless your dreams are dumb.",
        "Believe in yourself… even when no one else does, especially when they shouldn’t.",
        "The road to success is always under construction. Wear a helmet.",
        "If at first you don’t succeed, redefine success.",
        "Work hard so your dog can have a better life.",
        "Don’t give up on your dreams. Keep sleeping.",
        "Some people graduate with honors, I am just honored to graduate.",
        "You can do anything you set your mind to – as long as it’s within your skillset and you don’t get distracted.",
        "Motivation is like a shower – you need it daily, and sometimes you still stink.",
        "Be yourself. Unless you can be a cat. Then always be a cat.",
        "Success is 1% inspiration, 99% avoiding social media.",
        "The sky is the limit. Unless you’re afraid of heights.",
        "Dream big. But maybe not too big – you still need 8 hours of sleep.",
        "If life gives you lemons, freeze them and throw them at people who make it worse."
    ];


    const [lists, setLists] = React.useState([]);


    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        setMainDesc(motivationalQuotes[randomIndex]);
        localforage.setItem('phrase', motivationalQuotes[randomIndex])
    }

    const getAllLists = async () => {
        try {
            const index = await localforage.getItem('listIndex') || 0;
            const order = await localforage.getItem('ordered_lists');
    
            const allLists = [];
            for (let i = 0; i < index; i++) {
                const list = await localforage.getItem(`list_${i}`);
                if (list) {
                    allLists.push(list);
                }
            }
    
            if (order?.length) {
                const orderedLists = order
                    .map(id => allLists.find(list => list?.id === id))
                    .filter(Boolean);
    
                const unordered = allLists.filter(l => !order.includes(l.id));
                setLists([...orderedLists, ...unordered]);
            } else {
                setLists(allLists);
            }
    
        } catch (error) {
            alert('Hmmm... Looks like we need a little more magic to make this work.');
        }
    };

    const listDelete = async (id) => {
        const confirmed = window.confirm("Nice! No more tasks to worry about, but are you shure ?");

        if (!confirmed) {
            return;
        }
        try {
            const existingList = await localforage.getItem(id);
            if (!existingList) return;

            await localforage.removeItem(id);

        } catch (error) {
            alert('Something went wrong while deleting the task.');
        }
    }

    React.useEffect(() => {
        getRandomQuote();
    }, [])


    React.useEffect(() => {
        setThemeMode(localStorage.getItem('theme'));
    }, [localStorage.getItem('theme')]);

    React.useEffect(() => {
        getAllLists()
    }, [localforage.getItem('listIndex')]);

    const handleOnDragEnd = async (result) => {
        if (!result.destination) return;
    
        const reordered = Array.from(lists);
        const [moved] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, moved);
    
        setLists(reordered);
    
        try {
            const orderedIds = reordered.map(list => list.id);
            await localforage.setItem('ordered_lists', orderedIds);
        } catch (error) {
            alert('Failed to save new list order');
        }
    };

    return (
        <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
            <Container >
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', alignItems: 'center' }}>
                    <div>
                        <h1>Planner</h1>
                        <p> <CachedIcon sx={{ cursor: 'pointer' }} onClick={getRandomQuote} /> {mainDesc}  </p>
                    </div>
                    <div>
                        <CreateList />
                    </div>
                </div>

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="lists" direction="horizontal">
                        {(provided) => (
                            <Box
                                sx={{ flexGrow: 1 }}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <Grid container spacing={2} sx={{ justifyContent: 'center', display: 'flex' }}>
                                    {lists?.map((list, index) => (
                                        <Draggable draggableId={list.id.toString()} index={index} key={list.id}>
                                            {(provided) => (
                                                <Grid
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <TaskList lists={list} deleteList={listDelete}>
                                                        <ListCard
                                                            name={list?.listName}
                                                            desc={list?.listDesc}
                                                            color={list?.colorselected?.value}
                                                            id={list?.id}
                                                            count={list?.taskIndex}
                                                        />
                                                    </TaskList>
                                                </Grid>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </Grid>
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>

            </Container>
        </ThemeProvider>
    );
}

export default Planner;