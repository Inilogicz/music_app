const wrapper =document.querySelector(".wrapper"),
musicImg =wrapper.querySelector(".img-area img"),
musicName =wrapper.querySelector(".song-details .name"),
musicArtist =wrapper.querySelector(".song-details .artist"),
mainAudio =wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMusicBtn = musicList.querySelector("#close");



let musicIndex = 2;

window.addEventListener('load', ()=> {
    loadMusic(musicIndex);
});
let allMusic = [
    
    {
        name:"Almighty",
        artist:"MMC students",
        img:"music-1",
        src:"music-1",
    },
    {
        name:"Comforter",
        artist:"MMC students",
        img:"music-2",
        src:"music-2",
    },
    {
        name:"I want to fly",
        artist:"Miracle Kids",
        img:"music-3",
        src:"music-3",
    },
    {
        name:"Ephraim",
        artist:"Pelumi Ojo Peter",
        img:"music-4",
        src:"music-4",
    },
    {
        name:"When we pray",
        artist:"Magnificent Sound Network",
        img:"music-5",
        src:"music-5",
    },
    {
        name:"Hay",
        artist:"MMC students",
        img:"music-6",
        src:"music-6",
    },
]

// music function
function loadMusic(indexNumb){
    musicName.innerText= allMusic[indexNumb - 1].name;
    musicArtist.innerText= allMusic[indexNumb - 1].artist;
    musicImg.src = `image/${allMusic[indexNumb - 1.].img}.jpg`,
    mainAudio.src = `music/${allMusic[indexNumb - 1.].src}.mp3`;
}

// play music
function playMusic(){
    wrapper.classList.add('paused');
    playPauseBtn.querySelector("i").innerText='pause';
    mainAudio.play();
}
// pause music
function pauseMusic(){
    wrapper.classList.remove('paused');
    playPauseBtn.querySelector('i').innerText='play_arrow';
    mainAudio.pause();
}
// next music  func
function nextMusic(){
// increment
musicIndex++;
musicIndex > allMusic.length ? musicIndex =1 : musicIndex = musicIndex;
loadMusic(musicIndex);
playMusic();
}
// next music  func
function prevMusic(){
// decrement
musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
musicIndex--;
loadMusic(musicIndex);
playMusic();
}
// play music button
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused =wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
});
nextBtn.addEventListener("click", ()=>{
    nextMusic();
});
prevBtn.addEventListener("click", ()=>{
    prevMusic();
});

// Progress bar
mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width =`${progressWidth}%`;

  
    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");
    mainAudio.addEventListener("loadeddata", ()=>{
   

    // update duration

    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration /60);
    let totalSec = Math.floor(audioDuration % 60);
    if(totalSec<10){
        totalSec =`0${totalSec}`;
    }
    musicDuration.innerText= `${totalMin}:${totalSec}`;

  
});
  // update timer while playing

    
  let currentMin = Math.floor(currentTime /60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec<10){
      currentSec =`0${currentSec}`;
  }
  musicCurrentTime.innerText= `${currentMin}:${currentSec}`;

});
progressArea.addEventListener("click", (e)=>{
    let progressWidthval= progressArea.clientWidth; 
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval ) * songDuration;
    playMusic();
});

// repeat,shuffle song according to the icon btn
const repeatBtn = wrapper.querySelector('#repeat-plist');
repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText; //getting innerText of icon
    //changes on different icon using switch
    switch(getText){
        case "repeat":
            repeatBtn.innerText = "repeat_one"; // switches the icons
            repeatBtn.setAttribute("title", "Song looped")
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle"; // switches the icons
            repeatBtn.setAttribute("title", "Playback shuffle")
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat"; // switches the icons
            repeatBtn.setAttribute("title", "Playlist looped")
            break;
    }
});
//functionality of the  shuffle button

mainAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText; //getting innerText of icon
    //changes on different icon using switch
    switch(getText){
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
           mainAudio.currentTime = 0;
           loadMusic(musicIndex);
           playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do{
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            }while(musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            break;
    }
});
showMoreBtn.addEventListener('click', ()=>{
    musicList.classList.toggle('show');
});

hideMusicBtn.addEventListener('click', ()=>{
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector('ul');
// let allMusic = [
    
//     {
//         name:"Almighty",
//         artist:"MMC students",
//         img:"music-1",
//         src:"music-1",
//     },
//     {
//         name:"Comforter",
//         artist:"MMC students",
//         img:"music-2",
//         src:"music-2",
//     },
//     {
//         name:"I want to fly",
//         artist:"Miracle Kids",
//         img:"music-3",
//         src:"music-3",
//     },
//     {
//         name:"Ephraim",
//         artist:"Pelumi Ojo Peter",
//         img:"music-4",
//         src:"music-4",
//     },
//     {
//         name:"When we pray",
//         artist:"Magnificent Sound Network",
//         img:"music-5",
//         src:"music-5",
//     },
//     {
//         name:"Hay",
//         artist:"MMC students",
//         img:"music-6",
//         src:"music-6",
//     },
// ]

for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li>
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class='${allMusic[i].src}'src="songs/${allMusic[i].src}.mp3"></audio>
                    <span id='${allMusic[i].src}' class="audio-duration"></span>
                </li>`;
                

                    ulTag.insertAdjacentHTML("beforeend", liTag);
                    

                    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
                    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
                    

                    liAudioTag.addEventListener("loadeddata", ()=>{
                        let audioDuration = liAudioTag.duration;
                        let totalMin = Math.floor(audioDuration / 60);
                        let totalSec = Math.floor(audioDuration % 60);
                            if(totalSec < 10){ 
                                totalSec = `0${totalSec}`;
                            }
                        liAudioDuration.innerText= `${totalMin}:${totalSec}`;
                    });

}