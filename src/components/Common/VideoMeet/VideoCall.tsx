import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { BsFillTelephoneFill, BsFillTelephoneXFill, BsMicFill, BsMicMuteFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


import peer from '../../../services/peer';
import { socket } from '../../../services/socket.io/socketConfig';
import mentorEndpoints from '../../../Constraints/endpoints/mentorEndpoints';
import userEndpoints from '../../../Constraints/endpoints/userEndpoints';




interface VideoCallProps {
  value: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ value }) => {

  console.log("value",value)
  const navigate = useNavigate();
 
  // const remoteRef = useRef<HTMLDivElement>(null);
  const [remoteSocketId, setRemoteSocketId] = useState<string | undefined>();
  const mentorToken = localStorage.getItem('mentorEmail');
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>();
  const [callActive, setCallActive] = useState<boolean>(false);
 
  const [muted, setMuted] = useState<boolean>(true);
  const [accepted, setAccepted] = useState<boolean>(false);

  const handleUserJoined = useCallback(({email, id }: { email: string; id: string }) => {
    console.log(`${email} joined, id:${id}`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    if (callActive) {
      myStream?.getTracks().forEach((track) => track.stop());
      setMyStream(null);
      socket.emit('call:end', { to: remoteSocketId });
      setCallActive(false);
      setRemoteStream(undefined);
     
      socket.emit('socket:disconnect', { socketId: remoteSocketId });
      if (value === 'mentor') {
        navigate(mentorEndpoints.videomeetJoin);
      } else if (value === 'user') {
        navigate(userEndpoints.videomeetJoin);
      }
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      const offer = await peer.getOffer();
      socket.emit('user:call', { to: remoteSocketId, offer });
      setMyStream(stream);
      setCallActive(true);
    }
  }, [ callActive, mentorToken, myStream, navigate, remoteSocketId, socket, value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleIncomingCall = useCallback(async ({ from, offer }: { from: string; offer: any }) => {

    console.log("Incoming call-",from,offer)
    setRemoteSocketId(from);
    setCallActive(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    setMyStream(stream);
    const ans = await peer.getAnswer(offer);
    socket.emit('call:accepted', { to: from, ans });
  }, [socket]);

  const sendStreams = useCallback(() => {
    setAccepted(true);
    if (myStream) {
      for (const track of myStream.getTracks()) {
        peer?.peer?.addTrack(track, myStream);
      }
      setCallActive(true);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async ({ ans }: { ans: any }) => {
      console.log("call accepted-",ans)
      await peer.setLocalDescription(ans);
      setCallActive(true);
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNegoIncoming = useCallback(async ({ from, offer }: { from: string; offer: any }) => {
    console.log("peer:nego:needed",from,offer)
    const ans = await peer.getAnswer(offer);
    socket.emit('peer:nego:done', { to: from, ans });
  }, [socket]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNegoFinal = useCallback(async ({ ans }: { ans: any }) => {

    console.log("callNego final",ans)
    await peer.setLocalDescription(ans);
  }, []);

  const handleMute = useCallback(() => {
    setMuted(!muted);
  }, [muted]);

  useEffect(() => {
    peer?.peer?.addEventListener('negotiationneeded', handleNegoNeeded);
    return () => {
      peer?.peer?.removeEventListener('negotiationneeded', handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    peer?.peer?.addEventListener('track', async ev => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on('user:joined', handleUserJoined);
    socket.on('incoming:call', handleIncomingCall);
    socket.on('call:accepted', handleCallAccepted);
    socket.on('peer:nego:needed', handleNegoIncoming);
    socket.on('peer:nego:final', handleNegoFinal);

    return () => {
      socket.off('user:joined', handleUserJoined);
      socket.off('incoming:call', handleIncomingCall);
      socket.off('call:accepted', handleCallAccepted);
      socket.off('peer:nego:needed', handleNegoIncoming);
      socket.off('peer:nego:final', handleNegoFinal);
    };
  }, [socket, handleUserJoined, handleIncomingCall, handleNegoFinal, handleNegoIncoming, handleCallAccepted]);

  return (
    <>
      <div className="text-center bg-slate-200 p-2">
        <h3><b>VideoMeet</b></h3>
        {value === 'user' ? (!remoteSocketId && 'Please wait till the call arrives') : (!callActive && <h5>{remoteSocketId ? 'Learner online' : 'No one in room'}</h5>)}
        <div className="container">
          <div className="row text-start">
            <div className="col-md-6">
              {myStream && <h1>My stream</h1>}
              {myStream && <ReactPlayer style={{ backgroundColor: 'black' }} url={myStream} playing muted width={'80%'} height={'80%'} />}
            </div>
            <div className="col-md-6">
              {remoteStream && <h1>Remote stream</h1>}
              {remoteStream && <ReactPlayer style={{ backgroundColor: 'black' }}  url={remoteStream} playing muted={muted} width={'80%'} height={'80%'} />}
            </div>
          </div>
          <br />
          {callActive && <button className='btn bg-danger text-white' onClick={handleCallUser}><BsFillTelephoneXFill /></button>}
          {myStream && <>
            <button className={!muted ? 'btn btn-primary ms-3' : 'btn btn-dark ms-3'} onClick={handleMute}>{muted ? <BsMicMuteFill /> : <BsMicFill />}</button>
          </>}
          {value === 'user' && myStream && <><button className={accepted ? 'd-none' : 'btn btn-success ms-3'} onClick={sendStreams}><BsFillTelephoneFill /></button></>}
          {!callActive ? (value === 'mentor' && (remoteSocketId && <button className='btn btn-outline-success' onClick={handleCallUser}>Call</button>)) : ''}
        </div>
      </div>
    </>
  );
};

VideoCall.propTypes = {
  value: PropTypes.string.isRequired,
};


export default VideoCall;
