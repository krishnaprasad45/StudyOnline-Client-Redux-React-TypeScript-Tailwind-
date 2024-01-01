import  { useEffect, useState } from 'react'
import { socket } from '../../../services/socket.io/socketConfig'

export default function ChatDemo() {
  socket.connect();
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    })
  }, [])

  const handleOnchange = ()=>{
    if (!connected) return;
    socket.emit('test','hey');
  
  }
  return (
    <div>
      <button onClick={handleOnchange}>Click me</button>
    </div>
  )
}
