import { useState, useEffect } from "react";
import { fetchTinyUrls, createTinyUrl } from "./Api";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Logo from "./logo.svg";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [tinyUrls, setTinyUrls] = useState([]);

  useEffect(() => {
    getUrls();
  }, []);

  const getUrls = async (url) => {
    let urls = await fetchTinyUrls();
    console.log(urls, "urls");
    if (urls.success) {
      setTinyUrls(urls.results);
    } else {
      console.log(urls);
    }
  };
  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let urlRes = await createTinyUrl({ url: inputUrl });
    if (urlRes.success) {
      setTinyUrls([urlRes, ...tinyUrls]);
      toast("Successfully created.");
      setInputUrl("");
    } else {
      console.log(urlRes);
      toast.error(urlRes.message);
    }
  };

  const onVisitUrl = (url) => {
    window.open(url, "_blank");
  };
  return (
    <>
      <ToastContainer />
      <div class="url-list container">
        <header>
          <img src={Logo} alt="logo" className="logo" />
          <h2>
            URL shortener <span>Get your big urls into short ones.</span>
          </h2>
        </header>
        <div class="clearfix"></div>
        <form class="add" onSubmit={handleSubmit}>
          <input
            type="text"
            name="url"
            id="new_url"
            placeholder="Provide the orignal URL here..."
            onChange={handleInputChange}
            value={inputUrl}
          />
          <button type="submit">+ Create</button>
        </form>
        <div class="urls">
          {tinyUrls.length
            ? tinyUrls.map((url) => (
                <div class="url" key={url.url_id}>
                  <div style={{ flexGrow: 1 }}>
                    <span class="text">{url.short_url}</span>
                  </div>
                  <p style={{ flexGrow: 1 }}>
                    clicked <span class="count">{url.clicks}</span> time
                    {url.clicks === 1 ? "" : "s"}
                  </p>
                  <FaExternalLinkAlt
                    onClick={() => onVisitUrl(url.short_url)}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default App;
