import React, { useState, useEffect } from 'react'
import { getChannel, useChatContext } from 'stream-chat-react'
import { SearchIcon } from "../assets"




function ChannelSearch() {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const getChannels = async (text) => {
        try {
            //! Fetch Channels

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
                    onChange={onSearch} />
            </div>
        </div>
    )
}

export default ChannelSearch