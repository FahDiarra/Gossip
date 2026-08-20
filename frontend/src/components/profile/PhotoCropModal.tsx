import { useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";

interface PhotoCropModalProps {
    isOpen: boolean;
    imageSrc: string | null;
    title: string;

    aspect: number;
    cropShape?: "rect" | "round";

    onCancel: () => void;
    onSave: (blob: Blob) => Promise<void>;
}

export default function PhotoCropModal({
                                           isOpen,
                                           imageSrc,
                                           title,
                                           aspect,
                                           cropShape = "rect",
                                           onCancel,
                                           onSave,
                                       }: PhotoCropModalProps) {

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] =
        useState<Area | null>(null);

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setCroppedAreaPixels(null);
            setSaving(false);
        }
    }, [isOpen, imageSrc]);

    if (!isOpen || !imageSrc) {
        return null;
    }

    const createCroppedImage = (
        imageSrc: string,
        pixelCrop: Area
    ): Promise<Blob> => {

        return new Promise((resolve, reject) => {

            const image = new window.Image();

            image.src = imageSrc;

            image.onload = () => {

                const canvas = document.createElement("canvas");

                /*
                 * Pour une cover, on garde une résolution
                 * plus large.
                 */
                const outputWidth =
                    cropShape === "round" ? 400 : 1400;

                const outputHeight =
                    cropShape === "round"
                        ? 400
                        : Math.round(outputWidth / aspect);

                canvas.width = outputWidth;
                canvas.height = outputHeight;

                const ctx = canvas.getContext("2d");

                if (!ctx) {
                    reject(new Error("Canvas not supported"));
                    return;
                }

                ctx.drawImage(
                    image,
                    pixelCrop.x,
                    pixelCrop.y,
                    pixelCrop.width,
                    pixelCrop.height,
                    0,
                    0,
                    outputWidth,
                    outputHeight
                );

                canvas.toBlob(
                    (blob) => {

                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(
                                new Error(
                                    "Failed to create image"
                                )
                            );
                        }

                    },
                    "image/jpeg",
                    0.9
                );
            };

            image.onerror = () => {
                reject(
                    new Error("Failed to load image")
                );
            };
        });
    };

    const handleSave = async () => {
        if (!imageSrc || !croppedAreaPixels) {
            return;
        }
        try {
            setSaving(true);
            const blob = await createCroppedImage(
                imageSrc,
                croppedAreaPixels
            );

            await onSave(blob);

        } catch (error) {
            console.error(
                "Failed to crop image:",
                error
            );

        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="gp-photo-modal-overlay">

            <div className="gp-photo-modal">

                <div className="gp-photo-modal__header">

                    <h2>{title}</h2>

                    <button
                        type="button"
                        className="gp-photo-modal__close"
                        onClick={onCancel}
                        disabled={saving}   >
                        ×
                    </button>

                </div>

                <div className="gp-photo-modal__body">

                    <div
                        className={
                            cropShape === "round"
                                ? "gp-photo-modal__crop gp-photo-modal__crop--round"
                                : "gp-photo-modal__crop gp-photo-modal__crop--cover"
                              }
                        >

                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspect}
                            cropShape={cropShape}
                            showGrid={false}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={(_, croppedPixels) => {
                                setCroppedAreaPixels(
                                    croppedPixels
                                );
                            }}
                        />

                    </div>

                    <div className="gp-photo-modal__zoom">

                        <span>Zoom</span>

                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) =>
                                setZoom(
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                        />

                    </div>

                </div>

                <div className="gp-photo-modal__footer">

                    <button
                        type="button"
                        className="gp-photo-modal__cancel"
                        onClick={onCancel}
                        disabled={saving}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="gp-photo-modal__save"
                        onClick={handleSave}
                        disabled={saving || !croppedAreaPixels}
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>

                </div>

            </div>

        </div>
    );
}