import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/app/components/ui/button";
import { VideoData } from "@/configs/schema";
import { useRouter } from "next/navigation";
//import { useRouter } from "next/router";

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  const [durationInFrames,setDurationInFrame]=useState(100)
  const router=useRouter();
  useEffect(() => {
    setOpenDialog(!openDialog);
    videoId && GetVideoData();
  }, [playVideo]);

  const GetVideoData = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));

    console.log(result);
    setVideoData(result[0]);
  };
  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-amber-50 flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            re you absolutely sure?
          </DialogTitle>
          <DialogDescription>
            <Player
              component={RemotionVideo}
              durationInFrames={Number (durationInFrames.toFixed(0))}
              compositionWidth={1920}
              compositionHeight={1080}
              fps={30}
              inputProps={{
                ...videoData,
                setDurationInFrame:(frameValue)=>setDurationInFrame(frameValue)
              }}
            />
            <div className="flex gap-10 mt-10" >
              <Button variant="ghost" onClick={()=>router.replace('/dashboard')}>Cancel</Button>
              <Button>Export</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
