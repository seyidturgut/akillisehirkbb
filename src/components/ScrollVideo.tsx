import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoProps {
  videoUrl: string;
}

export const ScrollVideo: React.FC<ScrollVideoProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    video.pause();

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        if (video.duration) {
          const targetTime = self.progress * video.duration;
          video.currentTime = targetTime;
        }
      },
    });

    video.addEventListener('loadedmetadata', () => {
      ScrollTrigger.refresh();
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-screen pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        preload="auto"
        muted
        playsInline
        loop
        autoPlay
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80" />
    </div>
  );
};
