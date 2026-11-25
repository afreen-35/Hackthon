
import React, { useState, useRef, useEffect } from "react";

const songs = [
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "Divide",
    duration: "3:54",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "linear-gradient(135deg,#f5a6c5,#9274e8)",
    art: "💗"
  },
  {
    title: "Summer Vibes",
    artist: "Music Collection",
    album: "Summer Hits",
    duration: "4:12",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "linear-gradient(135deg,#f8c18d,#ec8fae)",
    art: "🌅"
  },
  {
    title: "Relaxing Music",
    artist: "Music Collection",
    album: "Peaceful",
    duration: "3:45",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "linear-gradient(135deg,#a5c9e9,#a88ce9)",
    art: "🌙"
  },
  {
    title: "Dream Music",
    artist: "Music Collection",
    album: "Dreams",
    duration: "4:30",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    color: "linear-gradient(135deg,#a4dfc5,#8b9fe8)",
    art: "✨"
  },
  {
    title: "Midnight Dreams",
    artist: "Music Collection",
    album: "Night",
    duration: "3:40",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    color: "linear-gradient(135deg,#9c91d9,#e4a1c8)",
    art: "🌌"
  },
  {
    title: "Ocean Waves",
    artist: "Music Collection",
    album: "Nature",
    duration: "5:10",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    color: "linear-gradient(135deg,#7ecbd0,#8b9fe8)",
    art: "🌊"
  }
];

const artists = [
  { name: "Ed Sheeran", emoji: "🎤" },
  { name: "Taylor Swift", emoji: "🎀" },
  { name: "Arijit Singh", emoji: "🎵" },
  { name: "Ariana Grande", emoji: "🌸" },
  { name: "The Weeknd", emoji: "🎧" }
];

