import { useState , useEffect } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import { v4 as uuidv4 } from 'uuid';

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
      <div className="container mx-auto bg-violet-100 my-5 p-5 rounded-xl min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold' >Add a Todo</h2>
          <input onChange={handlechange} value={Todo} type="text" className='w-1/2  ' />
          <button onClick={handleadd} className='bg-[#4546E5] hover:bg-[#3838c5] p-2 py-1 text-white text-sm font-bold rounded-md mx-6'>Save</button>
        </div>

        <h2 className='text-lg font-bold' >Your Todos</h2>
        <div className="todos">
          {Todos.length == 0 && <div className='m-5' >No Todos to display </div>}
          {Todos.map(item => {
            return <div key={item.id} className="Todo flex my-3 justify-between w-1/2">
              <div className='flex gap-5' >
                <input name={item.id} onChange={handlecheckbox} type="checkbox" value={item.iscompleted} id='' />
                <div className={item.iscompleted ? "line-through" : ""}>{item.Todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleedit(e,item.id)} className='bg-[#4546E5] hover:bg-[#3838c5] p-2 py-1 text-white text-sm font-bold rounded-md mx-1'>Edit</button>
                <button onClick={(e) => { handledelete(e, item.id) }} className='bg-[#4546E5] hover:bg-[#3838c5] p-2 py-1 text-white text-sm font-bold rounded-md mx-1'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
