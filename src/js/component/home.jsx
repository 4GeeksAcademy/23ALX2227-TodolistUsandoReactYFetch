import React, { useState, useEffect } from "react";

const home = () => {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newUserValue, setNewUserValue] = useState("");

  const getList = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/apis/fake/todos/user/${inputValue}`
      );
      if (!response.ok) {
        throw new Error("El response get dio false ");
      }
      const data = await response.json();
      setList(data);
    } catch (err) {
      console.log(err);
    }
  };
  const addTaskToList = () => {
    if (newTask) {
      let obj = {
        label: newTask,
        done: false,
      };
      setList([...list, obj]);
    } else {
      alert("Para guardar tarea debes escribir algo!");
    }
  };
  const removeTaskFromList = (index) => {
    const newList = list.filter(function (item, i) {
      return i !== index;
    });
    setList(newList);
  };
  const updateList = async (list) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/apis/fake/todos/user/${inputValue}`,
        {
          body: JSON.stringify(list),
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("No se pudo actulizar la lista");
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handlerNewUser = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/apis/fake/todos/user/${newUserValue}`,
        {
          body: JSON.stringify([]),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {}
  };

  const handlerDelete = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/apis/fake/todos/user/${inputValue}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getList();
  }, [inputValue]);

  useEffect(() => {
    updateList(list);
  }, [list]);

  return (
    <div className="text-center container">
      <h3>Crear usurio:</h3>
      <div className="row col-md-3 m-auto">
      <input
        type="text"
        className="form-control"
        onChange={(e) => setNewUserValue(e.target.value)}
      />
      </div>
      <button className="btn btn-success mt-3" onClick={handlerNewUser}>
        New User
      </button>

      <div className="row col-md-3 m-auto">
      <h3>Busca tu lista: </h3>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      </div>

      <div className="row col-md-5 m-auto">
      <h3>Agregar nueva tarea: </h3>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setNewTask(e.target.value)}
      />
      </div>
      <button className="btn btn-primary mt-3" onClick={addTaskToList}>
        Agregar Tarea
      </button>

      <ul className="list-group">
        {list.map((ele, index) => {
          return (
            <li
              className="col-md-12 list-group-item list-group-item-success mt-4"
              key={index}
            >
              {" "}
              {ele.label}{" "}
              <button
                className="btn btn-outline-danger mt-3"
                onClick={() => removeTaskFromList(index)}
              >
                ❌
              </button>
            </li>
          );
        })}
      </ul>
      <button className="btn btn-danger mt-3" onClick={handlerDelete}>
        Eliminar todas la tareas
      </button>
    </div>
  );
};

export default home;
