import React, { Component, useEffect } from "react";
import "./videojs/skins/shaka/videojs.css";
import videojs from "video.js";
import "./videojs/components/nuevo.js";
import "./videojs/components/thumbnails.js"; // if you need it
import TempData from "./TempData.json";
export default function VideoJs() {
  let player;
  let currentVideo;
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
        if (this.player) {
          this.player.dispose();
        }
      };
    }, []);

  const handleClick = (item) => {
    if (player) {
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
        ],
        // tracks: [{ kind: "metadata", src: "//url-to-vtt-thumbs-file.vtt" }],
        poster: item.img,
        title: item.title,
        infoTitle: item.title,
        infoDescription: "Info 1 description",
      };
      player.changeSource(video_details);

      // const video_1 = {
      //   sources: [
      //     {
      //       src: "/videos/offline.mp4",
      //       type: "video/mp4",
      //     },
      //   ],
      //   tracks: [{ kind: "metadata", src: "//url-to-vtt-thumbs-file.vtt" }],
      //   poster: "/images/screenshot.png",
      //   infoTitle: "Info 1 title",
      //   infoDescription: "Info 1 description",
      // };
      // const video_2 = {
      //   sources: [
      //     {
      //       src: "/videos/vr.mp4",
      //       type: "video/mp4",
      //     },
      //   ],
      //   tracks: [
      //     {
      //       kind: "captions",
      //       src: "//url-to-captions_en.vtt",
      //       srlang: "en",
      //       label: "English",
      //       default: true,
      //     },
      //     {
      //       kind: "captions",
      //       src: "//url-to-captions_de.vtt",
      //       srlang: "de",
      //       label: "German",
      //     },
      //     {
      //       kind: "captions",
      //       src: "//url-to-captions_fr.vtt",
      //       srlang: "fr",
      //       label: "French",
      //     },
      //   ],
      //   poster: "/images/awesome.jpg",
      //   title: "Video 2 title",
      //   infoTitle: "Info 2 title",
      //   infoDescription: "Info 2 description",
      // };

      // if (currentVideo === 1) {
      //   currentVideo = 2;
      //   player.changeSource(video_2);
      // } else {
      //   currentVideo = 1;
      //   player.changeSource(video_1);
      // }
    }
  };

  allDataFromJson = TempData.course_chapter.map((item) => {
    return item.classes.map((i, index) => (
      <div
        key={index}
        onClick={() => handleClick(i)}
        style={{ display: "block" }}
      >
        {i.url}
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
