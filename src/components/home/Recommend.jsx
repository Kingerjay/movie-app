import React, { useEffect, useState } from 'react';
import axios from "axios";
import { GoArrowRight } from "react-icons/go";
import { IoTimerOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function Recommend() {
    const [responses, setResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [activeCategory, setActiveCategory] = useState("movie");

    const navigate = useNavigate()

    const trendMovie = async (category) => {
        try {
            setIsLoading(true)

            const mediaType = category === "movie" ? "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
                            : category === "tv" ? "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
                            : "https://api.themoviedb.org/3/discover/movie?with_genres=16&language=en-US";

            const res = await axios.get(
                mediaType, 

                {
                  headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg"
                },
                }
            );
            console.log("res", res.data.results);
            setResponses(res.data.results.slice(0, 8));
        } catch (error) {
            setIsLoading(false)
            
        } finally {
            setIsLoading(false)
        }
    };

        console.log(responses)

        useEffect(() => {
            trendMovie(activeCategory);
        }, [activeCategory]);


        // Navigation
        const openDetails = (id) => {
            navigate(`/details/${id}`)
        }
        // End of Navigation


  return (

    <div className='w-[80%] mx-auto my-20 '>

        {/* Top text */}
        <div className='my-6 grid grid-cols-2 lg:grid-cols-3 justify-between items-center  gap-4 '>

        <div className=''>    
        <p className='text-[24px] font-bold'>Recommended </p>
        </div>

        
        <div className='hidden lg:flex gap-4'>
        <p 
        className={`text-[24px] font-bold rounded-[15px] p-[10px] cursor-pointer ${
                            activeCategory === "movie" ? "bg-[rgba(255,0,1)]" : "border-[rgba(255,0,1)] border-[2px] opacity-[50%]"
                        } `}
        onClick={() => setActiveCategory("movie")}
        >Movies </p>

        <p 
        className={`text-[24px] font-bold rounded-[15px] p-[10px] cursor-pointer ${
                            activeCategory === "tv" ? "bg-[rgba(255,0,1)]" : "border-[rgba(255,0,1)] border-[2px] opacity-[50%]"
                        }`}
        onClick={() => setActiveCategory("tv")}
        >Series </p>

        <p 
        className={`text-[24px] font-bold rounded-[15px] p-[10px] cursor-pointer ${
                            activeCategory === "animation" ? "bg-[rgba(255,0,1)]" : "border-[rgba(255,0,1)] border-[2px] opacity-[50%]"
                        } `}
        onClick={() => setActiveCategory("animation")}
        >Animations </p>
        </div>

        <div>
        <p className=''><a href="/recommends" className='w-full flex justify-end items-center gap-2 text-[24px] font-semibold opacity-[50%] whitespace-nowrap overflow-hidden'>view all <GoArrowRight /></a> </p>
        </div>

        
        <div className='lg:hidden flex items-center gap-4'>
        <p 
        className={`text-[16px] sm:text-[24px] font-semibold rounded-[15px] p-[10px] cursor-pointer ${
                            activeCategory === "movie" ? "bg-[rgba(255,0,1)]" : "border-[rgba(255,0,1)] border-[2px] opacity-[50%]"
                        } `}
        onClick={() => setActiveCategory("movie")}
        >Movies </p>

        <p 
        className={`text-[16px] sm:text-[24px] font-semibold rounded-[15px] p-[10px] cursor-pointer ${
                            activeCategory === "tv" ? "bg-[rgba(255,0,1)]" : "border-[rgba(255,0,1)] border-[2px] opacity-[50%]"
                        }`}
        onClick={() => setActiveCategory("tv")}
        >Series </p>

        <p 
        className={`text-[16px] sm:text-[24px] font-semibold rounded-[15px] p-[10px] cursor-pointer ${
                            activeCategory === "animation" ? "bg-[rgba(255,0,1)]" : "border-[rgba(255,0,1)] border-[2px] opacity-[50%]"
                        } `}
        onClick={() => setActiveCategory("animation")}
        >Animations </p>
        </div>

        </div>
        {/* End of Top text */}

        {isLoading ? (
            "Loading..."
        ) : (

    <div className='grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 justify-between gap-x-8 gap-y-12 transition transform ease-in-out duration-500'>

        {responses.map((response, index) => (
            <div 
            className='cursor-pointer hover:scale-105' 
            key = {index}
            onClick={() => {
                    openDetails(response.id)
                }}
            >
                
                <img src= {`https://image.tmdb.org/t/p/original${response.poster_path}`} alt='{response.title}' className='w-full h-[352px] rounded-[10px] ' />

                {/* Title and Genre */}
                <div className=' flex justify-between items-center my-2'>
                    <p className='text-[24px] font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>{response.title || response.original_title || response.name}</p>
                    
                    <div className='flex items-center gap-2'>
                    <p className='text-[16px] font-[500px] bg-[rgba(255,0,1)] rounded-[10px] p-2'>HD</p>
                    <p className='flex items-center gap-2 text-[16px] font-[500px] border-[rgba(255,0,1)] border-[1px] rounded-[10px] p-2'> <IoTimerOutline /> 3:12:00</p>
                    </div>

                    </div>
                    {/* End of Title and Genre */}
            
            </div>
        ))}
    </div>

     )}

    </div>
  )
}

export default Recommend
