import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../../services/socket.io/socketConfig';

import userEndpoints from '../../../Constraints/endpoints/userEndpoints';

const JoinButton: React.FC = () => {
    const navigate = useNavigate();
   
    const email = localStorage.getItem('userEmail')
   
    const handleJoin = useCallback(() => {
        const room = 200;
        socket.emit("room:join", { email, room })
    }, [ socket, email])

    const handleJoinRoom = useCallback((data: { room: string; }) => {
        const { room } = data
        console.log("room no from data",room)
        // navigate(`/call/${room}`)
        navigate(`${userEndpoints.videomeet}/${room}`);
    }, [navigate])

    useEffect(() => {
        socket.on('room:join', handleJoinRoom)
        return () => {
            socket.off('room:join', handleJoinRoom)
        }
    }, [socket, handleJoinRoom])


   

    

 

    return (
        <div className='bg-blue-200' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <button onClick={handleJoin} style={{ backgroundColor: 'green', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', color: 'white' }}>
                Join Video Meet Mentor
            </button>
        </div>
    );
};

export default JoinButton;
