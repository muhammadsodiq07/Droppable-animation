import React, { useState } from "react";
import { IoImages } from "react-icons/io5";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

function Dragb() {
  const [characters, updateCharacters] = useState([]);

  const ImagesHandler = (e) => {
    if (e.target.files[0] !== undefined) {
      updateCharacters([
        ...characters,
        {
          id: `${Date.now()}`,
          img: e.target.files[0],
          name: e.target.files[0].name,
        },
      ]);
    }
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  const deleteHandler = (id) => {
    updateCharacters(characters.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="file-input">
        <input
          type="file"
          id="file"
          className="file"
          accept="image/*"
          required
          onChange={ImagesHandler}
        />
        <label htmlFor="file">
          {" "}
          <IoImages size={36} color="#fff" className="me-2" />
          <p className="m-0 p-0 uploudImg_text">Загрузить Изображения</p>
        </label>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {characters.map(({ id, name, img }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="characters-div">
                          <div className="characters-thumb">
                            <img src={URL.createObjectURL(img)} alt="" />
                          </div>
                          <p>
                            {" "}
                            {name.substring().length > 19
                              ? `${name.substring(0, 19)}...`
                              : name}
                          </p>
                        </div>
                        <button onClick={() => deleteHandler(id)}>
                          Delete
                        </button>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Dragb;
