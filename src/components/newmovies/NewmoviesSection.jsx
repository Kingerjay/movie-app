import React, { useEffect, useState } from 'react';
import axios from "axios";
import { GoArrowRight } from "react-icons/go";
import { IoTimerOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function Newmovies() {
    const [responses, setResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // Utility function to convert minutes to hh:mm:ss
    const formatRuntime = (minutes) => {
        const hrs = Math.floor(minutes / 60);
        const mins = Math.floor(minutes % 60);
        const secs = Math.floor((minutes * 60) % 60);
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const trendMovie = async () => {
        try {
            setIsLoading(true);

            const res = await axios.get(
                "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
                {
                    headers: {
                        accept: "application/json",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg"
                    },
                }
            );

            const movies = res.data.results;

            // Fetch runtime for each movie
            const moviesWithRuntime = await Promise.all(
                movies.map(async (movie) => {
                    const detailsRes = await axios.get(
                        `https://api.themoviedb.org/3/movie/${movie.id}`,
                        {
                            headers: {
                                accept: "application/json",
                                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg"
                            },
                        }
                    );

                    return { ...movie, runtime: detailsRes.data.runtime };
                })
            );

            setResponses(moviesWithRuntime);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        trendMovie();
    }, []);

    const openDetails = (id) => {
        navigate(`/details/${id}`);
    };

    return (
        <div className='w-[80%] mx-auto my-16'>

            {/* Top text */}
            <div className='my-6 flex items-center justify-between'>
                <p className='text-[24px] font-bold'>New Release - Movies</p>
                
            </div>
            {/* End of Top text */}

            {isLoading ? (
                "Loading..."
            ) : (
                <div className='grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 justify-between gap-x-8 gap-y-12'>
                    {responses.map((response, index) => (
                        <div
                            className='cursor-pointer'
                            key={index}
                            onClick={() => openDetails(response.id)}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/original${response.poster_path}`}
                                alt={response.title}
                                className='w-full h-[352px] rounded-[10px]'
                            />

                            {/* Title and Genre */}
                            <div className='flex justify-between items-center my-2'>
                                <p className='text-[24px] font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>
                                    {response.title}
                                </p>

                                <div className='flex items-center gap-2'>
                                    <p className='text-[16px] font-[500px] bg-[rgba(255,0,1)] rounded-[10px] p-2'>
                                        HD
                                    </p>
                                    <p className='flex items-center gap-2 text-[16px] font-[500px] border-[rgba(255,0,1)] border-[1px] rounded-[10px] p-2'>
                                        <IoTimerOutline /> {formatRuntime(response.runtime)}
                                    </p>
                                </div>
                            </div>
                            {/* End of Title and Genre */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Newmovies;
