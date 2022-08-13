
import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';

function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    // dd/mm/yyyy, hh:mm:ss
    return date.toLocaleString();
};

function sortMessagesByDate(messages) {
  return messages.sort(
    (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
  );
}

const Messages = ({ socket }) => {
  const [messagesReceived, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null); 

  // Runs whenever a socket event is received from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessagesReceived((prevState) => [
        ...prevState,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
	  // Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  //getting last 100 messages of the room, on every repaint
  useEffect(()=>{
    socket.on('last_100_messages', (last100Messages) => {
      last100Messages = JSON.parse(last100Messages);
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived(prevState => [...last100Messages, ...prevState]);
    })
    // Remove event listener on component unmount
    return () => socket.off('last_100_messages');
  },[socket])

  //scrolling to last message on every repaint
  useEffect(() => {
    messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
  }, [messagesReceived]);

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesReceived.length  && messagesReceived.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>{formatDateFromTimestamp(msg.__createdtime__)}</span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>))
      }
    </div>
  );
};

export default Messages;