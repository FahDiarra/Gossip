import {useState} from "react";
import Skeleton from "@/components/ui/Skeleton.tsx";


interface SkeletonImageProps {
    src: string;
    alt?: string;
    className?: string;
    errorMessage?: string;
}

export default function SkeletonImage({
                                          src,
                                          alt = "",
                                          className = "",
                                          errorMessage = "Image unavailable",
                                      }: SkeletonImageProps) {

    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);


    if (error) {
        return (
            <div className={`gp-media-error ${className}`}>
                <Skeleton className="gp-media-error-background" />

                <span className="gp-media-error-message">
                    {errorMessage}
                </span>
            </div>
        );
    }


    return (
        <div className={`gp-skeleton-image-wrapper ${className}`}>
            {!loaded && (
                <Skeleton className="gp-skeleton-image" />
            )}

            <img
                src={src}
                alt={alt}
                className={`gp-skeleton-image-content ${
                    loaded ? "loaded" : ""
                }`}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
            />
        </div>
    );
}