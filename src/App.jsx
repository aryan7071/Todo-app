import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([]);
  const handleedit = () => {

  }

  const handledelete = () => {  
    let id = e.target.name;
   console.log(`the is is ${id}`)

  }

const handleadd = () => {
  setTodos([...Todos,{ id: uuidv4(), Todo, iscompleted: false }]);
  setTodo("");
};
  const handlechange = (e) => {
    setTodo(e.target.value)



  }
  const handlecheckbox= (e) => {
   let id = e.target.name;
   console.log(`the is is ${id}`)
   let index = Todos.findIndex(item=>{
    return item.id ===id;
   })
   console.log(index)
   let newTodos = [...Todos];
   newTodos[index].iscompleted = !newTodos[index].iscompleted;
   setTodos(newTodos) 
   console.log(newTodos,Todos)
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-100 my-5 p-5 rounded-xl min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold' >Add a Todo</h2>
          <input onChange={handlechange} value={Todo} type="text" className='w-1/2  ' />
          <button onClick={handleadd} className='bg-[#4546E5] hover:bg-[#3838c5] p-2 py-1 text-white text-sm font-bold rounded-md mx-6'>Add</button>
        </div>

        <h2 className='text-lg font-bold' >Your Todos</h2>
        <div className="todos">
          {Todos.map(item => {
            return <div key={item.id} className="Todo flex my-3 justify-between w-1/2">
              <input  name={item.id} onChange={handlecheckbox} type="checkbox" value={item.iscompleted} id=''/>
              <div className={item.iscompleted?"line-through":""}>{item.Todo}</div>
              <div className="buttons"> 
                <button onClick={handleedit} className='bg-[#4546E5] hover:bg-[#3838c5] p-2 py-1 text-white text-sm font-bold rounded-md mx-1'>Edit</button>
                <button onClick={handledelete} className='bg-[#4546E5] hover:bg-[#3838c5] p-2 py-1 text-white text-sm font-bold rounded-md mx-1'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
