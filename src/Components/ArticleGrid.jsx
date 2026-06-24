import { Link } from "react-router-dom";
import defaultArticles from "virtual:articles";
import { useResponsiveImage } from "../utils/useResponsiveImage";

function ArticleCard({ article }) {
  const { containerRef, imgRef } = useResponsiveImage(article.image);

  return <Link to={`/articles/${article.slug}`}>
    <div className="link-cover" ref={containerRef}>
      <img ref={imgRef} alt={article.imageAlt} />
      <div className="link-title">{article.title}</div>
    </div>
    <div className="link-meta">
      {article.date && <div className="link-meta__date">{article.date}</div>}
      <div className="link-meta__blurb">{article.blurb}</div>
    </div>
  </Link>;
}

function ArticleGrid({ articles }) {
  const list = articles ?? defaultArticles;

  return (
    <div className="article-grid">
      {list.map(article => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}

export default ArticleGrid;
