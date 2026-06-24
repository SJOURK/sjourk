import { useEffect } from "react";
import ArticleGrid from "../Components/ArticleGrid";
import { setPageMeta } from "../utils/pageMeta";
import Img from "../Components/Img";

function Home() {
  useEffect(() => {
    setPageMeta({
      title: "SJO URK",
      image: "media/ogimg.jpg",
      type: "website",
    });
  }, []);

  return <main className="content" tabIndex="-1">
    <div style={{ height: '5rem' }}></div>
    <Img src="media/sjo-logo-mono.svg" width="20" />
    <div style={{ height: '1rem' }}></div>
    <h1>SJO URK</h1>
    <p>Skrypty dla studentów</p>
    <ArticleGrid />
  </main>;
}

export default Home;
