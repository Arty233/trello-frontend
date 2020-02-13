import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

export default function Item(props) {
    return (
        <Draggable
            key={props.item.id}
            draggableId={props.item.id}
            index={props.index}
        >
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{                            
                            padding: 16,
                            margin: "0 0 8px 0",
                            minHeight: "25px",
                            backgroundColor: snapshot.isDragging
                                ? "#263B4A"
                                : "#456C86",
                            color: "white",
                            ...provided.draggableProps.style
                        }}
                    >
                        {props.item.content}
                    </div>
                );
            }}
        </Draggable>
    );
}