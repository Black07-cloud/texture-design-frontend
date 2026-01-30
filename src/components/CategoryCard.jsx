import "./CategoryCard.css";

function CategoryCard({ title, image, onClick }) {
  return (
    <div className="category-card" onClick={onClick}>
      <img src={image} alt={title} />
      <div className="category-text">{title}</div>
    </div>
  );
}

export default CategoryCard;
