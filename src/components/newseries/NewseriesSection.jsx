import React, { useEffect, useState } from 'react';
import axios from "axios";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

function NewSeries() {
    const [responses, setResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const trendMovie = async () => {
        try {
            setIsLoading(true)

            const res = await axios.get(
                "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1", 

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

        useEffect(() => {
            trendMovie();
        }, []);


        // Navigation
        const openDetails = (id,epi_id) => {
            navigate(`/details/${id}`)
        }
        // End of Navigation


  return (

    <div className='w-[80%] mx-auto my-16 '>

        {/* Top text */}
        <div className='my-6 flex items-center justify-between'>
        <p className='text-[24px] font-bold'>New Release - Series</p>
        
        </div>
        {/* End of Top text */}

        {isLoading ? (
            "Loading..."
        ) : (

    <div className='grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 justify-between gap-x-8 gap-y-12 '>

        {responses.map((response, index) => (
            <div 
            className='cursor-pointer' 
            key = {index}
            onClick={() => {
                    openDetails(response.id)
                }}
            >

                <div
                    className=" w-full h-[352px] rounded-[10px] relative"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${response.poster_path})`,
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                    >
                    
                    <p className='text-[16px] font-[500px] bg-[rgba(255,0,1)] w-fit ml-4 absolute top-2 rounded-[10px] p-2'>EP 6</p>
                    </div>
                

                

                {/* Title and Genre */}
                <div className=' flex justify-between items-center my-2'>
                    <p className='text-[24px] font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>{response.title || response.name}</p>

                    <div className='flex items-center gap-2'>
                    <p className='text-[16px] font-[500px] bg-[rgba(255,0,1)] rounded-[10px] p-2'>HD</p>
                    <p className='flex items-center gap-2 text-[16px] font-[500px] border-[rgba(255,0,1)] border-[1px] rounded-[10px] p-2'> Season<span> 1</span></p>
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

export default NewSeries
