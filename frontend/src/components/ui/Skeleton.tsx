

import "@/styles/ui/Skeleton.css"
interface SkeletonProps{
    className:string;
}

export default function Skeleton({className =""}:SkeletonProps) {
    return (
        <div
            className={`gp-skeleton ${className}`}
            aria-hidden="true"
        />

    );
}