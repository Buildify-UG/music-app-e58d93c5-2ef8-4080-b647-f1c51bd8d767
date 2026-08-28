import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  image: string;
}

const SAMPLE_TRACKS: Track[] = [
  {
    id: 1,
    title: 'Midnight Dreams',
    artist: 'Luna Wave',
    duration: 240,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Electric Horizon',
    artist: 'Neon Pulse',
    duration: 198,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'Cosmic Journey',
    artist: 'Star Echo',
    duration: 276,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
  },
  {
    id: 4,
    title: 'Urban Beats',
    artist: 'City Sounds',
    duration: 210,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
  },
  {
    id: 5,
    title: 'Ocean Waves',
    artist: 'Coastal Vibes',
    duration: 234,
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop',
  },
];

const Index = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = SAMPLE_TRACKS[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % SAMPLE_TRACKS.length);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + SAMPLE_TRACKS.length) % SAMPLE_TRACKS.length);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / currentTrack.duration) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <audio ref={audioRef} src="" />
      
      <div className="w-full max-w-md">
        {/* Main Player Card */}
        <div className="bg-slate-700 rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-slate-600">
          {/* Album Art */}
          <div className="mb-8 relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
              <img
                src={currentTrack.image}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-4 shadow-lg">
              <Music className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Track Info */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{currentTrack.title}</h2>
            <p className="text-slate-300 text-sm">{currentTrack.artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-slate-600 rounded-full h-2 mb-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <button
              onClick={handlePrevious}
              className="p-3 rounded-full bg-slate-600 hover:bg-slate-500 text-white transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={handlePlayPause}
              className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg transition-all hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-slate-600 hover:bg-slate-500 text-white transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 mb-8">
            <Volume2 className="w-4 h-4 text-slate-300" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 h-2 bg-slate-600 rounded-full appearance-none cursor-pointer accent-purple-500"
            />
            <span className="text-xs text-slate-400 w-8 text-right">{volume}%</span>
          </div>

          {/* Playlist Preview */}
          <div className="bg-slate-600 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wide">Queue</h3>
            <div className="space-y-2">
              {SAMPLE_TRACKS.map((track, idx) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrackIndex(idx);
                    setCurrentTime(0);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    idx === currentTrackIndex
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold w-4">{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{track.title}</p>
                      <p className="text-xs opacity-75 truncate">{track.artist}</p>
                    </div>
                    <span className="text-xs opacity-75">{formatTime(track.duration)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
