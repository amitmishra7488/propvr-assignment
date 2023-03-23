import React from 'react'
import '../Style/bannersection.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const BannerSection = () => {
    const images = [
        { id: 1, src: "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/712mGi5M-hS._AC_SY355_.jpg" },
        { id: 2, src: "https://webneel.com/wnet/file/images/11-16/8-xmen-movie-poster-design.jpg" },
        { id: 3, src: "https://media.istockphoto.com/id/1303787843/vector/woman-in-mask-visit-cinema-during-covid-epidemic.jpg?s=612x612&w=0&k=20&c=MgSoDtKxklJT9v0aB3JIPHPS7QDI30jLttyDx_-dhWk=" },
        { id: 4, src: "https://img.freepik.com/free-vector/young-woman-cinema-mesmerized-girl-with-pop-corn-bucket-hands-sitting-alone-movie-theater_107791-5161.jpg" },
        { id: 5, src: "https://t3.ftcdn.net/jpg/03/29/83/26/360_F_329832695_0mUM2GZ2dZYJrzAEcfDKchInVQVL0wIq.jpg" },
      ];
      
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
            },
          },
        ],
      };
    
      return (
        <div className="carousel-container">
        <Slider {...settings}>
          {images.map((image) => (
            <div key={image.id}>
              <img src={image.src} alt={`carousel image ${image.id}`} className="crousel-img" />
            </div>
          ))}
        </Slider>
        </div>
      );
};

export default BannerSection;
