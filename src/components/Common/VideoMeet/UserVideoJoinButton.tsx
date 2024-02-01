import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userEndpoints from '../../../Constraints/endpoints/userEndpoints';
import { socket } from '../../../services/socket.io/socketConfig';

interface JoinButtonProps {
  videoId: string;
}

const JoinButton: React.FC<JoinButtonProps> = ({ videoId }) => {
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');

  const handleJoin = useCallback(() => {
    const room = videoId;
    if (localStorage.getItem('userEmail')) {
      socket.emit('room:join', { email, room });
    }
  }, [email, videoId]);

  const handleJoinRoom = useCallback((data: { room: string }) => {
    const { room } = data;
    navigate(`${userEndpoints.videomeet}/${room}`);
  }, [navigate]);

  useEffect(() => {
    socket.on('room:join', handleJoinRoom);
    return () => {
      socket?.off('room:join', handleJoinRoom);
    };
  }, [handleJoinRoom]);

  return (
    <div className='bg-blue-200' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <button onClick={handleJoin} style={{ backgroundColor: 'green', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', color: 'white' }}>
        Ready to receive call
      </button>
    </div>
  );
};

export default JoinButton;


