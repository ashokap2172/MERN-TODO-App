import React from 'react'

const TodoItems = (props) => {
  return (
    <>
    <div className='items'>
        <h3>{props.index}. {props.item}</h3>
        <div>
        <button className='btn' onClick={ async()=>{
                try {
                    const res = await fetch("http://localhost:5000/delete",{
                                method:"DELETE",
                                headers:{"content-Type":"application/json"},
                                body:JSON.stringify({id:props.id})
                    });
                    const data = await res.json();
                    console.log(data);
                    props.initializeTodos();
                  } catch (error) {
                    console.log(error);
                  }
        }}>X</button>
        <button className='btn' onClick={()=>{ 
            props.setBtn("EDIT");
            props.setEditId(props.id);
            const text = document.getElementById('text');
            text.value = props.item;
        }}>EDIT</button>
        </div>
    </div>
    <hr/>
    </>
  )
}

export default TodoItems;