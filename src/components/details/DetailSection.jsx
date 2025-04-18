import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { IoTimerOutline } from "react-icons/io5";
import { FaRegCalendarDays, FaStar } from 'react-icons/fa6';
import ReactPlayer from 'react-player';

const DetailSection = () => {
    const [responses, setResponses] = useState("");
    const [cast, setCast] = useState([]);
    const [season, setSeason] = useState([])
    const [episode, setEpisode] = useState([])
    const [similar, setSimilar] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState([]);
    const [trailerKey, setTrailerKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {id } = useParams();
    const {epi_id} = useParams();

    const navigate = useNavigate();


    // Utility function to convert minutes to hh:mm:ss
    const formatRuntime = (minutes) => {
        const hrs = Math.floor(minutes / 60);
        const mins = Math.floor(minutes % 60);
        const secs = Math.floor((minutes * 60) % 60);
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getMovieDetails = async () => {
        try {
            setIsLoading(true)

            const res = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
                {
                    headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg",
                },
            }
            )

            setResponses(res.data)


        } catch (error) {
            setIsLoading(false)
            
        } finally {
            setIsLoading(false)
        }
    }


                const getMovieCredits = async () => {
        try {
            setIsLoading(true)

            const res = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/credits`,
                {
                    headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg",
                },
            }
            )

            setCast(res.data.cast.slice(0,5))
            console.log(res.data.cast)


        } catch (error) {
            setIsLoading(false)
            
        } finally {
            setIsLoading(false)
        }
    }


    const getTvDetails = async () => {
        try {
            setIsLoading(true)

            const res = await axios.get(
                `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
                {
                    headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg",
                },
            }
            )

            setResponses(res.data)
            console.log(res.data)


        } catch (error) {
            setIsLoading(false)
            
        } finally {
            setIsLoading(false)
        }
    }


    // Similar Movies
    const getSimilarMovies = async () => {
        try {
            setIsLoading(true)

            const res = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
                {
                    headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg",
                },
            }
            )

            setSimilar(res.data.results.slice(0,8))
            console.log(res.data.results)


        } catch (error) {
            setIsLoading(false)
            
        } finally {
            setIsLoading(false)
        }
    }
    // End of Similar Movies

    // Similar Tvs
    const getSimilarTvs = async () => {
        try {
            setIsLoading(true)

            const res = await axios.get(
                `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`,
                {
                    headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg",
                },
            }
            )

            setSimilar(res.data.results.slice(0,8))
            console.log(res.data.results)


        } catch (error) {
            setIsLoading(false)
            
        } finally {
            setIsLoading(false)
        }
    }
    // End of Similar Tvs

    // Fetching the Seasonsfor Tv series
    const getSeasonNumber = async () => {
        try {
            setIsLoading(true);

            const res = await axios.get(
                `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
                {
                    headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg",
                },
            }

            )

            setSeason(res.data)
            console.log(res.data)

        } catch (error) {
            setIsLoading(false)

        } finally {
            setIsLoading(false)
        }
    }


    const getEpisodeDetails  = async () => {
        try {
            setIsLoading(true);

        const res = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/season/${epi_id}?language=en-US`, 

            {
                    headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg",
                },
            }

        )

        setEpisode(res.data)
        console.log(res.data)



        } catch (error) {
            setIsLoading(false)

        } finally {
            setIsLoading(false)
        }
    }


    // Fetching the Trailer
    const getMovieTrailer = async () => {
        try {
            setIsLoading(true)
            
            const res = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
                {
                    headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg",
                },
            }
            )

            const trailer = res.data.results.find(
                (video) => video.type === "Trailer" && video.site === "YouTube"
            );
            setTrailerKey(trailer ? trailer.key : "");

        } catch (error) {
            setIsLoading(false)

        } finally {
            setIsLoading(false)
        }
    }


    // Fetching the Tv Trailer
    const getTvTrailer = async () => {
        try {
            setIsLoading(true)
            
            const res = await axios.get(
                `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
                {
                    headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg",
                },
            }
            )

            const trailer = res.data.results.find(
                (video) => video.type === "Trailer" && video.site === "YouTube"
            );
            setTrailerKey(trailer ? trailer.key : "");

        } catch (error) {
            setIsLoading(false)

        } finally {
            setIsLoading(false)
        }
    }



    // Fetch episodes for the selected season whenever it changes
            const getEpisodeDetailsForSeason  = async () => {
        try {
            setIsLoading(true);

        const res = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?language=en-US`, 

            {
                    headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg",
                },
            }

        )

        setEpisode(res.data)
        console.log(res.data)



        } catch (error) {
            setIsLoading(false)

        } finally {
            setIsLoading(false)
        }
    }


        

            




    useEffect(() => {
        getMovieDetails();
        getMovieCredits();
        getTvDetails();
        getSimilarMovies();
        getSimilarTvs();
        getSeasonNumber();
        getEpisodeDetails();
        getMovieTrailer();
        getTvTrailer();
        getEpisodeDetailsForSeason();
    }, [id, epi_id, selectedSeason]);

    // Navigation
        const openDetails = (id) => {
            navigate(`/details/${id}`)
        }
        // End of Navigation
    


  return (
    <div className='w-[80%] mx-auto my-16'>
       
        {/* Video Player */}
                    {isLoading? ("Loading...") : (trailerKey && (
                        <div className="w-full mb-8">
                            <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${trailerKey}`}
                                width="100%"
                                height="500px"
                                controls={true}
                                playing={false}
                            />
                        </div>
                    ))}
                    

        {isLoading ? (
            "Loading..."
        ) : (
            
            <div className='flex flex-col lg:flex-row gap-12 mt-16'>
                
                {/* Poster Image */}
                <div>
                    <img src= {`https://image.tmdb.org/t/p/original${responses.poster_path}`} alt='{response.title}' className='w-full lg:w-[352px] h-[350px] md:h-[580px] rounded-[10px] ' />
                </div>
                {/* End of Poster Image */}

                {/* Content Details */}
                <div className='lg:w-[70%] '>

                    <div className='w-full lg:flex justify-between items-center gap-8'>
                        <p className='text-[34px] font-semibold'>{responses.title || responses.name}</p>
                        <p className='w-fit flex items-center gap-4  bg-[rgba(255,0,1)] rounded-[15px] p-4'><FaPlus /> Add to Favourite</p>       
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-4 mt-16">
                                    {responses.genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="text-[16px] text-black font-semibold bg-white rounded-[10px] p-[10px]"
                                >
                                    {genre.name}
                                </span>
                            ))}

                                    <p className='flex items-center gap-2 text-[16px] font-[500px]  p-2'><FaRegCalendarDays /> {responses.release_date || responses.first_air_date}</p>
                                    
                                    <p className='flex items-center gap-2 text-[16px] font-[500px]  p-2'>
                                         <IoTimerOutline />{formatRuntime(responses.runtime) || responses.episode_run_time}</p>

                                    <p className='flex items-center gap-2 text-[16px] font-[500px]  p-2'><FaStar /> {responses.vote_average?.toFixed(1)}</p>
                                </div>

                                    <p className='w-full text-[16px] font-medium my-8'>{responses.overview}</p>

                                    <ul className=' lg:w-[500px] flex flex-col gap-4 my-12'>
                                        <li>Country : {responses.production_countries?.map((c) => c.name).join(", ")}</li>
                                        <li>Genre : {responses.genres?.map((genre) => genre.name).join(', ')}</li>
                                        <li>Date Released : {responses.release_date || responses.first_air_date} </li>
                                        <li>Production :{responses.production_companies?.map((prod) => prod.name).slice(0,3).join(', ')}</li>
                                        <li>Cast : {cast.map((actors) => actors.name).join(', ')}</li>
                                    </ul>

                                    
                                        
                                </div>

                </div>
                {/* End of Content Details */}

           
            
            
            </div>
                            
        )}


        {/* Seasons list */}
            <div className='my-12'>

            {/* Dropdown for Seasons */}
            <label htmlFor="season-select" className="block text-[16px] font-semibold mb-4">
                Select a Season
            </label>
            <select
                id="season-select"
                className="w-full sm:w-fit bg-black text-white p-2 rounded-md"
                onChange={(e) => setSelectedSeason(e.target.value)}
                value={selectedSeason}
            >
                {season.seasons?.map((s, index) => (
                <option key={index} value={s.season_number}>
                    {s.name}
                </option>
                ))}
            </select>

            {/* Episode List */}
            <div className='my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6'>
                {episode.episodes?.map((e, index) => (
                <div 
                    key={index} 
                    className='bg-[rgba(217,217,217,1)] text-black w-full h-[60px] flex items-center pl-4 rounded-md hover:text-white hover:bg-[rgba(255,0,1)] transition-all duration-300'
                > 
                    {e.name}
                </div>
                ))}  
            </div>

            </div>
            {/* End of Seasons list */}



         {/* Similar Videos Sectoin */}
            <div className='mt-28'>
                <p className='text-[24px] font-semibold'>You may also like</p>
                {isLoading ? (
            "Loading..."
        ) : (
                <div className='grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 justify-between gap-x-8 gap-y-12 my-4 transition transform ease-in '>
                    
                {similar.map((movie) => (

                    <div 
                    key={movie.id}
                    onClick={() => {
                    openDetails(movie.id)
                }}
                    className='cursor-pointer hover:scale-105'
                    >
                        <img
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt={movie.title}
                        className='w-full h-[300px] object-cover rounded-[10px]'
                        />

                        {/* Title and Genre */}
                <div className=' flex justify-between items-center my-2'>
                    <p className='text-[20px] font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>{movie.title || movie.name || movie.original_name}</p>
                    
                    <div className='flex items-center gap-2'>
                    <p className='text-[16px] font-[500px] bg-[rgba(255,0,1)] rounded-[10px] p-2'>HD</p>
                    <p className='flex items-center gap-2 text-[16px] font-medium border-[rgba(255,0,1)] border rounded-[10px] p-2 whitespace-nowrap overflow-hidden'>
                    {season.seasons && season.seasons.length > 0 ? season.seasons[0].name : 'No season'}
</p>
                    </div>

                    </div>
                    {/* End of Title and Genre */}
            
                    </div>

                ))}
                </div>
        )}
            </div>
            {/* End of Similar Videos Sectoin */}

    </div>
  )
}

export default DetailSection