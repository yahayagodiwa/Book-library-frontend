import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";

const genres = [
      "General",
      "Fiction",
      "Non-Fiction",
      "Biography",
      "Autobiography",
      "Science Fiction",
      "Fantasy",
      "Mystery",
      "Thriller",
      "Romance",
      "Historical Fiction",
      "Horror",
      "Self-Help",
      "Health & Wellness",
      "Travel",
      "Science",
      "Technology",
      "Philosophy",
      "Psychology",
      "Religion & Spirituality",
      "Business & Economics",
      "Politics",
      "Education",
      "Art & Photography",
      "Comics & Graphic Novels",
      "Poetry",
      "Young Adult",
      "Children's Books",
      "Cooking",
      "Law",
      "Sports & Outdoors",
      "Parenting",
      "Crafts & Hobbies",
      "True Crime",
      "Memoir",
    ]

// Custom Arrow Components
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-[#1E2A38] bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
    >
      <FaChevronLeft size={20} />
    </button>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-[#1E2A38] bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
    >
      <FaChevronRight size={20} />
    </button>
  );
};


// Slider Settings
const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1, // ← Changed this to 2 instead of 1
      },
    },
  ],
};

function GenreSlider({onFilter}) {
  const [value, setValue] = useState()
  // console.log(value);

  useEffect(() => {
  if (value) {
    onFilter(value);
  }
}, [value]);

  
  return (
    <div className="my-12 relative w-[90%] mx-auto">
      
      <Slider {...sliderSettings}>
        {genres.map((genre) => (
          <div key={genre} className="px-2">
            <button className="bg-[#60A5FA] text-white w-full px-4 py-2 rounded-full
             hover:bg-blue-500 transition whitespace-nowrap"
             onClick={(e)=>setValue(genre)}>
              {genre}
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default GenreSlider;
