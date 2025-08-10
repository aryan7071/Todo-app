import { useState , useEffect } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([]);

  const [showfinished, setshowfinished] = useState(true)  




  useEffect(() => {
    let todoString =localStorage.getItem("Todos")
    if(todoString){
        let todos = JSON.parse(localStorage.getItem("Todos"))
        setTodos(todos)
    }
  }, [])
  

  const savetoLS= (params) => {
    localStorage.setItem("Todos",JSON.stringify(Todos))
  }

  const togglefinished = (e) => {
    setshowfinished(!showfinished)
  }
  

  const handleedit = (e, id) => {
    let t = Todos.filter(i=>i.id ===id)
    setTodo(t[0].Todo)
    let newTodos = Todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos) 
    savetoLS()
  }
  const handledelete = (e, id) => {
    let newTodos = Todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    savetoLS()
  }

  const handleadd = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, iscompleted: false }]);
    setTodo("");
    savetoLS()
  };


  const handlechange = (e) => {
    setTodo(e.target.value)
  }
  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...Todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos)
    savetoLS()  
  }


  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto bg-violet-100 my-5 p-5 rounded-xl min-h-[80vh] md:w-[35%]">
      <h1 className='font-bold text-3xl text-center' >Todo - Manage your task at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold' >Add a Todo</h2>
          <div className="flex">

          <input onChange={handlechange} value={Todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleadd} disabled={Todo.length<=3} className='bg-[#4546E5] mx-2 hover:bg-[#3838c5] p-4 py-2 text-white text-sm font-bold rounded-full '>Save</button>
          </div>
        </div>

        <input className='my-4 mx-3' onChange={togglefinished} type="checkbox" checked={showfinished} />Show Finished
        <div className='h-[1px] opacity-25 bg-black mx-auto my-2 w-[90%]'></div>
        <h2 className='text-2xl font-bold' >Your Todos</h2>
        <div className="todos">
          {Todos.length == 0 && <div className='m-5' >No Todos to display </div>}
          {Todos.map(item => {
            return (showfinished || !item.iscompleted) && <div key={item.id} className="Todo flex my-3 justify-between ">
              <div className='flex  gap-5' >
                <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.iscompleted} id='' />
                <div className={item.iscompleted ? "line-through" : ""}>{item.Todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleedit(e,item.id)} className='bg-[#4546E5] hover:bg-[#3838c5] p-2 py-1 text-white text-sm font-bold rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handledelete(e, item.id) }} className='bg-[#4546E5] hover:bg-[#3838c5] p-2 py-1 text-white text-sm font-bold rounded-md mx-1'><AiFillDelete />  </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
