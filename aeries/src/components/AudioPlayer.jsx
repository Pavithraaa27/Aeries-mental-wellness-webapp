import { useRef, useState, useEffect } from "react";
import Icon from "./AppIcon";

export default function AudioPlayer({ audioUrl = "/assets/audio/breathing_478.mp3" }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(null);
  const [volume, setVolume] = useState(1);

  // Handle audio URL changes - reset player state when switching between tools
  useEffect(() => {
    if (audioRef.current) {
      console.log('AudioPlayer switched to:', audioUrl);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setError(null);
    }
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleError = (e) => setError("Failed to load audio file");
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handlePlayClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => setError("Unable to play audio"));
    }
  };

  const handlePauseClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleResumeClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => setError("Unable to play audio"));
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col gap-4 p-4 bg-card rounded-lg therapeutic-shadow">
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="auto"
        crossOrigin="anonymous"
      />

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        {!isPlaying ? (
          <button
            onClick={handlePlayClick}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium"
          >
            <Icon name="Play" size={18} />
            Play
          </button>
        ) : (
          <>
            <button
              onClick={handlePauseClick}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Icon name="Pause" size={18} />
              Pause
            </button>
            <button
              onClick={handleStop}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Icon name="Square" size={18} />
              Stop
            </button>
          </>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <Icon name="Volume2" size={18} className="text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-border rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}