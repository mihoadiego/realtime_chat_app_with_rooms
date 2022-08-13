
import styles from './styles.module.css';
import MessagesReceived from './messages';
import SendMessage from './send_message';
import RoomsAndUsers from './rooms_and_users';

const Chat = ({ socket, username, room }) => {
  return (
    <div className={styles.chatContainer}>
       <RoomsAndUsers socket={socket} username={username} room={room} />
      <div>
        <MessagesReceived socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;