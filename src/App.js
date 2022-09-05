import React from 'react'
import './App.css'
import {useState, useEffect} from 'react'
import TodoItems from './TodoItems'

const App = () => {
  const [todos,setTodos] = useState([]);
  const [btn,setBtn] = useState("ADD");
  const [editId,setEditId] = useState(null);
    
  const initializeTodos = async()=>{
    try {
      const res = await fetch("http://localhost:5000/fetch",{
        method:"GET",
        headers:{"content-Type":"application/json"}
      });
      const data = await res.json();
      if (data) {
        setTodos(data);
      }
      console.log("Todos Fetched and Updated ");
    } 
    catch (error) {
      console.log(error);  
    }
  }

  useEffect(() => {
    initializeTodos();
  }, []);

  const submitHandler = async(e)=>{
    e.preventDefault();
    try {
      if (btn === "ADD") {
        const res = await fetch("http://localhost:5000/insert",{
                    method:"POST",
                    headers:{"content-Type":"application/json"},
                    body:JSON.stringify({item:e.target.firstChild.value})
        });
        const data = await res.json();
        console.log(data);
      } 
      else if(btn === "EDIT") {
        const res = await fetch("http://localhost:5000/update",{
          method:"PUT",
          headers:{"content-Type":"application/json"},
          body:JSON.stringify({ id:editId,
                                item:e.target.firstChild.value})
        });
        const data = await res.json();
        console.log(data);
        setBtn("ADD");
        setEditId(null);
      }
      e.target.firstChild.value="";
      initializeTodos();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id='main'>
    <div className='todohead'>
      <h1>TODO APP</h1>
      <form onSubmit={submitHandler}>
        <input type="text" name="text" id="text" placeholder='Enter Something ...' />
        <button className='btn' type='submit'>{btn}</button>
      </form>
    </div>

    <div className='todoitems'>
      {todos.map((item,index)=>{
        return (
          <TodoItems
          item={item.item}
          index={index+1}
          id={item._id}
          initializeTodos={initializeTodos}
          setBtn={setBtn}
          setEditId={setEditId}
          key={item._id}
          />
        );
      })}
    </div>
    </div>
  )
}

export default App