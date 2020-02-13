import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Item from "../item/Item";
import axios from 'axios';
import './column.css'

export default function Column(props) {
    const [columns, setColumns] = useState(props.columns);
    const [cols, setCols] = useState([]);

    function getData() {
        axios.get(`http://localhost:3001/api/columns?board_id=${props.boardId}`)
            .then(res => {
                const data = res.data;
                console.log(data);

            }).then(data => {
                setCols(data);
                console.log(cols);
            })
    }

    return (
        <DragDropContext
            onDragEnd={result => props.onDragEnd(result, columns, setColumns)}
        >
            {Object.entries(columns).map(([columnId, column], index) => {
                return (
                    <div className='column'
                        
                        key={columnId}
                    >
                        <h2>{column.name}</h2>
                        <div style={{ margin: 8 }}>
                            <Droppable droppableId={columnId} key={columnId}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                background: snapshot.isDraggingOver
                                                    ? "green"
                                                    : "grey",
                                                padding: 10,
                                                width: 250,
                                                minHeight: 500
                                            }}
                                        >
                                            {column.items.map((item, index) => {
                                                return (
                                                    <Item item={item} index={index}></Item>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    );
                                }}
                            </Droppable>
                        </div>
                    </div>
                );
            })}
        </DragDropContext>
    )
}