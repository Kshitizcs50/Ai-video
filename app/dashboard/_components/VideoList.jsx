"use client";
import React from "react";
import { Thumbnail } from "@remotion/player";
import MyVideo from "./MyVideo"; // Your Remotion video component
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";


function VideoList({ videoList }) {
    const[openPlayDialog,setOpenPlayerDialog]=useState(false);
    const[videoId,setVideoId]=useState();
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videoList?.map((video, index) => (
        <div className="cursor-pointer hover:scale-105 transition-all" onClick={()=>{setOpenPlayerDialog(Date.now());setVideoId(video?.id)}}>
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={390}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{
                borderRadius:15
            }}
            inputProps={{
              //title: video.title || "Default Title",
              ...video,
              setDurationInFrame:(v)=>console.log(v)
              // You can pass other dynamic props here, like image/audio URL
            }}
          />
        </div>
      ))}
      <PlayerDialog playVideo={openPlayDialog} videoId={videoId}/>
    </div>
  );
}

export default VideoList;