function MusicPlayer() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState([]);
  const [activeTab, setActiveTab] = useState("Home");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  const audioRef = useRef(null);

  const song = songs[current];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume / 100;

    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, current]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const nextSong = () => {
    const next = shuffle
      ? Math.floor(Math.random() * songs.length)
      : (current + 1) % songs.length;

    setCurrent(next);
    setPlaying(true);
  };

  const previousSong = () => {
    setCurrent((current - 1 + songs.length) % songs.length);
    setPlaying(true);
  };

  const selectSong = (index) => {
    setCurrent(index);
    setPlaying(true);
  };

  const toggleLike = (index) => {
    setLiked((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  const filteredSongs = songs
    .map((item, index) => ({ ...item, index }))
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.artist.toLowerCase().includes(search.toLowerCase());

      if (activeTab === "Liked Songs") {
        return matchesSearch && liked.includes(item.index);
      }

      return matchesSearch;
    });

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="app-shell">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">♫</span>
          <span>Melody<span className="brand-light">Wave</span></span>
        </div>

        <p className="side-label">MENU</p>

        <nav className="main-nav">
          {["Home", "Search", "Your Library"].map((item) => (
            <button
              key={item}
              className={`nav-link ${activeTab === item ? "active" : ""}`}
              onClick={() => {
                setActiveTab(item);
                setSearch("");
              }}
            >
              <span>
                {item === "Home" ? "⌂" : item === "Search" ? "⌕" : "▤"}
              </span>
              {item}
            </button>
          ))}
        </nav>

        <div className="playlist-label">
          <p className="side-label">YOUR PLAYLISTS</p>
          <button onClick={() => setActiveTab("Home")}>＋</button>
        </div>

        <div className="sidebar-playlists">
          <button className="playlist-shortcut" onClick={() => setActiveTab("Home")}>
            <span className="playlist-mini">♫</span> Daily Mix
          </button>
          <button className="playlist-shortcut" onClick={() => setActiveTab("Home")}>
            <span className="playlist-mini">☀</span> Chill Vibes
          </button>
          <button className="playlist-shortcut" onClick={() => setActiveTab("Home")}>
            <span className="playlist-mini">♡</span> Love Songs
          </button>
          <button className="playlist-shortcut" onClick={() => setActiveTab("Liked Songs")}>
            <span className="liked-mini">♥</span> Liked Songs
          </button>
        </div>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <span>✦</span>
            <b>Enjoy Premium Music</b>
            <p>Discover your favorite songs every day.</p>
            <button onClick={() => alert("Premium feature coming soon!")}>
              Explore
            </button>
          </div>

          <div className="profile">
            <div className="avatar">M</div>
            <div>
              <b>Music Lover</b>
              <small>Free Account</small>
            </div>
            <span className="profile-dots">•••</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        <div className="topbar">
          <div className="history-buttons">
            <button onClick={() => setActiveTab("Home")}>‹</button>
            <button onClick={() => setActiveTab("Your Library")}>›</button>
          </div>

          <div className="top-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search songs, artists..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveTab("Search");
              }}
            />
          </div>

          <button
            className="premium-btn"
            onClick={() => alert("Premium feature coming soon!")}
          >
            ✦ Explore Premium
          </button>
        </div>

        {/* WELCOME BANNER */}
        <section className="welcome-row">
          <div>
            <p className="eyebrow">YOUR DAILY SOUNDTRACK</p>
            <h1>Feel the Music<span className="gradient-dot">.</span></h1>
            <p className="subheading">
              Discover new sounds and enjoy every moment.
            </p>
          </div>
          <div className="sound-orb">♫</div>
        </section>

        {/* QUICK PLAYLISTS */}
        <section className="quick-grid">
          {[
            ["🌸", "Chill Vibes", "#fce5f0"],
            ["☀️", "Happy Hits", "#fff0d9"],
            ["🌙", "Night Mood", "#eae5ff"],
            ["💗", "Love Songs", "#ffe5ee"],
            ["🎧", "Daily Mix", "#e2f4f0"],
            ["✨", "New Music", "#f1e7ff"]
          ].map(([emoji, name, color]) => (
            <button
              className="quick-tile"
              key={name}
              onClick={() => {
                setSearch("");
                setActiveTab("Home");
              }}
            >
              <span className="quick-art" style={{ background: color }}>
                {emoji}
              </span>
              {name}
            </button>
          ))}
        </section>

        {/* SONG CARDS */}
        <section className="content-section">
          <div className="section-heading">
            <h2>
              {activeTab === "Liked Songs"
                ? "Your Liked Songs"
                : activeTab === "Search"
                ? "Search Results"
                : "Popular Albums"}
            </h2>
            <button className="text-button" onClick={() => setActiveTab("Your Library")}>
              View all
            </button>
          </div>

          <div className="card-grid">
            {filteredSongs.map((item) => (
              <div
                className="music-card"
                key={item.index}
                onClick={() => selectSong(item.index)}
              >
                <div
                  className="cover"
                  style={{ background: item.color }}
                >
                  {item.art}
                </div>
                <h3>{item.title}</h3>
                <p>{item.artist}</p>
              </div>
            ))}
          </div>

          {filteredSongs.length === 0 && (
            <p className="empty-state">No songs found. Try another search.</p>
          )}
        </section>

        {/* SONG LIST */}
        <section className="content-section">
          <div className="section-heading">
            <h2>Trending Songs</h2>
            <button className="text-button" onClick={() => setSearch("")}>
              Clear search
            </button>
          </div>

          <div className="track-list">
            {filteredSongs.map((item, index) => (
              <div className="track-row" key={item.index}>
                <span className="track-num">{index + 1}</span>

                <div
                  className="track-thumb"
                  style={{ background: item.color }}
                >
                  {item.art}
                </div>

                <div
                  className="track-info"
                  onClick={() => selectSong(item.index)}
                  style={{ cursor: "pointer" }}
                >
                  <b>{item.title}</b>
                  <small>{item.artist}</small>
                </div>

                <span className="track-album">{item.album}</span>

                <button
                  className={`icon-button ${liked.includes(item.index) ? "liked" : ""}`}
                  onClick={() => toggleLike(item.index)}
                >
                  {liked.includes(item.index) ? "♥" : "♡"}
                </button>

                <span className="duration-label">{item.duration}</span>

                <button
                  className="icon-button"
                  onClick={() => selectSong(item.index)}
                >
                  ▶
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ARTISTS */}
        <section className="content-section">
          <div className="section-heading">
            <h2>Popular Artists</h2>
          </div>

          <div className="artist-grid">
            {artists.map((artist) => (
              <div className="artist-card" key={artist.name}>
                <div
                  className="artist-photo"
                  style={{ background: "#eee7ff" }}
                >
                  {artist.emoji}
                </div>
                <b>{artist.name}</b>
                <small>Artist</small>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* BOTTOM MUSIC PLAYER */}
      <footer className="player">
        <div className="now-playing">
          <div
            className="mini-cover"
            style={{ background: song.color }}
          >
            {song.art}
          </div>

          <div className="now-text">
            <b>{song.title}</b>
            <small>{song.artist}</small>
          </div>

          <button
            className="like-btn"
            onClick={() => toggleLike(current)}
          >
            {liked.includes(current) ? "♥" : "♡"}
          </button>
        </div>

        <div className="player-center">
          <div className="player-controls">
            <button
              className={shuffle ? "control-active" : ""}
              onClick={() => setShuffle(!shuffle)}
              title="Shuffle"
            >
              ⤨
            </button>

            <button onClick={previousSong} title="Previous">
              |◀
            </button>

            <button
              className="play-btn"
              onClick={() => setPlaying(!playing)}
              title={playing ? "Pause" : "Play"}
            >
              {playing ? "Ⅱ" : "▶"}
            </button>

            <button onClick={nextSong} title="Next">
              ▶|
            </button>

            <button
              className={repeat ? "control-active" : ""}
              onClick={() => setRepeat(!repeat)}
              title="Repeat"
            >
              ↻
            </button>
          </div>

          <div className="progress-row">
            <span>{formatTime(currentTime)}</span>

            <input
              type="range"
              min="0"
              max={duration || 100}
              value={Math.min(currentTime, duration || 100)}
              onChange={(e) => {
                const time = Number(e.target.value);
                if (audioRef.current) {
                  audioRef.current.currentTime = time;
                  setCurrentTime(time);
                }
              }}
            />

            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="player-extra">
          <button
            className="lyrics-toggle"
            onClick={() => setShowLyrics(true)}
          >
            ♬ Lyrics
          </button>

          <span>🔊</span>

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>

        <audio
          ref={audioRef}
          src={song.url}
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onEnded={() => {
            if (repeat) {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
              }
            } else {
              nextSong();
            }
          }}
        />
      </footer>

      {/* LYRICS POPUP */}
      {showLyrics && (
        <div className="modal-backdrop" onClick={() => setShowLyrics(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowLyrics(false)}
            >
              ✕
            </button>

            <h2>{song.title}</h2>
            <p>{song.artist}</p>

            <div className="lyrics-body">
              Lyrics are not available for this sample audio.
              <br />
              Enjoy listening to your music!
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default MusicPlayer;
