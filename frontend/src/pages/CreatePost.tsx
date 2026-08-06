import {useRef, useState} from "react";

import {ArrowLeft, Globe, Image, Lock, MapPin, Smile, UploadCloud, Users, Video, X} from "lucide-react";

import {useNavigate} from "react-router-dom";


import "@/styles/CreatePost.css";


type Visibility =
    | "public"
    | "friends"
    | "private";


type MediaType =
    | "image"
    | "video";


interface MediaPreview {

    file: File;

    url: string;

    type: MediaType;

}


export default function CreatePost() {

    const navigate = useNavigate();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [content, setContent] = useState("");

    const [media, setMedia] = useState<MediaPreview[]>([]);

    const [visibility, setVisibility] =
        useState<Visibility>("public");

    const [dragActive, setDragActive] =
        useState(false);

    const textareaRef =
        useRef<HTMLTextAreaElement>(null);

    const resizeTextarea = () => {
        const textarea =
            textareaRef.current;
        if (!textarea)
            return;
        textarea.style.height = "auto";
        textarea.style.height =
            textarea.scrollHeight + "px";

    };


    const handleFiles = (
        files: FileList | null
    ) => {


        if (!files)
            return;


        const selected =
            Array.from(files);


        const previews =
            selected.map(file => ({


                file,


                url:
                    URL.createObjectURL(file),


                type:
                    file.type.startsWith("video")
                        ? "video"
                        : "image"


            }));


        setMedia(prev => [

            ...prev,

            ...previews

        ]);

    };


    const removeMedia = (
        index: number
    ) => {


        setMedia(prev => {

            const item = prev[index];
            URL.revokeObjectURL(item.url);
            return prev.filter(
                (_, i) => i !== index
            );
        });

    };


    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>
    ) => {

        e.preventDefault();

        setDragActive(false);
        handleFiles(
            e.dataTransfer.files
        );

    };


    const publishPost = () => {

        const formData =
            new FormData();
        formData.append(
            "content",
            content
        );


        formData.append(
            "visibility",
            visibility
        );


        media.forEach(item => {


            formData.append(
                "media",
                item.file
            );
        });


        console.log(
            "Post Data",
            {
                content,
                visibility,
                media
            }
        );


        /*
            API Spring Boot:
            POST /api/posts
            Content-Type:
            multipart/form-data
        */

    };


    return (

        <main className="gp-create-post-page">

            <header className="gp-create-header">
                <button
                    onClick={() => navigate(-1)}
                    className="gp-back-btn">
                    <ArrowLeft size={22}/>
                </button>
                <h1>
                    Create Post
                </h1>
            </header>


            <section className="gp-create-card">

                <div className="gp-author">

                    <img src="https://i.pravatar.cc/100?img=12" alt=""/>

                    <div>
                        <h3> John Smith</h3>


                        <button className="gp-visibility">


                            {
                                visibility === "public" &&
                                <Globe size={15}/>
                            }


                            {
                                visibility === "friends" &&
                                <Users size={15}/>
                            }


                            {
                                visibility === "private" &&
                                <Lock size={15}/>
                            }


                            {
                                visibility
                            }

                        </button>


                    </div>


                </div>


                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                        resizeTextarea();
                    }}

                    placeholder="What's happening?"
                    className="gp-post-textarea"

                />


                {
                    media.length > 0 && (

                        <div className="gp-media-preview">

                            {
                                media.map(
                                    (item, index) => (


                                        <div
                                            className="gp-media-item"
                                            key={item.url}
                                        >


                                            {
                                                item.type === "image" ?

                                                    <img
                                                        src={item.url}
                                                        alt=""
                                                    />

                                                    :

                                                    <video
                                                        src={item.url}
                                                        controls
                                                    />

                                            }


                                            <button
                                                onClick={() => removeMedia(index)}>
                                                <X size={16}/>
                                            </button>

                                        </div>


                                    )
                                )

                            }


                        </div>


                    )
                }


                <div

                    className={
                        dragActive

                            ?
                            "gp-drop-zone active"

                            :

                            "gp-drop-zone"

                    }


                    onDragOver={(e) => {

                        e.preventDefault();

                        setDragActive(true);

                    }}


                    onDragLeave={() => {

                        setDragActive(false);

                    }}


                    onDrop={handleDrop}


                    onClick={() => {

                        fileInputRef.current?.click();

                    }}

                >


                    <UploadCloud size={30}/>


                    <p>

                        Drag & drop photos or videos

                    </p>


                    <span>
                        or click to select
                    </span>


                </div>


                <input

                    ref={fileInputRef}

                    hidden

                    type="file"

                    multiple

                    accept="
                    image/*
                    ,video/*
                    "

                    onChange={(e) =>
                        handleFiles(
                            e.target.files
                        )
                    }

                />


                <div className="gp-post-tools">


                    <button>

                        <Image/>

                        Photo

                    </button>


                    <button>

                        <Video/>

                        Video

                    </button>


                    <button>

                        <Smile/>

                        Feeling

                    </button>


                    <button>

                        <MapPin/>

                        Location

                    </button>


                </div>


                <div className="gp-visibility-options">


                    <button

                        onClick={() =>
                            setVisibility("public")
                        }

                    >
                        🌎 Public
                    </button>


                    <button

                        onClick={() =>
                            setVisibility("friends")
                        }

                    >
                        👥 Friends
                    </button>


                    <button

                        onClick={() =>
                            setVisibility("private")
                        }

                    >
                        🔒 Only me
                    </button>


                </div>


                <button

                    disabled={
                        !content &&
                        media.length === 0
                    }

                    onClick={publishPost}

                    className="gp-publish-btn"

                >

                    Publish

                </button>


            </section>


        </main>

    );

}