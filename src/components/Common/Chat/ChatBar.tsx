

const ChatBar = () => {
  return (
    <div className="chat__sidebar h-1/3"> 
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE</h4>
        <div className="chat__users">
          <p>User 1</p>
          <p>User 2</p>
      
        </div>
      </div>
    </div>
  );
};

export default ChatBar;