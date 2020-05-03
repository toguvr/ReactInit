import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

 function App() {

  const [values, setValues] = useState({title: "", url: "", techs: ""})
  const [list, setList] = useState([])

  async function ListRepository() {
    const response = await api.get(`/repositories`)

    setList(response.data)
  }

  // useEffect(()=>{
  //   ListRepository()
  // },[])


  async function handleAddRepository() {
    const body = {
      title: values.title,
      url: values.url,
      techs: values.techs
    }

   const response = await api.post(`/repositories`, body)
   
   setList([...list, response.data])
  }

  async function handleRemoveRepository(id) {
  await api.delete(`/repositories/${id}`)
    const newList = [...list]
    const listIndex = newList.findIndex(repo=> repo.id === id)
    newList.splice(listIndex, 1)

    setList(newList)

  }

  return (
    <div>
      <ul data-testid="repository-list">
      {list.length>0 && list.map(repo=>  
         <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>)}
      </ul>
         <button >
            Remover
          </button>
      <input type="text" value={values.title} name="title" onChange={e=>setValues({...values, [e.target.name]: e.target.value})} />
      <input type="text" value={values.url} name="url" onChange={e=>setValues({...values, [e.target.name]: e.target.value})} />
      <input type="text" value={values.techs} name="techs" onChange={e=>setValues({...values, [e.target.name]: e.target.value})} />

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
