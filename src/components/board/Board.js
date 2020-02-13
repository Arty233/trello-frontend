import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import Column from '../column/Column';
import axios from 'axios';

const itemsFromBackend = [
  { id: uuid(), content: "Проснуться" },
  { id: uuid(), content: "Покушать" },
  { id: uuid(), content: "Сходить в школу" },
];

const columnsFromBackend = {

  [uuid()]: {
    name: "To do",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "In Progress",
    items: []
  },
  [uuid()]: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function Board() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [board, setBoard] = useState({});

  function getData() {
    axios.get('http://localhost:3001/api/boards/1.json')
      .then(res => {
        const data = res.data;
        setBoard(data);
      })
  }

  useEffect(() => {
    console.log('useEffect')
    getData();
  }, [])
  return (
    <div>
      <h1>Board: {board.name}</h1>
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        {board.id ? (
          <Column columns={columnsFromBackend} onDragEnd={onDragEnd} boardId={board.id} />
        ) : (
            <p>loading...</p>
          )}
        
      </div>
    </div>
  );
}

export default Board;


