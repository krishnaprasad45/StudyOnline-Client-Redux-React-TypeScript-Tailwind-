import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userEndpoints from '../../../Constraints/endpoints/userEndpoints';
import { socket } from '../../../services/socket.io/socketConfig';
import mentorEndpoints from '../../../Constraints/endpoints/mentorEndpoints';

const JoinButton: React.FC = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem('userEmail') || localStorage.getItem('mentorEmail')
    


    const handleJoin = useCallback(() => {
        const room = 200;
      
       
        if(localStorage.getItem('userEmail')){
            socket.emit('room:join', { email, room });
        navigate(userEndpoints.videomeet);
        }
        if(localStorage.getItem('mentorEmail')){
            socket.emit('room:join', { email, room });
            navigate(mentorEndpoints.videomeet);
        }
       
    }, [navigate]);

    const handleJoinRoom = useCallback(() => {
        navigate(userEndpoints.videomeet);
    }, [navigate]);

    useEffect(() => {
        socket.on('room:join', handleJoinRoom);
        return () => {
            socket?.off('room:join', handleJoinRoom);
        };
    }, [socket, handleJoinRoom]);



    const handleJoin = useCallback((id, room) => {
        dispatch(setSlot(id))
        console.log(room);
        socket.emit("room:join", { email, room })
    }, [dispatch, socket, email])

    const handleJoinRoom = useCallback((data) => {
        const { room } = data
        navigate(`/doctor/call/${room}`)
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
                Join to Video Meet
            </button>
        </div>
    );
};

export default JoinButton;
