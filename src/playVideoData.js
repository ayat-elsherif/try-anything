export const videoData = [
  {
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
  },
  {
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
  },
];
