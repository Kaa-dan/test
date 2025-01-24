import React, { useState, useEffect } from "react";
import {
  useProductReviews,
  useCreateReview,
  Review,
} from "@/components/hooks/product-hooks";
import { Star } from "lucide-react";

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { data: approvedReviews, isLoading } = useProductReviews(productId);
  const { mutate: createReview } = useCreateReview();

  // State for local storage reviews
  const [localReviews, setLocalReviews] = useState<Review[]>([]);

  // State for new review form
  const [newReview, setNewReview] = useState({
    name: "",
    message: "",
    stars: 0,
  });

  // Load local reviews from localStorage on component mount
  useEffect(() => {
    const storedReviews = localStorage.getItem(`product-reviews-${productId}`);
    if (storedReviews) {
      setLocalReviews(JSON.parse(storedReviews));
    }
  }, [productId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStarClick = (starCount: number) => {
    setNewReview((prev) => ({ ...prev, stars: starCount }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!newReview.name || !newReview.message || newReview.stars === 0) {
      alert("Please fill in all fields and select a star rating");
      return;
    }

    // Create review object
    const reviewToSubmit = {
      _id: Date.now().toString(), // Temporary local ID
      product: productId,
      name: newReview.name,
      message: newReview.message,
      stars: newReview.stars,
      approved: false,
      createdAt: new Date().toISOString(),
    };

    // Submit to backend
    createReview({
      product: productId,
      name: newReview.name,
      message: newReview.message,
      stars: newReview.stars,
      approved: false,
    });

    // Update local storage
    const updatedLocalReviews = [...localReviews, reviewToSubmit];
    localStorage.setItem(
      `product-reviews-${productId}`,
      JSON.stringify(updatedLocalReviews)
    );
    setLocalReviews(updatedLocalReviews);

    // Reset form
    setNewReview({
      name: "",
      message: "",
      stars: 0,
    });
  };

  // Combine approved reviews with local reviews
  const allReviews = [
    ...(approvedReviews || []),
    ...localReviews.filter(
      (localReview) =>
        !approvedReviews?.some(
          (approvedReview) => approvedReview._id === localReview._id
        )
    ),
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-orange"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>

      {/* Reviews List */}
      <div className="space-y-6">
        {allReviews.map((review) => (
          <div key={review._id} className="border-b pb-6">
            <div className="flex items-center mb-2">
              <div className="flex items-center space-x-1">
                {[...Array(review.stars)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {new Date(review.createdAt || "").toLocaleDateString()}
              </span>
            </div>
            <h4 className="font-medium">{review.name}</h4>
            <p className="text-gray-600 mt-2">{review.message}</p>
          </div>
        ))}
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmitReview} className="space-y-4">
        <h3 className="text-xl font-semibold">Write a Review</h3>
        <div>
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newReview.name}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block mb-2">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((starCount) => (
              <Star
                key={starCount}
                className={`w-6 h-6 cursor-pointer ${
                  newReview.stars >= starCount
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
                onClick={() => handleStarClick(starCount)}
              />
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block mb-2">
            Review
          </label>
          <textarea
            id="message"
            name="message"
            value={newReview.message}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
            rows={4}
            placeholder="Write your review here"
          />
        </div>

        <button
          type="submit"
          className="bg-primary-orange text-white py-3 px-6 rounded-md hover:bg-primary-orange/90 transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ProductReviews;
