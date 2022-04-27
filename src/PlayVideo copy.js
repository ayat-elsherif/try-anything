import React, { Component } from "react";
import "./videojs/skins/shaka/videojs.css";
import videojs from "video.js";
import "./videojs/components/nuevo.js";
import "./videojs/components/thumbnails.js"; // if you need it

export default class VideoJs extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    // video properties

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

    this.player = videojs(
      this.videoNode,
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

    this.player.nuevo(nuevoOptions);

    // Initialize thumbnails plugin if required

    this.player.thumbnails();

    this.player.on("nuevoReady", function () {
      var track = {
        kind: "metadata",
        src: "https://cdn.nuevodevel.com/media/sprite.vtt.vtt?c=3",
      };
      this.loadTracks(track);
    });
  }

  handleClick(event) {
    if (this.player) {
      const video_1 = {
        sources: [
          {
            src: "/videos/offline.mp4",
            type: "video/mp4",
          },
        ],
        tracks: [{ kind: "metadata", src: "//url-to-vtt-thumbs-file.vtt" }],
        poster: "/images/screenshot.png",
        infoTitle: "Info 1 title",
        infoDescription: "Info 1 description",
      };
      const video_2 = {
        sources: [
          {
            src: "/videos/vr.mp4",
            type: "video/mp4",
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
        poster: "/images/awesome.jpg",
        title: "Video 2 title",
        infoTitle: "Info 2 title",
        infoDescription: "Info 2 description",
      };
      if (this.currentVideo === 1) {
        this.currentVideo = 2;
        this.player.changeSource(video_2);
      } else {
        this.currentVideo = 1;
        this.player.changeSource(video_1);
      }
    }
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <>
        <div data-vjs-player>
          <video
            ref={(node) => (this.videoNode = node)}
            className="video-js vjs-fluid"
          />
        </div>
        <button className="btn" onClick={this.handleClick}>
          Change source
        </button>
      </>
    );
  }
}
