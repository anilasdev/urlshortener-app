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
      toast.error(urlRes.message);
    }
  };

  const onVisitUrl = (url) => {
    window.open(url, "_blank");
  };
  return (
    <>
      <ToastContainer />
      <div className="url-list container" >
        <header>
          <img src={Logo} alt="logo" className="logo" />
          <h2 data-testid="app-title">
            URL shortener <span>Get your big urls into short ones.</span>
          </h2>
        </header>
        <div className="clearfix"></div>
        <form className="add" onSubmit={handleSubmit}>
          <input
            type="text"
            name="url"
            id="new_url"
            data-testid="app-input"
            placeholder="Provide the orignal URL here..."
            onChange={handleInputChange}
            value={inputUrl}
          />
          <button type="submit" data-testid="submit-button">+ Create</button>
        </form>
        <div className="urls" data-testid="url-list">
          {tinyUrls.length
            ? tinyUrls.map((url) => (
                <div className="url" key={url.url_id}>
                  <div style={{ flexGrow: 1 }}>
                    <span className="text">{url.short_url}</span>
                  </div>
                  <p style={{ flexGrow: 1 }}>
                    clicked <span className="count">{url.clicks}</span> time
                    {url.clicks === 1 ? "" : "s"}
                  </p>
                  <FaExternalLinkAlt
                    onClick={() => onVisitUrl(url.short_url)}
                    className="external-link"
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
