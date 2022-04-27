import React from "react";
import hljs from "highlight.js";
import "react-quill/dist/quill.snow.css"; // ES6
import "highlight.js/styles/hybrid.css";
import ReactQuill from "react-quill"; // ES6

hljs.configure({
  languages: ["javascript", "ruby", "python", "rust"],
});
const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];

class QuillEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  render() {
    return (
      <ReactQuill
        placeholder="etc ..."
        value={this.state.text}
        onChange={this.handleChange}
        theme="snow"
        modules={modules}
        formats={formats}
      />
    );
  }
}

export default QuillEditor;
