import PropTypes from 'prop-types';
import WaveSurfer from 'wavesurfer.js';
import React, { useRef, useMemo, useState, useEffect } from 'react';

import { uploadclaimFileInAWSS3 } from 'src/utils/aws-s3-file-handler';

import Play from './view/assets/Play.svg';
import Send from './view/assets/Send.svg';
import Pause from './view/assets/Pause.svg';
import Microphone from './view/assets/Microphone.svg';

function Recorder({ updateData }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [renderdAudio, setRenderdAudio] = useState(null);
  // const [recordedAudiourl, setRecordedAudiourl] = useState(null);
  const [waveform, setWaveform] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const waveFormRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prevDuration) => {
          setTotalDuration(prevDuration + 1);
          return prevDuration + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: '#ccc',
      progressColor: '#4e9eff',
      cursorColor: '#7ae3c3',
      barWidth: '2',
      height: '30',
      responsive: true,
    });
    setWaveform(wavesurfer);
    wavesurfer.on('finish', () => setIsPlaying(false));
    return () => wavesurfer.destroy();
  }, []);

  useEffect(() => {
    if (!(recordedAudio instanceof Element || recordedAudio instanceof HTMLAudioElement)) {
      console.error('recordedAudio is not a valid DOM element or audio object.');
      return;
      // Return early if recordedAudio is not valid
    }

    const updatePlaybackTime = () => setCurrentPlaybackTime(recordedAudio.currentTime);
    recordedAudio.addEventListener('timeupdate', updatePlaybackTime);
  }, [recordedAudio, setCurrentPlaybackTime]);

  const handleStartRecording = () => {
    setRecordingDuration(0);
    setCurrentPlaybackTime(0);
    setTotalDuration(0);
    setIsRecording(true);
    setRecordedAudio(null);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioRef.current.srcObject = stream;
        const chunks = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/ogg:codecs=opus' });
          const audioURL = URL.createObjectURL(blob);
          const audio = new Audio(audioURL);
          setRecordedAudio(audio);
          waveform.load(audioURL);
        };
        mediaRecorder.start();
      })
      .catch((error) => {
        console.error('Error accessing microphone', error);
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      waveform.stop();
      const audioChunks = [];
      mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });
      mediaRecorderRef.current.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        const audioFile = new File([audioBlob], 'recording.mp3', { type: 'audio/mp3' });
        setRenderdAudio(audioFile);
      });
    }
  };

  const handlePlayRecording = () => {
    if (recordedAudio) {
      waveform.stop();
      waveform.play();
      recordedAudio.play();
      setIsPlaying(true);
    }
  };

  const handlePauseRecording = () => {
    waveform.stop();
    if (recordedAudio) {
      recordedAudio.pause();
      setIsPlaying(false);
    }
  };

  const uploadAudio = useMemo(
    () => async (file) => {
      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await uploadclaimFileInAWSS3(formData);
        const fileUrl = response?.data?.data || {};

        if (fileUrl) {
          updateData(fileUrl.preview);
        } else {
          console.error('Error in uploading file:', response);
        }
      } catch (error) {
        console.error('Error in uploading file:', error);
      }
    },
    [updateData]
  );

  const sendRecording = () => {
    if (renderdAudio) {
      uploadAudio(renderdAudio);

      console.log('Recorded audio URL saved in local storage:', renderdAudio.type);
    } else {
      console.log('No recorded audio available');
    }
  };

  const formatTime = (time) => {
    if (Number.isNaN(time)) return '00.00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter') {
      action();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        fontSize: '24px',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        padding: '4px 1px',
      }}
    >
      <div
        style={{
          margin: '0 7px',
          padding: '2px 18px',
          color: 'gray',
          display: 'flex',
          gap: '3',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(211, 211, 211, 0.5)',
          borderRadius: '16px',
          boxShadow: '1px 1px -1px black',
        }}
      >
        {isRecording ? (
          <div
            style={{
              color: '#FF033E',
              borderRadius: '10px',
              padding: '1px 2px',
              textAlign: 'center',
              fontSize: '10px',
            }}
          >
            Recording..{' '}
            <span style={{ fontSize: '8px', color: '#FF033E' }}>{recordingDuration}</span>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {recordedAudio && (
              <>
                {!isPlaying ? (
                  <div
                    onClick={handlePlayRecording}
                    onKeyDown={(e) => handleKeyDown(e, handlePlayRecording)}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src={Play}
                      alt="Play"
                      style={{
                        marginRight: '7px',
                        height: '21px',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                ) : (
                  <div
                    onClick={handlePauseRecording}
                    onKeyDown={(e) => handleKeyDown(e, handlePauseRecording)}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src={Pause}
                      alt="Pause"
                      style={{
                        color: 'gray',
                        marginRight: '7px',
                        height: '21px',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
        <div
          ref={waveFormRef}
          hidden={isRecording}
          style={{
            width: '4.5rem',
            backgroundColor: '#9ca3af',
            padding: '1px 6px',
            borderRadius: '9px',
            fontSize: '12px',
            color: 'gray',
            height: '25px',
          }}
        />

        {recordedAudio && isPlaying && (
          <span style={{ fontSize: '14px', marginLeft: '6px', color: 'green' }}>
            {formatTime(totalDuration)}
          </span>
        )}
        <audio ref={audioRef} hidden>
          <track
            kind="captions"
            src="path_to_captions.vtt"
            srcLang="en"
            label="English Captions"
            default
          />
        </audio>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!isRecording ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={handleStartRecording}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleStartRecording();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <img
                src={Microphone}
                alt="Microphone"
                style={{
                  color: 'gray',
                  marginLeft: '8px',
                  height: '22px',
                  fill: 'red',
                }}
              />
            </div>
          ) : (
            <div onClick={handleStopRecording} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
              <img
                src={Pause}
                alt="Stop"
                style={{ color: 'gray', marginLeft: '8px', height: '22px', cursor: 'pointer' }}
              />
            </div>
          )}
        </div>
        {recordedAudio && (
          <div
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={sendRecording}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                sendRecording();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <img
              src={Send}
              alt="Send"
              style={{
                fontSize: '22px',
                color: '#333',
                marginRight: '4px',
                marginLeft: '12px',
                cursor: 'pointer',
              }}
              title="SEND"
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default Recorder;

Recorder.propTypes = {
  updateData: PropTypes.func,
};
