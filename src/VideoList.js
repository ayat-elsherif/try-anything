import React from "react";
import TempData from "./TempData.json";

function VideoList({ handleClickOnList }) {
  let allDataFromJson = [];

  const handleVideoData = (i) => {
    // console.log(i, "I' in video list");
    handleClickOnList(i);
  };
  allDataFromJson = TempData.course_chapter.map((item) => {
    return item.classes.map((i, index) => (
      <div
        key={index}
        onClick={() => handleVideoData(i)}
        style={{ display: "block" }}
      >
        {i.title}
      </div>
    ));
  });

  return <div>{allDataFromJson}</div>;
}

export default VideoList;
