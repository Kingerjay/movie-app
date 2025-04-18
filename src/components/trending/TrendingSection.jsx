import React, { useEffect, useState } from 'react';
import axios from "axios";
import { GoArrowRight } from "react-icons/go";
import { IoTimerOutline } from "react-icons/io5";
import { FaStar } from 'react-icons/fa6';
import playicon from '/src/assets/play-btn.svg'
import { useNavigate } from 'react-router-dom';


function Sectionone() {
    const [responses, setResponses] = useState([]);
    const [genres, setGenres] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

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
            setResponses(res.data.results);
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
        return genre ? genre.name : null;
    };


        useEffect(() => {
            trendMovie();
            fetchGenres();
        }, []);

        const openDetails = (id) => {
            navigate(`/details/${id}`)
        }

  return (

    <div className='w-[80%] mx-auto my-16 '>

        {/* Top text */}
        <div className='my-6 flex  items-center justify-between'>
        <p className='text-[24px] font-bold'>Trending</p>
        
        </div>
        {/* End of Top text */}

        {isLoading ? (
            "Loading..."
        ) : (

    <div className='grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 justify-between gap-x-8 gap-y-12'>

        {responses.map((response, index) => (
            <div 
                className=' cursor-pointer' 
                key = {index} 
                onClick={() => {
                    openDetails(response.id)
                }}
            >

                <div
                    className="w-full h-[352px] rounded-[10px] relative"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${response.backdrop_path})`,
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                    >
                    
                    <div className='flex justify-between items-center py-4 px-4'>
                    <p className='flex items-center gap-2 text-[16px] font-[500px]  p-2'> <IoTimerOutline /> 3:12:00</p>
                    <p className='flex items-center gap-2 text-[16px] font-[500px]  p-2'><FaStar /> {response.vote_average.toFixed(1)}</p>
                    </div>

                    <div className='flex justify-center items-center w-full h-[50%]'>
                        <img src={playicon} alt="" />
                        </div>

                    </div>

                {/* Title and Genre */}
                <div className=' flex justify-between items-center my-2'>
                    <p className='text-[24px] font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>{response.title || response.name}</p>

                    <div className="flex flex-wrap gap-2">
                                    {response.genre_ids.slice(0, 1).map((genreId) => (
                                        <span
                                            key={genreId}
                                            className="text-[16px] font-normal bg-[rgba(255,0,1)] rounded-[10px] p-2"
                                        >
                                            {getGenreName(genreId)}
                                        </span> 
                                    ))}
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

export default Sectionone