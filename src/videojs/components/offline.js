import videojs from"video.js";const defaults={offlineImage:"",offlineTimeout:30,liveSource:"",offlineCountdown:!1,liveStream:"",label:"restart"},registerPlugin=videojs.registerPlugin||videojs.plugin;try{videojs.options.vhs.maxPlaylistRetries=1}catch(e){}try{videojs.options.errorDisplay=!1}catch(e){}const onPlayerReady=(e,t)=>{function i(e){return e.charAt(0).toUpperCase()+e.slice(1)}t.label=i(t.label);var n,o=e.el(),l=null,r=null,f=function(e,t){try{return e.querySelector(t)}catch(e){return!1}},s=f(o,".vjs-loading-spinner");if(""!=t.offlineImage){document.createElement("img").src=t.offlineImage;var a=f(o,".vjs-error-display");a&&a.setAttribute("style","display:none!important");(l=document.createElement("div")).className="vjs-poster";l.setAttribute("style",'top:100%;z-index:998;opacity:1;pointer-events:"none";background-color:#000;');o.appendChild(l);l.style.backgroundImage="url("+t.offlineImage+")";l.style.height=0;setInterval(function(){if(!e.isOffline){var t=o.className;if(t.indexOf("vjs-has-started")>-1&&t.indexOf("vjs-ended")>-1){e.isOffline=!0;p()}}},500);e.on("error",function(){if(!e.isOffline){var t=e.error();if(1==t.code||2==t.code||4==t.code||3==t.code||-2==t.code){e.isOffline=!0;p()}}});e.offline.liveSource=function(e){t.liveStream=e};e.on("playing",function(){s&&s.removeAttribute("style");l.style.height=0;l.style.display="none";e.isOffline=!1;clearTimeout(n);try{o.removeChild(r)}catch(e){}r=null})}function c(){l.style.top=0;l.style.height="100%";l.style.display="block";if(t.offlineCountdown&&null==r){(r=document.createElement("div")).setAttribute("style","position:absolute;right:30px;bottom:25px;font-size:20px;color:#fff;font-family:sans-serif,Arial;text-shadow:1px 1px 1px #000;z-Index:999");o.appendChild(r)}}function u(){c()}function d(t){var i=new XMLHttpRequest;void 0!==t.withCredentials&&(i.withCredentials=!0);i.onload=function(){if(200===this.status){e.src(t);e.load();e.play();e.isOffline=!1;return!0}e.isOffline=!0;p()};i.onerror=function(){e.isOffline=!0;p()};void 0!==t.src?i.open("HEAD",t.src):i.open("HEAD",t);i.send()}function p(){s&&s.setAttribute("style","display:none!important");t.clock=0;t.liveStream=e.currentSource();u();function i(){clearTimeout(n);n=setTimeout(function(){t.clock++;t.offlineCountdown&&r&&(r.innerHTML=t.label+" "+m(t.offlineTimeout-t.clock));if(t.clock>=t.offlineTimeout){t.clock=0;e.trigger("offlineLoop");d(t.liveStream)}i()},1e3)}t.offlineCountdown&&null!=r&&(r.innerHTML=t.label+" "+m(t.offlineTimeout));t.clock=0;i()}function m(e){var t=parseInt(e,10);return[Math.floor(t/3600),Math.floor(t/60)%60,t%60].map(e=>e<10?"0"+e:e).filter((e,t)=>"00"!==e||t>0).join(":")}},offline=function(e){this.ready(()=>{onPlayerReady(this,videojs.mergeOptions(defaults,e))})};registerPlugin("offline",offline);offline.VERSION="2.0";export default offline;