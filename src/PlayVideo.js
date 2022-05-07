import React, { Component, useEffect, useState } from "react";
import "./videojs/skins/shaka/videojs.css";
import videojs from "video.js";
import "./videojs/components/nuevo.js";
import "./videojs/components/thumbnails.js"; // if you need it
import "./videojs/components/upnext.js";

export default function VideoJs({ handleClickOnVideo, videoPlayer }) {
  let player;
  // const [currentVideo, setCurrentVideo] = useState();
  console.log(handleClickOnVideo, "handleClickOnVideo");
  useEffect(() =>
    // video properties
    {
      const videoJsOptions = {
        controls: true,
        preload: "auto",
        playsinline: "true",
        // autoplay: "muted",
        // "controlBar.remainingTimeDisplay.displayNegative": false,
        poster: "/images/screenshot.png",
        sources: [
          {
            src: "/videos/offline.mp4",
            type: "video/mp4",
          },
        ],
      };

      // initialize Video.js

      player = videojs(
        videojs.videoNode,
        videoJsOptions,
        function onPlayerReady() {
          console.log("Player ready.");
        }
      );

      // Nuevo plugin options

      const nuevoOptions = {
        // logo: "//url-to-logo-image.png",
        logourl: "//url-to go on logo-click.com",
      };

      // Initialize Nuevo plugin

      player.nuevo(nuevoOptions);
      // player.upnext(TempData);

      // Initialize thumbnails plugin if required

      // player.thumbnails();

      player.on("nuevoReady", function () {
        var track = {
          kind: "metadata",
          src: "https://cdn.nuevodevel.com/media/sprite.vtt.vtt?c=3",
        };
        this.loadTracks(track);
      });

      return () => {
        // destroy player on unmount
        if (player) {
          console.log(player, "unomunt");
          player.dispose();
        }
      };
    }, []);
  const returnVideoPlayer = (player) => {
    videoPlayer(player);
  };
  return (
    <>
      <div data-vjs-player>
        <video
          ref={(node) => (videojs.videoNode = node)}
          className="video-js vjs-fluid"
        />
      </div>

      {/* <div>{allDataFromJson}</div> */}
    </>
  );
}
