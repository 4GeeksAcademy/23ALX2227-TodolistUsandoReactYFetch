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
            console.log(err)
        }
    };
    const handlerClick = async () => {
        try {
            if (newTask) {
                let obj = {
                    label: newTask,
                    done: false, 
                }
                setList([...list, obj])
                const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${inputValue}`, {
                    body: JSON.stringify(list),
                    method: "PUT",
                    headers: {'Content-Type': 'application/json'}
                })
                if (!response.ok) {
                    throw new Error("No se pudo actulizar la lista");
                }
                const data = await response.json()
                console.log(data)
                
            }else {
                alert("Para guardar tarea debes escribir algo!")
            }

            
        } catch(err){
            console.log(err)

        }
    }
    const handlerNewUser = async () => {
        try { 
            const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${newUserValue}`, {
                body: JSON.stringify([]),
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'                   }
            }
            )
            const data = await response.json()
            console.log(data)



        } catch(err){

        }
    }

    const handlerDelete = async () => {
        try {
            
        }

    }

    useEffect(() => {
        getList();
    }, [inputValue]);


    return (
        <div className="text-center container">

            <h3>Crear usurio:</h3>
            <input type="text" className="form-control" onChange={(e) => setNewUserValue(e.target.value)} />
            <button className="btn btn-success mt-3" onClick={ handlerNewUser }>New User</button>

            <h3>Busca tu lista por nombre: </h3>
            <input type="text" className="form-control" onChange={(e) => setInputValue(e.target.value)} value= {inputValue} />

            <h3>Agregar nueva tarea: </h3>
            <input type="text" className="form-control" onChange={(e) => setNewTask(e.target.value)}/>
            <button className="btn btn-primary mt-3" onClick={ handlerClick }>Agregar Tarea</button>

            <ul className="list-group">
                {
                    list.map((ele, index)=> {
                        return <>
                        <li className="list-group-item list-group-item-success mt-4" key={index}> {ele.label}</li>
                        <label onClick={handlerDelete}>❌</label>
                        </>                       
                    })
                }                
            </ul>
        </div>
    );
};

export default home;
