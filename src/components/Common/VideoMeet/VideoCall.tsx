import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
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
   
  const [videoEnabled, setVideoEnabled] = useState(true);
  const handleDisableVideo = () => {
    setVideoEnabled(!videoEnabled);
    const videoTracks = myStream?.getVideoTracks();
    if (videoTracks) {
      videoTracks.forEach(track => {
        track.enabled = !videoEnabled;
      });
    }
  };
  const navigate = useNavigate();
 
  const [remoteSocketId, setRemoteSocketId] = useState<string | undefined>();
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
      console.log("remoteSocketId-",remoteSocketId)
      socket.emit('socket:disconnect', { socketId: remoteSocketId });
      if (value === 'mentor') {
        navigate(mentorEndpoints.videomeetJoin);
      }
      if (value === 'user') {
        navigate(userEndpoints.videomeetJoin);
      }
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      const offer = await peer.getOffer();
      socket.emit('user:call', { to: remoteSocketId, offer });
      setMyStream(stream);
      setCallActive(true);
    }
  }, [callActive, myStream, navigate, remoteSocketId, value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleIncomingCall = useCallback(async ({ from, offer }: { from: string; offer: any }) => {

    console.log("Incoming call-",from,offer)
    setRemoteSocketId(from);
    setCallActive(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    setMyStream(stream);
    const ans = await peer.getAnswer(offer);
    socket.emit('call:accepted', { to: from, ans });
  }, []);

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
  }, [remoteSocketId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNegoIncoming = useCallback(async ({ from, offer }: { from: string; offer: any }) => {
    console.log("peer:nego:needed",from,offer)
    const ans = await peer.getAnswer(offer);
    socket.emit('peer:nego:done', { to: from, ans });
  }, []);

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
  }, [handleUserJoined, handleIncomingCall, handleNegoFinal, handleNegoIncoming, handleCallAccepted]);

  return (
    <>
      <div className="text-center flex justify-center bg-lime-200 h-screen p-2">
        
        {value === 'user' ? (
          !remoteSocketId && <h5 className="text-orange-600 font-italic">Please wait till the call arrives</h5>
        ) : (
          !callActive && <h5 className="text-black">{remoteSocketId ? '' : 'No one in room'}</h5>
        )}
        <div className="container ">
          <div className="flex flex-col md:flex-row text-start">
            <div className="md:w-1/2 mt-20">
              {myStream && <h1 className="text-black">My stream</h1>}
              {myStream && accepted && <ReactPlayer style={{ backgroundColor: 'black' }} url={myStream} playing muted className="w-full h-full" />}
            </div>
            <div className="md:w-1/2 mb-4 mt-20">
              {remoteStream && <h1 className="text-black">Remote stream</h1>}
              {remoteStream && accepted && (
                <>
                <ReactPlayer style={{ backgroundColor: 'black' }} url={remoteStream} playing muted={muted} className="w-full h-full" />
              
               </>
              )}
            </div>
          </div>
         
          {myStream && !accepted && <button className='bg-green-500 text-white rounded-full px-6 py-2 ms-3' onClick={sendStreams}>Accept Call</button>}
          {myStream && (
            <>
              <button
                className={!muted ? 'bg-blue-500 text-white rounded-full px-6 py-2 ms-3' : 'bg-gray-500 text-white rounded-full px-6 py-2 ms-3'}
                onClick={handleMute}
              >
                {muted ? 'Unmute' : 'Mute'}
              </button>
              <button className='bg-orange-500 text-white rounded-full px-6 py-2 ms-3' onClick={handleDisableVideo}>
                {videoEnabled ? 'Disable Video' : 'Enable Video'}
              </button>
            </>
          )}
          
          {callActive && <button className='bg-red-500 text-white rounded-full ml-4 px-6 py-2' onClick={handleCallUser}>End Call</button>}
          {!callActive ? (value === 'mentor' && (remoteSocketId && <button className='bg-green-500 text-white rounded-full px-6 py-2 mb-4' onClick={handleCallUser}>Call Learner</button>)) : ''}
        </div>
      </div>
    </>
  );
};

VideoCall.propTypes = {
  value: PropTypes.string.isRequired,
};


export default VideoCall;
