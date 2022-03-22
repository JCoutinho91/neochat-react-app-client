import React, { useState, useEffect } from 'react'
import { getChannel, useChatContext } from 'stream-chat-react'
import { SearchIcon } from "../assets"
import ResultsDropdown from './ResultsDropDown';


function ChannelSearch({ setToogleContainer }) {
    const { client, setActiveChannel } = useChatContext()
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [teamChannels, setTeamChannels] = useState([])
    const [directChannels, setDirectChannels] = useState([])

    useEffect(() => {
        if (!query) {
            setTeamChannels([])
            setDirectChannels([])
        }
    }, [])


    const getChannels = async (text) => {
        try {
            const channelResponse = client.queryChannels({
                type: "team",
                name: { $autocomplete: text },
                members: { $in: [client.userID] }
            })
            const usersResponse = client.queryUsers({
                id: { $ne: client.userID },
                name: { $autocomplete: text }
            })
            const [channels, { users }] = await Promise.all([channelResponse, usersResponse]);

            if (channels.length) setTeamChannels(channels)
            if (users.length) setDirectChannels(users)

        } catch (error) {
            setQuery("");
        }
    }


    const onSearch = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setQuery(e.target.value);
        getChannels(e.target.value)
    }

    const setChannel = (channel) => {
        setQuery("")
        setActiveChannel(channel)
    }

    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon />
                </div>
                <input className='channel-search__input__text'
                    placeholder='Search'
                    type="text"
                    value={query}
                    onChange={onSearch}
                />
            </div>
            {query && (
                <ResultsDropdown
                    teamChannels={teamChannels}
                    directChannels={directChannels}
                    isLoading={isLoading}
                    setChannel={setChannel}
                    setQuery={setQuery}
                    setToogleContainer={setToogleContainer}

                />
            )}
        </div>
    )
}

export default ChannelSearch