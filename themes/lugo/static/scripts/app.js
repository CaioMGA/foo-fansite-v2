const MOST_RECENT_YEAR = 2025
var playerControls;
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
var playlist = [];
var isPlaying = false;
var albumId = "2025";
var hideTimer;
window.addEventListener('mousemove', ResetTimer);
document.addEventListener('keypress', ResetTimer);
ResetTimer();
const albumIdList = ["2018", "2019", "2021", "2022", "2023", "2024", "2025"];
var videos = {
    "2018": { "makingOf": "-QT0Bvf2FIQ", "special": "ZYnsuCt3vLI" },
    "2019": { "makingOf": "qonY5BP_vR8", "special": "6ZIogYd0gSo" },
    "2021": { "makingOf": "gDoVGhOrM28", "special": "pm2JcAwSPG8" },
    "2022": { "makingOf": "-qgiguUuhpM", "special": "BSpZWIuiats" },
    "2023": { "makingOf": "G4-LjYf5pbY", "special": "maZoTHkRYuI" },
    "2024": { "makingOf": "qCP4vO5urds", "special": "my2GmzXPDaw" },
    "2025": { "makingOf": "qCP4vO5urds", "special": "my2GmzXPDaw" },
};
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: '',
        width: 10,
        height: 10,
        playerVars: { 'controls': 1 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    playerControls = event.target;
    Init();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == 0) { //not playing
        console.log("TERMINOU!");
        // TODO: suggest a new video
    }

    if (event.data == 1) { // playing
        ShowFullscreenMenu();
        var player = document.getElementById("player")
        player.classList.add("player-fullscreen");
        player.classList.remove("player-small");

        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        } else {
            console.log("FULLSCREEN ERROR");
        }

        ShowPlayerOnly();
    }

    if (event.data == 2) { //Paused
        ShowFullscreenMenu();
    }
}
function stopVideo() {
    player.stopVideo();
}

function loadPlaylist() {
    playlist = [];
    playerControls.stopVideo();
    playerControls.clearVideo();
    playlist.push(videos[albumId].makingOf);
    playlist.push(videos[albumId].special);
    playerControls.cuePlaylist(playlist);
}
//----------------------------------------------------------
function Init() {
    albumId = localStorage.getItem("album-id");
    console.log(albumIdList.indexOf(albumId) < 0);
    if (albumId == null || albumIdList.indexOf(albumId) < 0) {
        albumId = Math.max(...Object.getOwnPropertyNames(videos)); //gets the biggest year registered on videos array
    }
    SelectAlbum(albumId);
}

function SelectAlbum(year) {
    UpdateBackground(year);
    UpdateYearButtons(year);
    albumId = year;
    localStorage.setItem("album-id", year);

    var playerElement = document.getElementById("player");
    playerElement.classList.remove("player-fullscreen");
    playerElement.classList.add("hidden");

    document.getElementsByClassName("fullscreen-menu")[0].classList.add("hidden");

}

function UpdateBackground(year) {
    console.log(year);
    var elem = document.getElementsByTagName("body")[0];
    var moButton = document.getElementById("button-making-of");
    var spButton = document.getElementById("button-special");
    var musicPlayerButton = document.getElementById("music-player-button");
    for (var y = 2018; y <= MOST_RECENT_YEAR; y++) {
        if (y == 2020) continue;
        if (year == y) {
            elem.classList.add("body-" + y);
            moButton.classList.add("mo-" + y);
            spButton.classList.add("sp-" + y);
            musicPlayerButton.classList.add("cover-" + y + "-small")
        } else {
            elem.classList.remove("body-" + y);
            moButton.classList.remove("mo-" + y);
            spButton.classList.remove("sp-" + y);
            musicPlayerButton.classList.remove("cover-" + y + "-small")
        }
    }
}

function ShowMakingOf() {
    ShowPlayerOnly();
    playerControls.stopVideo();
    playerControls.clearVideo();
    playerControls.loadVideoById(videos[albumId].makingOf);
}

function ShowSpecial() {
    ShowPlayerOnly();
    playerControls.stopVideo();
    playerControls.clearVideo();
    playerControls.loadVideoById(videos[albumId].special);
}

function ShowMusicPlayer() {
    window.location = "/music-player.html";
}

function UpdateYearButtons(year) {
    for (var y = 2018; y <= MOST_RECENT_YEAR; y++) {
        if (y == 2020) continue;
        var elem = document.getElementById("btn-" + y);
        if (year == y) {
            elem.classList.add("button-selected-year");
        } else {
            elem.classList.remove("button-selected-year");
        }
    }
}

function ShowPlayerOnly() {
    isPlaying = true;
    document.getElementsByClassName("year_selector_container")[0].classList.add("hidden");

    document.getElementsByClassName("grid")[0].classList.add("hidden");

    document.getElementsByTagName("footer")[0].classList.add("hidden");

    document.getElementsByClassName("fullscreen-menu")[0].classList.remove("hidden");

    document.getElementById("player").classList.remove("hidden");
    document.getElementById("player").classList.remove("player-small");
    document.getElementById("player").classList.add("player-fullscreen");


}

function ShowMinimizedVideoLayout() {
    isPlaying = false;
    document.getElementsByClassName("year_selector_container")[0].classList.remove("hidden");

    document.getElementsByClassName("grid")[0].classList.remove("hidden");

    document.getElementsByTagName("footer")[0].classList.remove("hidden");

    document.getElementById("player").classList.add("hidden");
    document.getElementById("player").classList.add("player-small");
    document.getElementById("player").classList.remove("player-fullscreen");

    document.getElementsByClassName("fullscreen-menu")[0].classList.add("hidden");

    playerControls.pauseVideo();
    playerControls.clearVideo();

}

function ToggleFullscreenMenu() {
    if (IsFullscreen()) {
        ShowMinimizedVideoLayout();
    } else {
        ShowPlayerOnly();
    }
}

function IsFullscreen() {
    var pl = document.getElementsByClassName("year_selector_container")[0];
    return pl.classList.contains("hidden");
}

function ShowAboutPanel() {
    document.getElementById("about-container").classList.remove("hidden");
    console.log("Show about");

}

function GoToLyricsPage() {
    window.location.href = "./lyrics"
}

function HideAboutPanel() {
    console.log("Hide about")
    document.getElementById("about-container").classList.add("hidden");
}

function OpenMerchLink() {
    window.open("https://store.dftba.com/collections/rob-scallon");
}

function ShowZinesPage(){
    window.location.href = "./zines.html"
}

function ShowContactPanel() {
    document.getElementById("contact-container").classList.remove("hidden");
}

function HideContactPanel() {
    document.getElementById("contact-container").classList.add("hidden");
}

function HideFullscreenMenu() {
    document.getElementsByClassName("fullscreen-menu-content")[0].classList.add("hidden");
}

function ShowFullscreenMenu() {
    if (!isPlaying) return;
    document.getElementsByClassName("fullscreen-menu-content")[0].classList.remove("hidden");
}

function ResetTimer() {
    clearTimeout(hideTimer);
    ShowFullscreenMenu();
    hideTimer = setTimeout(HideFullscreenMenu, 2000);
}
