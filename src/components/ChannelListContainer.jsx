import React, { useState } from 'react'
import { ChannelList, useChatContext, userChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./"
import ChatIcon from "../assets/ChatIcon.png"
import LogoutIcon from "../assets/logout.png"

const cookies = new Cookies()

const SideBar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={ChatIcon} alt="Hospital" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="logout" width="30" />
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (

    <div className="channel-list__header">
        <p className="channel-list__header__text">
            Neo Chat
        </p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === "team")
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === "messaging")
}


function ChannelListContent({ isCreating, setIsCreating, setCreateType, setIsEditing, setToogleContainer }) {
    const { client } = useChatContext()

    const logout = () => {
        cookies.remove("token");
        cookies.remove("userId");
        cookies.remove("username");
        cookies.remove("fullname");
        cookies.remove("avatar");
        cookies.remove("hashedPassword");
        cookies.remove("phonenumber");

        window.location.reload();
    }

    const filters = { members: { $in: [client.userID] } }

    return (
        <>
            <SideBar logout={logout} />
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                            setToogleContainer={setToogleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToogleContainer={setToogleContainer}
                            type="team"

                        />
                    )}

                />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setCreateType={setCreateType}
                            setToogleContainer={setToogleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToogleContainer={setToogleContainer}
                            type="messaging"

                        />
                    )}

                />
            </div>
        </>
    )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toogleContainer, setToogleContainer] = useState(false)
    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
            </div>
            <div className="channel-list__container-responsive"
                style={{ left: toogleContainer ? "0%" : "-89%", backgroundColor: "#005fff" }}
            >
                <div className="channel-list__container-toogle" onClick={() => setToogleContainer((prevToogleContainer) => !prevToogleContainer)}>

                </div>
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setToogleContainer={setToogleContainer}
                >

                </ChannelListContent>
            </div>
        </>
    )



}

export default ChannelListContainer