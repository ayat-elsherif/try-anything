import { useState } from "react";
import "./App.css";
import PlayVideo from "./PlayVideo";
import VideoList from "./VideoList";

function App() {
  const [handleVideo, setHandleVideo] = useState();
  let anything;
  // const onClickOnList = (i) => {
  //   anything = i;
  //   // console.log(i, "in app parent");
  // };

  // console.log(handleVideo, "handleVideo");
  let player;
  const onClickOnList = (i) => {
    if (!player) {
      console.log("the player is empty");
    } else {
      console.log(i, "item");
      const video_details = {
        sources: [
          {
            src: i.url,
            type: i.type,
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
        poster: i.img,
        title: i.title,
        infoTitle: i.title,
        infoDescription: "Info 1 description",
      };
      player.changeSource(video_details);
    }
  };

  const onVideoPlayer = (p) => {
    console.log(p, "p for pen");
    player = p;
  };
  return (
    <div className="App">
      {/* <DateTimePicker /> */}
      <div style={{ margin: "10rem", paddingBottom: "10rem" }}>
        <PlayVideo handleClickOnVideo={anything} videoPlayer={onVideoPlayer} />
        <VideoList handleClickOnList={onClickOnList} />
      </div>
      {/* <QuillEditor /> */}
    </div>
  );
}

export default App;
