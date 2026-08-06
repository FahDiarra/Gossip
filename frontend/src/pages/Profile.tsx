
import {
    Calendar,
    MapPin,
    Link as LinkIcon,
    Briefcase,
    Camera,
    Settings,
    Share2,
    Grid3X3,
    Image,
    Video,
    Info,
    UserPlus,
    MessagesSquare
} from "lucide-react";
import "@/styles//Profile.css";

import { useState } from "react";

// import PostCard from "@/components/Post/PostCard";

export default function Profile() {

    const [activeTab, setActiveTab] = useState("posts");

    const user = {
        fullName: "John Smith",
        username: "@johnsmith",
        bio:
            "Software Engineer • Coffee lover • Music • Travel • Building Gossip ",
        avatar:
            "https://i.pravatar.cc/300?img=12",

        cover:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400",

        location: "Charlotte, NC",
        website: "www.gossip.com",
        work: "Software Engineer",
        joined: "August 2026",
        posts: 124,
        followers: 5280,
        following: 832,
        Likes: 245


    };

    const posts = [

        {
            id:1,
            text:"Building something new with Gossip ",
            image:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        },

        {
            id:2,
            text:"Weekend with friends 🔥",
            image:
                "https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
        }

    ];



    const photos = [

        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",

        "https://images.unsplash.com/photo-1521737711867-e3b97375f902",

        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",

        "https://images.unsplash.com/photo-1534528741775-53994a69daeb",

        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",

        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"

    ];



    const videos = [

        "https://example.com/video1.mp4",

        "https://example.com/video2.mp4"

    ];




    return (

        <main className="gp-profile-page">
         <div className="gp-profile--wrapper">
            {/* COVER */}

            <section className="gp-profile-cover">
                <div className="gp-profile-cover__wrapper">
                  <img src={user.cover}  alt=""   />
                   <button className="gp-cover-edit">
                    <Camera size={18} />
                    <span>Change cover</span>
                   </button>
                </div>
            </section>

            {/* HEADER */}

            <section className="gp-profile-header">
                <div className="gp-profile-avatar">
                    <img src={user.avatar}   alt=""   />
                    <button>
                        <Camera size={18} />
                    </button>
                </div>

                <div className="gp-profile-info">
                    <div className="gp-profile-top">
                        <div>
                            <h1>
                                {user.fullName}
                            </h1>
                            <span>
                                {user.username}
                            </span>
                        </div>

                        <div className="gp-profile-actions">
                            <button className="primary">
                                <MessagesSquare size={18} />
                                Message
                            </button>
                            <button className="primary">
                                <UserPlus size={18} />
                                Follow
                            </button>

                            <button className="primary">
                                <Settings size={18} />
                                Edit Profile
                            </button>

                            <button>
                                <Share2 size={18} />
                            </button>

                        </div>
                    </div>



                    <div className="gp-profile-details">
                        <span>
                            <Briefcase size={16} />
                            {user.work}
                        </span>

                        <span>
                            <MapPin size={16} />
                            {user.location}
                        </span>

                        <span>
                            <Calendar size={16} />
                            Joined {user.joined}
                        </span>

                    </div>

                    <div className="gp-profile-stats">

                        <div>
                            <strong>{user.followers}</strong>
                            <span>Followers</span>
                        </div>

                        <div>
                            <strong>{user.following}</strong>
                            <span>Following</span>
                        </div>
                        <div>
                          <strong>{user.posts}</strong>
                          <span>Posts</span>

                        </div>
                        <div>
                            <strong>{user.Likes}</strong>
                            <span>Likes</span>
                        </div>

                    </div>

                </div>

            </section>


            {/* TABS */}
            <section className="gp-profile-tabs">
                <div className="gp-profile-tabs-btn-cont">
                <button
                    className={activeTab === "posts" ? "active" : ""}
                    onClick={() => setActiveTab("posts")}  >

                    <Grid3X3 size={18} />
                    Posts
                </button>

                <button
                    className={activeTab === "photos" ? "active" : ""}
                    onClick={() => setActiveTab("photos")}  >

                    <Image size={18} />
                    Photos
                </button>

                <button
                    className={activeTab === "videos" ? "active" : ""}
                    onClick={() => setActiveTab("videos")}  >

                    <Video size={18} />
                    Videos
                </button>

                <button
                    className={activeTab === "about" ? "active" : ""}
                    onClick={() => setActiveTab("about")}  >

                    <Info size={18} />
                    About
                </button>
                </div>
            </section>

            {/* CONTENT */}

            <section className="gp-profile-content">

                {/* LEFT */}

                <aside className="gp-profile-left">

                    <div className="gp-card">

                        <h3>Intro</h3>

                        <p>{user.bio}</p>

                    </div>

                    <div className="gp-card">

                        <h3>Friends</h3>

                        <button>

                            <UserPlus size={18} />
                            Find Friends
                        </button>

                    </div>

                </aside>

                {/* RIGHT */}

                <section className="gp-profile-feed">

                    {activeTab === "posts" && (

                        <>

                            {
                                activeTab === "posts" && (

                                    posts.map(post=>(

                                        <article
                                            className="gp-profile-post"
                                            key={post.id}
                                        >

                                            <div className="gp-post-user">

                                                <img
                                                    src={user.avatar}
                                                    alt=""
                                                />

                                                <div>

                                                    <strong>
                                                        {user.fullName}
                                                    </strong>

                                                    <span>
                        2h ago
                    </span>

                                                </div>


                                            </div>



                                            <p>
                                                {post.text}
                                            </p>



                                            <img

                                                className="gp-post-image"

                                                src={post.image}

                                                alt=""

                                            />


                                            <div className="gp-post-actions">


                                                <button>
                                                    ❤️ Like
                                                </button>


                                                <button>
                                                    💬 Comment
                                                </button>


                                                <button>
                                                    🔁 Share
                                                </button>


                                            </div>


                                        </article>


                                    ))

                                )

                            }


                        </>

                    )}

                    {activeTab === "photos" && (
                        <>
                        <div className="gp-empty">
                            empty

                        </div>
                            <div className="gp-photo-grid">


                                {
                                    photos.map(photo=>(


                                        <img

                                            key={photo}

                                            src={photo}

                                            alt=""

                                        />


                                    ))

                                }


                            </div>
                        </>)}

                    {activeTab === "videos" && (
               <>
                        <div className="gp-empty">

                            Videos coming soon

                        </div>
                   <div className="gp-video-grid">


                       {
                           videos.map(video=>(

                               <div
                                   className="gp-video-card"
                                   key={video}
                               >

                                   <video
                                       controls
                                       src={video}
                                   />


                               </div>

                           ))

                       }


                   </div>

               </>

                )}

                    {activeTab === "about" && (

                        <div className="gp-card">

                            <h3>About</h3>

                            <p>{user.bio}</p>

                            <br />

                            <p>
                                📍 {user.location}
                            </p>

                            <p>
                                💼 {user.work}
                            </p>

                            <p>
                                🌐 {user.website}
                            </p>

                        </div>

                    )}

                </section>

            </section>
         </div>
        </main>

    );

}