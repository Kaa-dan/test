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

  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    name: "",
    message: "",
    stars: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load local reviews from localStorage
  useEffect(() => {
    const storedReviews = localStorage.getItem(`product-reviews-${productId}`);
    if (storedReviews) {
      setLocalReviews(JSON.parse(storedReviews));
    }
  }, [productId]);

  // Remove approved reviews from local storage
  useEffect(() => {
    const filteredLocalReviews = localReviews.filter(
      (localReview) =>
        !approvedReviews?.some(
          (approvedReview) => approvedReview.message === localReview.message
        )
    );

    if (filteredLocalReviews.length !== localReviews.length) {
      localStorage.setItem(
        `product-reviews-${productId}`,
        JSON.stringify(filteredLocalReviews)
      );
      setLocalReviews(filteredLocalReviews);
    }
  }, [approvedReviews, localReviews, productId]);

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

    if (!newReview.name || !newReview.message || newReview.stars === 0) {
      alert("Please fill in all fields and select a star rating");
      return;
    }

    const reviewToSubmit = {
      _id: Date.now().toString(),
      product: productId,
      name: newReview.name,
      message: newReview.message,
      stars: newReview.stars,
      approved: false,
      createdAt: new Date().toISOString(),
    };

    createReview({
      product: productId,
      name: newReview.name,
      message: newReview.message,
      stars: newReview.stars,
      approved: false,
    });

    const updatedLocalReviews = [...localReviews, reviewToSubmit];
    localStorage.setItem(
      `product-reviews-${productId}`,
      JSON.stringify(updatedLocalReviews)
    );
    setLocalReviews(updatedLocalReviews);

    setNewReview({
      name: "",
      message: "",
      stars: 0,
    });
    setIsModalOpen(false);
  };

  // Combine approved and local reviews, excluding duplicates
  const allReviews = [
    ...(approvedReviews || []),
    ...localReviews.filter(
      (localReview) =>
        !approvedReviews?.some(
          (approvedReview) => approvedReview.message === localReview.message
        )
    ),
  ];

  const totalStars = allReviews.reduce((sum, review) => sum + review.stars, 0);
  const avgRating = allReviews.length > 0 ? totalStars / allReviews.length : 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="flex items-center justify-center h-[500px] bg-primary-black">
          <div className="colorful-loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary-white">
      <div className="space-y-6">
        {/* Average Rating and Summary */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Average Rating Section */}
              <div className="flex items-center space-x-4">
                <div className="text-5xl font-bold text-primary-black">
                  {avgRating.toFixed(1)}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[...Array(Math.floor(avgRating))].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 md:w-6 md:h-6 text-primary-orange fill-current"
                      />
                    ))}
                    {avgRating % 1 !== 0 && (
                      <Star className="w-5 h-5 md:w-6 md:h-6 text-primary-orange fill-current" />
                    )}
                  </div>
                  <span className="text-sm text-primary-black">
                    {allReviews.length} reviews
                  </span>
                </div>
              </div>

              {/* Star Distribution Section */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = allReviews.filter(
                    (r) => r.stars === star
                  ).length;
                  const percentage = (count / allReviews.length) * 100;
                  return (
                    <div key={star} className="flex items-center space-x-2">
                      <span className="text-sm text-primary-black">
                        {star} Star
                      </span>
                      <div className="relative w-full md:w-40 h-3 bg-gray-300 rounded">
                        <div
                          className="absolute h-3 bg-primary-orange rounded"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-primary-black">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Write a Review Button */}
            <div className="flex justify-center md:justify-end mt-4 md:mt-0">
              <button
                className="bg-primary-orange text-primary-white py-2 px-4 rounded-md hover:bg-primary-orange/90 transition-colors w-full md:w-auto"
                onClick={() => setIsModalOpen(true)}
              >
                Write a review
              </button>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="masonry-layout">
          {allReviews.map((review, index) => (
            <div
              key={review._id}
              className={`masonry-item${(index % 5) + 1} shadow-md`}
            >
              <div className="flex items-center mb-2">
                <div className="flex items-center space-x-1">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-primary-orange fill-current"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-primary-black">
                  {new Date(review.createdAt || "").toLocaleDateString()}
                </span>
              </div>
              <h4 className="font-bold text-base text-primary-black">
                {review.name}
              </h4>
              <p className="text-primary-black font-medium text-sm mt-2">
                {review.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="p-5 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
            <form onSubmit={handleSubmitReview} className="space-y-4">
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
                          ? "text-primary-orange fill-current"
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

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="py-2 px-4 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-orange text-white py-2 px-4 rounded-md hover:bg-primary-orange/90 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
