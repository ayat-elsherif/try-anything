import "./App.css";
import DateTimePicker from "./components/DateTimePicker";
import PlayVideo from "./PlayVideo";
import QuillEditor from "./QuillEditor";
import VideoJS from "./VideoJS";

function App() {
  return (
    <div className="App">
      {/* <DateTimePicker /> */}
      <div style={{ margin: "10rem", paddingBottom: "10rem" }}>
        <PlayVideo />
      </div>
      {/* <QuillEditor /> */}
    </div>
  );
}

export default App;
