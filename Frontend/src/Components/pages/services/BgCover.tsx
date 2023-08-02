import React from 'react'
import BgCoverSer from "@/assets/Vd-bg-services.mp4";

type Props = {}

function BgCoverServices({}: Props) {
  return <section>
    <div className='w-full h-screen bg-white'>
        <div className='object-cover'>
            <video src={BgCoverSer} autoPlay loop muted/>
        </div>
    </div>
  </section>
}

export default BgCoverServices;