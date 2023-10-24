import React, { useState } from "react";


const Home = () => {
  const [tarea, setTareas] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const miObj = {
        label: inputValue,
        done: false,
      };
      setTareas([...tarea, miObj]);

      setInputValue("");
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tarea.filter((_, i) => i !== index);
    setTareas(newTasks);
  };

  return (
    <div>
      <div className="container mt-5 border border-light-subtle rounded">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <h1 className="text-center mb-5">Todo List</h1>

            <div className="form-group p-3 text-center">
              <input
                className="form-control mb-3"
                type="text"
                id="todo-input"
                value={inputValue}
                onChange={handleInputChange}
                name="text"
                autoComplete="off"
                placeholder="Ingresar una tarea"
              />
              <button
                className="btn btn-success rounded-pill "
                type="button"
                onClick={handleAddTask}
              >
                Agregar Tarea
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row mx-auto" style={{ width: "640px" }}>
          <ul className="list-group">
            {tarea.length === 0 ? (
              <li className="list-group-item text-center">
                No hay tareas, añadir tareas
              </li>
            ) : (
              tarea.map((elem, index) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={index}
                >
                  {elem.label}
                  <button
                    className="btn btn-outline-danger btn-md"
                    onClick={() => handleDeleteTask(index)}
                  >
                    
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
