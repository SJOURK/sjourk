import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const articles = import.meta.glob("../../articles/**/*.md", {
  query: "?raw",
  import: "default",
});

export default function Article() {
  const { "*": slug } = useParams();
  const safeSlug = slug?.toLowerCase().match(/^[a-z0-9-_\/]+$/)?.[0];

  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    if (!safeSlug) {
      setMarkdown("# Invalid article");
      return;
    }

    const currentSlug = safeSlug;
    setMarkdown("Loading…");

    const loader = articles[`../../articles/${currentSlug}.md`];
    if (!loader) {
      setMarkdown("# Article not found");
      return;
    }

    loader()
      .then(text => {
        if (currentSlug === safeSlug) setMarkdown(text);
      })
      .catch(() => {
        setMarkdown("# Error\nFailed to load article");
      });
  }, [safeSlug]);

  return <div id="Article">
    <div className='content'><Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw,
        rehypeSlug,
      ]}
    >{markdown}</Markdown></div>
  </div>;
}
