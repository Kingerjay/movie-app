import React, { useEffect, useState } from 'react';
import axios from "axios";
import { GoArrowRight } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

function RecentlySection() {
    const [responses, setResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // Fetch on-the-air TV shows
    const fetchOnTheAirShows = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(
                "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
                {
                    headers: {
                        accept: "application/json",
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg"
                    }
                }
            );
            const results = res.data.results;

            // Fetch additional details for each show
            const detailedResults = await Promise.all(
                results.map(async (show) => {
                    const details = await axios.get(
                        `https://api.themoviedb.org/3/tv/${show.id}?language=en-US`,
                        {
                            headers: {
                                accept: "application/json",
                                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjNiNWIxMzYxZmE5NWY3ZWUyMDIzOWQyYWEyY2MzMyIsIm5iZiI6MTczMzEzOTgwMy4wMzAwMDAyLCJzdWIiOiI2NzRkOWQ1YmQ1Nzc0N2YyMTE1Nzk2YTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8BVLny9htNLteTsai6RAxfkEl_9vIoHo1Jox-8NqMjg"
                            }
                        }
                    );
                    const { last_episode_to_air } = details.data;
                    return {
                        ...show,
                        season_number: last_episode_to_air?.season_number || 1,
                        episode_number: last_episode_to_air?.episode_number || 1,
                        air_date: last_episode_to_air?.air_date || "Unknown",
                    };
                })
            );

            setResponses(detailedResults);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOnTheAirShows();
    }, []);


    // Navigation
        const openDetails = (id) => {
            navigate(`/details/${id}`)
        }
        // End of Navigation

    return (
        <div className="w-[80%] mx-auto my-16">
            {/* Top text */}
            <div className="my-6">
                <p className="text-[24px] font-medium">Recently Updated</p>
            </div>
            {/* End of Top text */}

            {isLoading ? (
                "Loading..."
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 sm:gap-x-12 sm:justify-between gap-y-12 md:gap-x-48 ">
                    {responses.map((response, index) => (
                        <div 
                        className="flex gap-6 w-[350px] cursor-pointer" 
                        key={index}
                        onClick={() => {
                    openDetails(response.id)
                }}
                        >
                            {/* Poster */}
                            <img
                                src={`https://image.tmdb.org/t/p/original${response.poster_path}`}
                                alt={response.name}
                                className="w-[64px] h-[103px] rounded-[10px]"
                            />

                            {/* Title and Details */}
                            <div className="my-2">
                                <p className="text-[16px] font-medium">{response.name}</p>
                                <p className="text-[16px] font-normal">
                                    Season {response.season_number}, Episode {response.episode_number}
                                </p>
                                <p className="text-[16px] font-normal">{response.air_date}</p>
                            </div>
                        </div>
                    ))}

                    

                </div>
            )}
        </div>
    );
}

export default RecentlySection;

