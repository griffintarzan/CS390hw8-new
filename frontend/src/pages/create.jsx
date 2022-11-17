import {useState} from "react";
import {Link} from "react-router-dom";

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [done, setDone] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    const requestData = JSON.stringify({title, content});
    const headers = {"content-type": "application/json"};
    console.log("here");
    fetch("http://localhost:3000/blog/create-post", {
        method: "POST",
        body: requestData, headers
    })
        .then((response) => {
            console.log("here");
            if (!response.ok) {
                throw new Error('Network response was not OK');
            } else {
                console.log("YES");
                setDone(true);
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    console.log(requestData);
  }
  if (done) {
    return (
      <div>
        <Link to="/view">Check out your blog post</Link>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
      </div>
      <button>Post</button>
    </form>
  );
}