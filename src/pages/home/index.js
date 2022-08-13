import styles from './styles.module.css';
import SelectRoomComponent from './utils';
import { useNavigate } from 'react-router-dom';





const Home = ({username, setUsername, room, setRoom, socket}) =>  {
  
  const navigate = useNavigate();

  // handle Socket Connexion when clicking 'JOIN ROOM'
  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
    }
    // Redirect
    navigate('/chat', { replace: true }); // Add this
  };
  
  return (
    <div className={styles.container}>

      <div className={styles.formContainer}>

        <h1>
          {`<>DevRooms</>`}
        </h1>
        
        <input 
          className={styles.input} 
          placeholder='Username...'
          onChange={e=>setUsername(e.target.value)} 
        />

        <SelectRoomComponent setRoom={setRoom}/>

        <button 
          className='btn btn-secondary' 
          style={{ width: '100%' }} 
          onClick={joinRoom}
        >
          Join Room
        </button>

      </div>

    </div>
  );
}
export default Home;