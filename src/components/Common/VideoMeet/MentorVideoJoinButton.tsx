import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../../services/socket.io/socketConfig';
import mentorEndpoints from '../../../Constraints/endpoints/mentorEndpoints';
import { useDispatch } from 'react-redux';
import { setSlot } from '../../../services/redux/reducer/consult';

const JoinButton: React.FC = () => {
    const navigate = useNavigate();
   
    
    const dispatch = useDispatch()

    const handleJoin = useCallback(() => {
        const email = localStorage.getItem('mentorEmail')
        const id = localStorage.getItem('mentorToken')
        const room = 200;
        
        dispatch(setSlot(id))
        console.log(room);
        socket.emit("room:join", { email, room })
    }, [dispatch, socket])

    const handleJoinRoom = useCallback((data: { room: string; }) => {
        const { room } = data
        console.log("mentor room from data",room) 
        navigate(`${mentorEndpoints.videomeet}/${room}`);
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
