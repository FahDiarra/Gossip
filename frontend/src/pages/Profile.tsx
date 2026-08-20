
import {
    Calendar,
    Camera,
    Settings,
    Share2,
    Grid3X3,
    Image,
    Video,
    Info,
    UserPlus,
    User,
    MessagesSquare,
    Heart,
    MessageCircle,
    Bookmark,
    Repeat2,
    Eye,
    Clock3
} from "lucide-react";
import "@/styles//Profile.css";
import { motion } from "framer-motion";

import { useState } from "react";


//Context
import { useAuth, type UserProps} from "@/context/AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import i18n from "@/i18n/langConfig";
import apiPrivate from "@/api/api.private.ts";
import appConfig from "@/config/appConfig.ts";
import * as React from "react";
import PhotoCropModal from "@/components/profile/PhotoCropModal.tsx";
import SkeletonImage from "@/components/ui/SkeletonImage.tsx";
// import PostCard from "@/components/Post/PostCard";



export function Profile() {

    const [activeTab, setActiveTab] = useState("posts");
    const {user, updateUser} = useAuth();


    const {profileId} = useParams();
    const [profileUser, setProfileUser] = useState<UserProps | null>(null);


    const isMyProfile = !profileId;
    const displayUser = isMyProfile ? user : profileUser;

    const [photoModal, setPhotoModal] = useState(false);
    const [coverModal, setCoverModal] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [coverImageSrc, setCoverImageSrc] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSelectPhoto = (
        event: React.ChangeEvent<HTMLInputElement>
    ):void => {
        const file: File | undefined= event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
            setPhotoModal(true);
        };
        reader.readAsDataURL(file);
    };


    const handleSelectCover = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const file = event.target.files?.[0];
        if (!file) {  return; }
        const reader = new FileReader();
        reader.onload = () => {
            setCoverImageSrc(reader.result as string );
            setCoverModal(true);
        };
        reader.readAsDataURL(file);
        event.target.value = "";
    };


    const handleSavePhoto = async (blob: Blob) => {

        try {
            const formData = new FormData();
            formData.append(
                "file",
                blob,
                "profile-photo.jpg"
            );

            const response = await apiPrivate.put<UserProps>(
                "/profile/photo",
                formData
            );

            const updatedUser: UserProps = {
                ...response.data,
                profilePhoto: response.data.profilePhoto
                    ? `${response.data.profilePhoto}?t=${Date.now()}`
                    : null,
            };

            updateUser(updatedUser);

            setPhotoModal(false);
            setImageSrc(null);

        } catch (error) {
            console.error( "Failed to update profile photo:", error );
            throw error;
        }
    };

    const handleSaveCover = async (blob: Blob) => {

        try {
            const formData = new FormData();
            formData.append(
                "file",
                blob,
                "cover-photo.jpg"
            );

            const response = await apiPrivate.put<UserProps>(
                "/profile/cover",
                formData
            );

            const updatedUser: UserProps = {
                ...response.data,
                coverPhoto: response.data.coverPhoto
                    ? `${response.data.coverPhoto}?t=${Date.now()}`
                    : null,
            };

            updateUser(updatedUser);
            setCoverModal(false);
            setCoverImageSrc(null);

        } catch (error) {
            console.error( "Failed to update cover photo:", error );
            throw error;
        }
    };




    const handleCancelChange = () => {
        if(photoModal){
            setPhotoModal(false);
            setImageSrc(null);
        }
        if(coverModal){
            setCoverModal(true);
            setCoverImageSrc(null);
        }


    };


    const formatJoinedDate = (createdAt?: string): string => {
        if (!createdAt) { return "";}
        return new Intl.DateTimeFormat(
            i18n.resolvedLanguage || "en",
            {
                month: "long",
                year: "numeric",
            }
        ).format(new Date(createdAt));
    };

    const joinedDate = formatJoinedDate(displayUser?.createdAt);

    const userTest = {
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
            id: 1,
            text: "Building something new with Gossip ",
            image:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        },

        {
            id: 2,
            text: "Weekend with friends 🔥",
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
    const [likedPosts, setLikedPosts] = useState<number[]>([]);


    const toggleLike = (id: number) => {
        setLikedPosts(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };


    return (

        <main className="gp-profile-page">
            <div className="gp-profile--wrapper">
                {/* COVER */}

                <section className="gp-profile-cover">
                    <div className="gp-profile-cover__wrapper">
                        {displayUser?.coverPhoto? (
                            <SkeletonImage
                                src={`${appConfig.apiBaseUrl}${displayUser.coverPhoto}`}
                                alt="Cover"
                                className="gp-profile-cover-img" />
                        ) : (
                            <div className="gp-profile-no-cover"></div>
                        )}
                        <button
                            type="button"
                            className="gp-cover-edit"
                            onClick={() =>
                                document
                                    .getElementById("cover-photo-input")
                                    ?.click() } >

                            <Camera size={18}/>
                            <span>Change cover</span>
                        </button>

                        <input id="cover-photo-input" type="file" accept="image/jpeg,image/png,image/webp" hidden
                            onChange={handleSelectCover} />
                    </div>
                </section>

                {/* HEADER */}

                <section className="gp-profile-header">
                    <div className="gp-profile-avatar">

                        {displayUser?.profilePhoto? (
                            <SkeletonImage
                                src={`${appConfig.apiBaseUrl}${displayUser.profilePhoto}`}
                                alt="Cover"
                                className="gp-profile-avatar-img" />
                        ) : (
                            <User size={100} className="gp-profile-avatar__avatar"/>
                        )}
                        <button
                            type="button"
                            onClick={() =>
                                document
                                    .getElementById("profile-photo-input")
                                    ?.click()  }  >
                            <Camera size={18} />
                        </button>
                        <input id="profile-photo-input" type="file" accept="image/jpeg,image/png,image/webp" hidden
                            onChange={handleSelectPhoto}   />
                    </div>





                    <div className="gp-profile-info">
                        <div className="gp-profile-top">
                            <div>
                                <h1>
                                    {displayUser?.name}
                                </h1>
                                <span>
                                {displayUser?.userName}
                            </span>
                            </div>

                            <div className="gp-profile-actions">
                                {isMyProfile ? (<>
                                    <button className="gp-profile-action-btn"
                                    onClick={ ():void=>{navigate("/Edit-Profile")}  }>
                                        <Settings size={18}/>
                                        Edit Profile
                                    </button>

                                    <button className="gp-profile-action-btn">
                                        <Share2 size={18}/>
                                    </button>

                                </>) : (<>
                                    <button className="gp-profile-action-btn">
                                        <MessagesSquare size={18}/>
                                        Message
                                    </button>
                                    <button className="follow">
                                        <UserPlus size={18}/>
                                        Follow
                                    </button>
                                </>)}


                            </div>
                        </div>

                        {joinedDate && (
                        <div className="gp-profile-details">
                            <span>
                            <Calendar size={16}/>
                            Joined {joinedDate}
                            </span>

                          </div>
                        )}


                        <div className="gp-profile-stats">

                            <div>
                                <strong>{userTest.followers}</strong>
                                <span>Followers</span>
                            </div>

                            <div>
                                <strong>{userTest.following}</strong>
                                <span>Following</span>
                            </div>
                            <div>
                                <strong>{userTest.posts}</strong>
                                <span>Posts</span>

                            </div>
                            <div>
                                <strong>{userTest.Likes}</strong>
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
                            onClick={() => setActiveTab("posts")}>

                            <Grid3X3 size={18}/>
                            Posts
                        </button>

                        <button
                            className={activeTab === "photos" ? "active" : ""}
                            onClick={() => setActiveTab("photos")}>

                            <Image size={18}/>
                            Photos
                        </button>

                        <button
                            className={activeTab === "videos" ? "active" : ""}
                            onClick={() => setActiveTab("videos")}>

                            <Video size={18}/>
                            Videos
                        </button>

                        <button
                            className={activeTab === "about" ? "active" : ""}
                            onClick={() => setActiveTab("about")}>

                            <Info size={18}/>
                            About
                        </button>
                    </div>
                </section>

                {/* CONTENT */}

                <section className="gp-profile-content">
                    {/* LEFT */}

                    <section className="gp-profile-feed">

                        {activeTab === "posts" && (<>


                            {
                                activeTab === "posts" && (
                                    posts.map(post => {

                                        const liked = likedPosts.includes(post.id);


                                        return (

                                            <article className="gp-profile-post" key={post.id}>
                                                <div className="gp-post-header">
                                                    <div className="gp-post-user">
                                                        <img src={userTest.avatar} alt=""/>
                                                        <div>
                                                            <strong>
                                                                {userTest.fullName}
                                                            </strong>
                                                            <span>{userTest.username} </span>
                                                        </div>
                                                    </div>

                                                    <button className="follow">
                                                        <UserPlus size={18}/>
                                                        Follow
                                                    </button>
                                                </div>

                                                <p> {post.text} </p>

                                                <img className="gp-post-image"
                                                     src={post.image} alt=""/>
                                                <div className="gp-post-stats">

                                                    <div className="gp-post-stat">
                                                        <Eye size={16}/>
                                                        <span>23.4K</span>
                                                    </div>

                                                    <span className="gp-post-divider"></span>

                                                    <div className="gp-post-stat">
                                                        <Clock3 size={15}/>
                                                        <span>2h ago</span>
                                                    </div>

                                                </div>

                                                <div className="gp-post-actions">

                                                    <div className="gp-post-actions-left">

                                                        <motion.button
                                                            whileTap={{scale: .75}}
                                                            whileHover={{scale: 1.05}}
                                                            className={`gp-action-btn ${liked ? "liked" : ""}`}
                                                            onClick={() => toggleLike(post.id)}
                                                        >

                                                            <motion.div
                                                                animate={
                                                                    liked
                                                                        ? {
                                                                            scale: [1, 1.5, 1],
                                                                            rotate: [0, -15, 15, 0]
                                                                        }
                                                                        : {}
                                                                }
                                                                transition={{
                                                                    duration: .4
                                                                }}
                                                            >
                                                                <Heart
                                                                    size={19}
                                                                    fill={liked ? "currentColor" : "none"}
                                                                />
                                                            </motion.div>

                                                            <span>12.5K</span>

                                                        </motion.button>

                                                        <button className="gp-action-btn">
                                                            <MessageCircle size={19}/>
                                                            <span>354</span>
                                                        </button>

                                                        <button className="gp-action-btn">
                                                            <Bookmark size={19}/>
                                                            <span>Save</span>
                                                        </button>

                                                    </div>

                                                    <button className="gp-action-btn share">
                                                        <Repeat2 size={19}/>
                                                        <span>Share</span>
                                                    </button>

                                                </div>


                                            </article>
                                        )
                                    }))
                            }


                        </>)}

                        {activeTab === "photos" && (
                            <>
                                <div className="gp-empty">
                                    empty

                                </div>
                                <div className="gp-photo-grid">
                                    {
                                        photos.map(photo => (
                                            <img key={photo} src={photo} alt=""/>
                                        ))

                                    }
                                </div>
                            </>)}

                        {activeTab === "videos" && (<>
                            <div className="gp-empty">
                                Videos coming soon
                            </div>
                            <div className="gp-video-grid">
                                {
                                    videos.map(video => (
                                        <div className="gp-video-card" key={video}>
                                            <video controls src={video}/>
                                        </div>
                                    ))

                                }
                            </div>
                        </>)}


                        {activeTab === "about" && (
                            <div className="gp-card">
                                <h3>About</h3>
                                <p>{userTest.bio}</p>
                                <br/>
                                <p>📍 {userTest.location} </p>
                                <p>💼 {userTest.work}</p>
                                <p>🌐 {userTest.website}</p>
                            </div>
                        )}

                    </section>
                    {/* RIGHT */}
                    <aside className="gp-profile-right">
                        <div className="gp-card">
                            <h3>Intro</h3>
                            <p>{userTest.bio}</p>
                        </div>

                        <div className="gp-card">
                            <h3>Friends</h3>
                            <button>
                                <UserPlus size={18}/>
                                Find Friends
                            </button>
                        </div>

                    </aside>

                </section>
            </div>


            <PhotoCropModal
                isOpen={photoModal}
                imageSrc={imageSrc}
                title="Change profile photo"
                aspect={1}
                cropShape="round"
                onCancel={handleCancelChange}
                onSave={handleSavePhoto}
            />

            <PhotoCropModal
                isOpen={coverModal}
                imageSrc={coverImageSrc}
                title="Change cover photo"
                aspect={3}
                cropShape="rect"
                onCancel={handleCancelChange}
                onSave={handleSaveCover}
            />

        </main>

    );

}