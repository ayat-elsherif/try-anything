import React, { Component, useEffect } from "react";
import "./videojs/skins/shaka/videojs.css";
import videojs from "video.js";
import "./videojs/components/nuevo.js";
import "./videojs/components/thumbnails.js"; // if you need it
import "./videojs/components/upnext.js";
import TempData from "./TempData.json";
export default function VideoJs() {
  let player;
  let allDataFromJson = [];
  console.log(allDataFromJson, "urls");
  useEffect(() =>
    // video properties
    {
      const videoJsOptions = {
        controls: true,
        preload: "auto",
        playsinline: "true",
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

      player.thumbnails();

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
          player.dispose();
        }
      };
    }, []);

  const handleClick = (item) => {
    if (!player) {
      console.log("no player");
      return;
    } else {
      console.log(item, "item");
      const video_details = {
        sources: [
          {
            src: item.url,
            type: item.type,
          },
        ],
        tracks: [
          {
            kind: "captions",
            src: "//url-to-captions_en.vtt",
            srlang: "en",
            label: "English",
            default: true,
          },
          {
            kind: "captions",
            src: "//url-to-captions_de.vtt",
            srlang: "de",
            label: "German",
          },
          {
            kind: "captions",
            src: "//url-to-captions_fr.vtt",
            srlang: "fr",
            label: "French",
          },
          {
            kind: "chapters",
            src: "/chapters/steal.vtt",
            srclang: "en",
            label: "Chapters",
          },
        ],
        // tracks: [{ kind: "metadata", src: "//url-to-vtt-thumbs-file.vtt" }],
        poster: item.img,
        title: item.title,
        infoTitle: item.title,
        infoDescription: "Info 1 description",
      };
      player.changeSource(video_details);
    }
  };

  allDataFromJson = TempData.course_chapter.map((item) => {
    return item.classes.map((i, index) => (
      <div
        key={index}
        onClick={() => handleClick(i)}
        style={{ display: "block" }}
      >
        {i.title}
      </div>
    ));
  });
  return (
    <>
      <div data-vjs-player>
        <video
          ref={(node) => (videojs.videoNode = node)}
          className="video-js vjs-fluid"
        />
      </div>
      {/* <button className="btn" onClick={handleClick}>
        Change source
      </button> */}
      <div>{allDataFromJson}</div>
    </>
  );
}
