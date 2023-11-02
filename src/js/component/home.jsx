import React, { useState, useEffect } from "react";

const home = () => {
    const [inputValue, setInputValue] = useState("pedro");
    const [list, setList] = useState([]);
    const [newTask, setNewTask] = useState("");

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
                    METHOD: "PUT",
                    headers: {
                        'Content-Type': 'application/json'                   }
                })
                if (!response.ok) {
                    throw new Error("El response get dio false ");
                }
                const data = await response.json()
                console.log(data)
                
            }else {
                alert("Para guardar tarea debes escribir algo!")
            }

            
        } catch(err){

        }
    }
    useEffect(() => {
        getList();
    }, [inputValue]);

    return (
        <div className="text-center container">
            <h3>Busca tu lista por nombre: </h3>
            <input type="text" onChange={(e) => setInputValue(e.target.value)} />
            <h3>Agregar nueva tarea: </h3>
            <input type="text"  onChange={(e) => setNewTask(e.target.value)}/>
            <button onClick={ handlerClick }>Agregar Tarea</button>
            <ul className="list-group list-group-flush">
                {
                    list.map((ele, index)=> {
                        return <li className="list-group-item" key={index}> {ele.label} </li>
                    })
                }                
            </ul>
        </div>
    );
};

export default home;
