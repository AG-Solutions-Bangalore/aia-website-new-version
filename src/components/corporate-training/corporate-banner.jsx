import React from 'react'

const CorporateBanner = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://media.istockphoto.com/id/1472553376/video/woman-teaching-kids-and-learning-with-whiteboard-for-education-future-and-development-with.mp4?s=mp4-640x640-is&k=20&c=7FD6_-p4GGnVstXQS7G2gTOujYQUjPtWjfSS4QUESv4="
          type="video/mp4"
        />
        <source
          src="https://media.istockphoto.com/id/1472553376/video/woman-teaching-kids-and-learning-with-whiteboard-for-education-future-and-development-with.mp4?s=mp4-640x640-is&k=20&c=7FD6_-p4GGnVstXQS7G2gTOujYQUjPtWjfSS4QUESv4="
          type="video/webm"
        />
      </video>
    </div>
  )
}

export default CorporateBanner