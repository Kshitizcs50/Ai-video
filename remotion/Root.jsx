import RemotionVideo from '@/app/dashboard/_components/RemotionVideo'
import React from 'react'

function RemotionRoot(){
  return (
    <>
        <Composition
      id="MyComposition"
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
      component={RemotionVideo}
    />
    </>
  )
}

export default RemotionRoot