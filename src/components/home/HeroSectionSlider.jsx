import React, { useEffect, useState } from 'react';
import axios from "axios";
import { GoArrowRight } from "react-icons/go";
import { IoTimerOutline } from "react-icons/io5";
import { FaRegCalendarDays, FaStar } from 'react-icons/fa6';
import playicon from '/src/assets/play-btn.svg'
import Slider from "react-slick"; // Ensure you have installed `react-slick` and `slick-carousel`
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlayCircle } from 'react-icons/fa';
import { BsClock } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';


function HeroSectionSLider() {
    const [responses, setResponses] = useState([]);
    const [genres, setGenres] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const trendMovie = async () => {
        try {
            setIsLoading(true)

            const res = await axios.get(
                "https://api.themoviedb.org/3/trending/all/day?language=en-US", 

                {
                  headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg"
                },
                }
            );
            console.log("res", res.data.results);
            setResponses(res.data.results.slice(0, 5));
        } catch (error) {
            setIsLoading(false)
            
        } finally {
            setIsLoading(false)
        }
    };

        console.log(responses)


        const fetchGenres = async () => {

            try {
                const res = await axios.get(

                    "https://api.themoviedb.org/3/genre/movie/list?language=en-US", 

                {
                  headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg"
                },
                }

                );
                setGenres(res.data.genres);

            } catch (error) {
                
            }
        }

        const getGenreName = (id) => {
        const genre = genres.find((genre) => genre.id === id);
        return genre ? genre.name : " ";
    };


        useEffect(() => {
            trendMovie();
            fetchGenres();
        }, []);


        // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    customPaging: (i) => (
      <div className="w-[21px] h-[21px] bg-white rounded-full hover:bg-[rgba(255,0,1)] transition duration-300 cursor-pointer"></div>
    ),
    dotsClass: "slick-dots custom-dots",
  };


  // Navigation
        const openDetails = (id) => {
            navigate(`/details/${id}`)
        }
        // End of Navigation


  return (

    <div className='my-12 '>

        {isLoading ? (
            "Loading..."
        ) : (

    <Slider {...sliderSettings}>

        {responses.map((response, index) => (
            <div className='' 
            key= {index}
            onClick={() => {
                    openDetails(response.id)
                }}
            >

                <div
                    className=" h-[100vh] pt-[20rem] "
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${response.backdrop_path})`,
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                    >

                    {/* <div className='absolute top-[40%] left-[10%] '> */}
                    <div className='w-[80%] my-0 mx-auto '>

                    {/* Center Button */}
                    <div className='w-full h-full'>

                        <div className='flex justify-center items-center sm:gap-11 gap-2 '>
                                    <button className='flex items-center justify-center gap-4 text-[16px] font-[500px] bg-[rgba(255,0,1)] rounded-[5px] p-[12px]'>
                                        <p className='sm:text-[24px] font-[700px] whitespace-nowrap overflow-hidden'>Watch Now</p>
                                        <p className='text-[25px] font-[500px]'><FaPlayCircle /> </p>
                                    </button>

                                    <button className='flex items-center gap-4  border-[rgba(255,0,1)] border-[3px] rounded-[5px] p-[10px]'>
                                        <p className='sm:text-[24px] font-[700px] whitespace-nowrap overflow-hidden'>Watch Later</p>
                                        <p className='text-[20px] font-[500px]'><BsClock /> </p>
                                    </button>
                                    
                        </div>
                        
                    </div>
                    {/* End of Center Button */} 


                    {/* Hero Content */}
                    <div className=' my-4 mx-auto'>

                         {/* Title and Genre */}
                <div className=' '>
                    <p className='text-[32px] font-bold my-8'>{response.title || response.name}</p>

                    <div className="flex flex-wrap items-center gap-2">
                                    {response.genre_ids.map((genreId) => (
                                        <span
                                            key={genreId}
                                            className="text-[16px] text-black font-semibold bg-white rounded-[20px] p-[10px]"
                                        >
                                            {getGenreName(genreId)}
                                        </span>
                                    ))}

                                    <p className='flex items-center gap-2 text-[16px] font-[500px]  p-2'><FaRegCalendarDays /> {response.release_date}</p>
                                    <p className='flex items-center gap-2 text-[16px] font-[500px]  p-2'> <IoTimerOutline /> 3:12:00</p>
                                    <p className='flex items-center gap-2 text-[16px] font-[500px]  p-2'><FaStar /> {response.vote_average.toFixed(1)}</p>
                                </div>
                    <p className='hidden lg:block w-1/2 text-[16px] font-medium my-8'>{response.overview}</p>

                    </div>
                    {/* End of Title and Genre */}

                    </div>
                    {/* End of Hero Conent */}

                    </div>

                    


                    </div>
            
            </div>
        ))}
    
    
    </Slider>

     )}

    </div>
  )
}

export default HeroSectionSLider