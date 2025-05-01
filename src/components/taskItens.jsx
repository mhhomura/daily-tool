import * as React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import localforage from '../storage';

const CheckboxList = ({ list, onDelete, check, listId, setList }) => {

    const handleOnDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setList(items);
        try {
            const existingList = await localforage.getItem(listId);
            if (!existingList) return;

            const updatedList = {
                ...existingList,
                tasks: items
            };
            await localforage.setItem(listId, updatedList);
        } catch (error) {
            alert("Something went wrong while saving the new task order.");
        }
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="checkbox-list">
                {(provided) => (
                    <List
                        sx={{ width: '100%' }}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {list?.map((l, index) => (
                            <Draggable key={l?.id} draggableId={l?.id} index={index}>
                                {(provided) => (
                                    <ListItem
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon onClick={() => onDelete(l?.id)} />
                                            </IconButton>
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={() => check(l?.id)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={l?.completed}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={l?.id} primary={l?.text} />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default CheckboxList;