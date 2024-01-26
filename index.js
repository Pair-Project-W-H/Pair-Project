

  var now_playing = document.querySelector(".now-playing");
  var track_art = document.querySelector(".track-art");
  var track_name = document.querySelector(".track-name");
  var track_artist = document.querySelector(".track-artist");

  var playpause_btn = document.querySelector(".pause-track");
  var next_btn = document.querySelector(".next-track");
  var prev_btn = document.querySelector(".prev-track");

  var seek_slider = document.querySelector(".seek_slider");
  var volume_slider = document.querySelector(".volume_slider");
  var curr_time = document.querySelector(".current-time");
  var total_duration = document.querySelector(".total-duration");

  var musicIndex = 0; 
  var isPlaying = false;
  var updateTimer;

  var curr_track = document.createElement('audio');

  var myMusicList = [
      { name: "Overdrive", artist: "Ofenbach feat. Norma Jean Martine", image: "https://i.ytimg.com/vi/YV8P4aEXzMU/maxresdefault.jpg", path: "Ofenbach-Overdrive-feat.-Norma-Jean-Martine-_Official-Music-Video_.mp3" },
      { name: "Mockingbird", artist: "Eminem", image: "https://townsquare.media/site/812/files/2023/03/attachment-eminem-mockingbird-single-art.jpg?w=1200", path: "Eminem - Mockingbird (Lyrics).mp3" },
      { name: "Creepin", artist:"Metro Boomin, The Weeknd, 21 Savage", image: "https://bananastreet.ru/system/release/cover/9/97/97293/7445806a90.jpg", path: "Creepin.mp3" },
      { name: "MAGHRIBI", artist:"ElGrandeToto", image: "https://i.scdn.co/image/ab67616d0000b2734b64480afb10f1d182a17b95", path: "ElGrandeToto - MAGHRIBI (Audio).mp3" },
      { name: "Superman", artist:"Eminem", image: "https://i.pinimg.com/originals/63/fb/32/63fb32b02c2d1ae59a0f194d7a4bfd03.jpg", path: "Eminem - Superman (Lyrics).mp3" },
      { name: "back at it", artist:"Gunna", image: "https://i1.sndcdn.com/artworks-neAeMPnlc89Y7MEI-1QcxOQ-t500x500.jpg", path: "Gunna - back at it [Official Visualizer].mp3" },
      { name: "Bad Liar", artist:"Imagine Dragons", image: "https://i1.sndcdn.com/artworks-000527091948-ykpqq9-t500x500.jpg", path: "Imagine Dragons - Bad Liar (Official Music Video).mp3"},
      { name: "Bad", artist:"Ninho feat. Omah Lay", image: "https://i1.sndcdn.com/artworks-QMAHCoVFfcuq-0-t500x500.jpg", path: "Ninho - Bad feat. Omah Lay (Clip Officiel).mp3" },
      { name: "Code", artist:"Samara", image: "https://artwork.anghcdn.co/webp/?id=191253448&size=320", path: "Samara - Code  (Audio).mp3" },
      { name: "Thanks God", artist:"Travis Scott", image: "https://i.ytimg.com/vi/UVtTc4zqbxQ/maxresdefault.jpg", path: "Travis Scott - THANK GOD (Official Audio).mp3" },
      { name: "شطر عفريت", artist:"El Castro", image: "https://i.ytimg.com/vi/kaDw7ol6tTc/maxresdefault.jpg", path: "ZOMRA  King  شطر عفريت (Uncensored).mp3" },
      { name: "Carry Out", artist:"Timbaland", image: "https://i.ytimg.com/vi/hpqrHVKAZnM/maxresdefault.jpg", path: "Timbaland - Carry Out (Official Music Video) ft. Justin Timberlake.mp3" }
    ];

    
  function loadTrack(index) {
    clearInterval(updateTimer);
    resetValues();
    curr_track.src = myMusicList[index].path;
    curr_track.load();
    track_art.style.backgroundImage = "url(" + myMusicList[index].image + ")"; // target l image 
    
    track_name.textContent = myMusicList[index].name;
    track_artist.textContent = myMusicList[index].artist;
    
      now_playing.textContent = "PLAYING " + (index + 1) + " OF " + myMusicList.length
    updateTimer = setInterval(nextMusic, 1000)
    curr_track.addEventListener("ended", nextTrack)
    
  }


  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }


  function playpauseTrack() {
    if (!isPlaying) {
      curr_track.play();
      isPlaying = true;
      playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    } else {
      curr_track.pause();
      isPlaying = false;
      playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
  }


  function nextTrack() {
    if (musicIndex < myMusicList.length - 1) {
      musicIndex = musicIndex + 1;
    } else {
      musicIndex = 0;
    }
    loadTrack(musicIndex);
    playTrack();
  }


  function prevTrack() {
    if (musicIndex > 0) {
      musicIndex = musicIndex - 1;
    } else {
      musicIndex = myMusicList.length - 1;
    }
    loadTrack(musicIndex);
    playTrack();
  }


  function position() {
    curr_track.currentTime = curr_track.duration * (seek_slider.value / 100);
  }


  function setVolume() {
    curr_track.volume = volume_slider.value / 100;
  }


  function nextMusic() {

    var seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
      
      seekPosition = (curr_track.currentTime / curr_track.duration) * 100;

      seek_slider.value = seekPosition;

          // 7sebna l wa9t in minutes 
        var currentMinutes = Math.floor(curr_track.currentTime / 60);
        // el 93ad m sec kamlna 7sebneh 
      var currentSeconds = Math.floor(curr_track.currentTime % 60);
      //
      var durationMinutes = Math.floor(curr_track.duration / 60);
      var durationSeconds = Math.floor(curr_track.duration % 60);

      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      } else {
        currentMinutes = currentMinutes;
      }
      
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      } else {
        currentSeconds = currentSeconds;
      }
      
      if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
      } else {
        durationMinutes = durationMinutes;
      }
      
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      } else {
        durationSeconds = durationSeconds;
      }

      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;

    }
  }

                  loadTrack(musicIndex);
    




