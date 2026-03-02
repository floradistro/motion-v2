"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ModelViewerProps {
  src: string;
  alt?: string;
  className?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  poster?: string;
}

export default function ModelViewer({
  src,
  alt = "3D model",
  className,
  autoRotate = true,
  cameraControls = true,
  poster,
}: ModelViewerProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    import("@google/model-viewer");
  }, []);

  // On mobile: show static poster image to save battery/bandwidth
  if (isMobile && poster) {
    return (
      <div className={className} style={{ width: "100%", height: "100%", backgroundColor: "#070707" }}>
        <Image
          src={poster}
          alt={alt}
          fill
          sizes="100vw"
          className="object-contain"
        />
      </div>
    );
  }

  return (
    // @ts-expect-error model-viewer is a web component
    <model-viewer
      src={src}
      alt={alt}
      poster={poster || undefined}
      auto-rotate={autoRotate || undefined}
      camera-controls={cameraControls || undefined}
      shadow-intensity="0.5"
      environment-image="neutral"
      loading="lazy"
      className={className}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#070707",
        "--poster-color": "#070707",
      } as React.CSSProperties}
    />
  );
}
