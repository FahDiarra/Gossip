// pages/CreatePost/CreatePost.tsx

import { useRef, useState, ChangeEvent } from "react";
import {
    ArrowLeft,
    Globe,
    Users,
    Lock,
    Image,
    Video,
    Smile,
    MapPin,
    X,
    Loader2
} from "lucide-react";

import "@/styles/CreatePost.css";

type Visibility = "public" | "friends" | "private";

interface PreviewMedia {
    file: File;
    url: string;
    type: "image" | "video";
}

export default function CreatePost() {

    const [content, setContent] = useState("");

    const [visibility, setVisibility] =
        useState<Visibility>("public");

    const [allowComments, setAllowComments] =
        useState(true);

    const [loading, setLoading] =
        useState(false);

    const [media, setMedia] =
        useState<PreviewMedia[]>([]);

    const imageInputRef =
        useRef<HTMLInputElement>(null);

    const videoInputRef =
        useRef<HTMLInputElement>(null);

    const textareaRef =
        useRef<HTMLTextAreaElement>(null);

    //---------------------------------------------------
    // Auto Expand
    //---------------------------------------------------

    function handleTextChange(
        e: ChangeEvent<HTMLTextAreaElement>
    ) {

        setContent(e.target.value);

        const textarea = textareaRef.current;

        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height =
            textarea.scrollHeight + "px";
    }

    //---------------------------------------------------
    // Images
    //---------------------------------------------------

    function handleImages(
        e: ChangeEvent<HTMLInputElement>
    ) {

        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        const previews = files.map(file => ({
            file,
            url: URL.createObjectURL(file),
            type: "image" as const
        }));

        setMedia(prev => [...prev, ...previews]);
    }

    //---------------------------------------------------
    // Video
    //---------------------------------------------------

    function handleVideo(
        e: ChangeEvent<HTMLInputElement>
    ) {

        if (!e.target.files?.length) return;

        const file = e.target.files[0];

        setMedia(prev => [
            ...prev,
            {
                file,
                url: URL.createObjectURL(file),
                type: "video"
            }
        ]);
    }

    //---------------------------------------------------
    // Remove media
    //---------------------------------------------------

    function removeMedia(index: number) {

        setMedia(prev =>
            prev.filter((_, i) => i !== index)
        );
    }

    //---------------------------------------------------
    // Publish
    //---------------------------------------------------

    async function publishPost() {

        setLoading(true);

        /*
            Spring Boot

            const formData = new FormData();

            formData.append("content", content);
            formData.append("visibility", visibility);
            formData.append("allowComments", allowComments.toString());

            media.forEach(item=>{
                formData.append("files", item.file);
            });

            await axios.post(
                "/api/posts",
                formData,
                {
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                }
            );
        */

        setTimeout(() => {
            setLoading(false);
            alert("Ready to connect Spring Boot");
        }, 1500);
    }

    //---------------------------------------------------

    return (

        <div className="createPostPage">

            <div className="createPostCard">
                {/* HEADER */}
                   <div className="createPostHeader">
                       <h2>Create Post</h2>
                   </div>

                {/* USER */}

                <div className="postUser">
                    <div className="userInfo">
                        <div className="avatar">
                            JS
                        </div>

                        <div>
                             <h3>John Smith</h3>
                            <p>
                                Share something with
                                your friends.
                            </p>
                        </div>
                    </div>

                    <div className="visibility">

                        <select
                            value={visibility}
                            onChange={(e) =>
                                setVisibility(
                                    e.target
                                        .value as Visibility
                                )
                            }
                        >

                            <option value="public">
                                🌍 Public
                            </option>

                            <option value="friends">
                                👥 Friends
                            </option>

                            <option value="private">
                                🔒 Private
                            </option>

                        </select>

                    </div>

                </div>

                {/* TEXTAREA */}

                <textarea

                    ref={textareaRef}

                    className="postInput"

                    value={content}

                    onChange={handleTextChange}

                    placeholder="What's happening?"

                    rows={4}

                />

                {/* ACTIONS */}

                <div className="postActions">

                    <button
                        onClick={() =>
                            imageInputRef.current?.click()
                        }
                    >

                        <Image size={20} />

                        Photos

                    </button>

                    <button
                        onClick={() =>
                            videoInputRef.current?.click()
                        }
                    >

                        <Video size={20} />

                        Video

                    </button>

                    <button>

                        <Smile size={20} />

                        Feeling

                    </button>

                    <button>

                        <MapPin size={20} />

                        Location

                    </button>

                </div>

                <input
                    ref={imageInputRef}
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    onChange={handleImages}
                />

                <input
                    ref={videoInputRef}
                    type="file"
                    hidden
                    accept="video/*"
                    onChange={handleVideo}
                />

                {/* PREVIEW */}

                {media.length > 0 && (

                    <div className="previewContainer">

                        {media.map((item, index) => (

                            <div
                                key={index}
                                className="previewItem"
                            >

                                <button
                                    className="removeMedia"
                                    onClick={() =>
                                        removeMedia(index)
                                    }
                                >
                                    <X size={16} />
                                </button>

                                {item.type === "image" ? (

                                    <img
                                        src={item.url}
                                        alt=""
                                    />

                                ) : (

                                    <video
                                        controls
                                        src={item.url}
                                    />

                                )}

                            </div>

                        ))}

                    </div>

                )}

                {/* OPTIONS */}

                <div className="commentOption">

                    <label>

                        <input
                            type="checkbox"
                            checked={allowComments}
                            onChange={() =>
                                setAllowComments(
                                    !allowComments
                                )
                            }
                        />

                        Allow comments

                    </label>

                </div>

                {/* FOOTER */}

                <div className="footerButtons">

                    <button
                        className="cancelButton"
                    >
                        Cancel
                    </button>

                    <button
                        className="publishButton"
                        onClick={publishPost}
                        disabled={loading}
                    >

                        {loading ? (
                            <>
                                <Loader2
                                    size={18}
                                    className="spin"
                                />
                                Publishing...
                            </>
                        ) : (
                            "Publish"
                        )}

                    </button>

                </div>

            </div>

        </div>

    );

}