import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../../services/socket.io/socketConfig';
import mentorEndpoints from '../../../Constraints/endpoints/mentorEndpoints';
import { useDispatch } from 'react-redux';
import { setSlot } from '../../../services/redux/reducer/consult';

interface JoinButtonProps {
  videoId: string | undefined;
}

const JoinButton: React.FC<JoinButtonProps> = ({ videoId }) => {
  const navigate = useNavigate();
  const email = localStorage.getItem('mentorEmail');
  const id = localStorage.getItem('mentorToken');
  const dispatch = useDispatch();

  const handleJoin = useCallback(() => {
    const room = videoId;
    if (localStorage.getItem('mentorEmail')) {
      socket.emit('room:join', { email, room });
    }
  }, [email, videoId]);

  const handleJoinRoom = useCallback((data: { room: number }) => {
    const { room } = data;
    dispatch(setSlot(id));
    navigate(`${mentorEndpoints.videomeet}/${room}`);
  }, [dispatch, id, navigate]);

  useEffect(() => {
    socket.on('room:join', handleJoinRoom);
    return () => {
      socket.off('room:join', handleJoinRoom);
    };
  }, [handleJoinRoom]);

  return (
    <div className='bg-white' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <button onClick={handleJoin} style={{ backgroundColor: 'blue', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', color: 'white' }}>
        Join to Learner Video Meet
      </button>
    </div>
  );
};

export default JoinButton;
