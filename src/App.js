import {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios'


function App() {
  const [switcher, setSwitcher] = useState (false)

  const [friendData, setData] = useState({
    name: '',
    surname: '',

  })
  const [updFriend, setUpdate] = useState({
    name: '',
    surname: '',

  })
  const [amigo, mostrarAmigo] = useState([])

  useEffect(() => {
   Axios.get('http://localhost:3001/api/get')
   .then((response) => {
     mostrarAmigo(response.data)
   })
  }, [])
  const handleSubmit = () => {
   Axios.post('http://localhost:3001/api/insert', 
   {friendName : friendData.name, 
    friendSur: friendData.surname
   })
     mostrarAmigo([... amigo, {friendName : friendData.name, 
      friendSur: friendData.surname}])

  }
  const deleteFriend = (name) => {
    Axios.delete(`http://localhost:3001/api/delete/${name}`, (err, res) => {
      console.log(res)
    })
  }
  const updateFriend = (name, sur) => {
    Axios.put(`http://localhost:3001/api/update/${name}/${sur}`, 
    {friendName : updFriend.name, 
    friendSur: updFriend.surname},
    (err, res) => {
      console.log(res)
      })

  }

  return (
    <div className="App">
     <h1>Lista de amigos</h1>

     <div className='form'>
     
       <label> Nombre:</label>
       <input type="text" name='name' onChange ={(e) => {
         setData({...friendData, [e.target.name]:e.target.value})
       }} />
       <label>Apellido:</label>
       <input type='text' name = 'surname' onChange ={(e) => {
         setData({...friendData, [e.target.name]:e.target.value})
       }}/>
       <button onClick={handleSubmit} >Enviar</button>
     {amigo.map((val) => {
      return (
      <div className='card'>
       <h1>{val.friendName}</h1>
       <h2>{val.friendSur}</h2>
       <button onClick ={() => {deleteFriend(val.friendName)}}>Borrar</button>
       <input type='text' id='update'  name= {!switcher ? 'name' : 'surname'} onChange ={(e) => {
         setUpdate({...updFriend, [e.target.name]:e.target.value})
       }} />
       <button  onClick = {!switcher ? () => {
         setSwitcher(true)
         
         } : () => {updateFriend(val.friendName, val.friendSur)}}>Actualizar</button>
      </div>
      )
     })}
     </div>
    </div>
  );
}

export default App;
