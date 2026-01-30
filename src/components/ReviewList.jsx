import "./Review.css";

function ReviewList({ reviews = [] }) {
  const isAdmin = !!localStorage.getItem("adminToken");

  if (!reviews.length) {
    return <p className="no-reviews">No reviews yet</p>;
  }

  return (
    <div className="review-list">
      {reviews.map((r) => (
        <div key={r._id} className="review-card">
          <h4>
            {r.name} <span>({r.email})</span>
          </h4>

          <p className="stars">{"⭐".repeat(r.rating)}</p>

          <p className="review-comment">{r.comment}</p>

          {/* 🔐 ADMIN DELETE ONLY */}
          {isAdmin && (
            <button
              className="delete-review"
              onClick={async () => {
                if (!window.confirm("Delete this review?")) return;

                const token = localStorage.getItem("adminToken");

                await fetch(
                  `https://texture-design-backend.onrender.com/api/reviews/${r._id}`,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                window.location.reload();
              }}
            >
              🗑 Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReviewList;