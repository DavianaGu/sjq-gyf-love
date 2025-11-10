import React, {useRef, useState} from 'react'

export default function MusicPlayer({tracks=[]}){
  const audioRef = useRef()
  const [i,setI] = useState(0)

  function playIndex(idx){
    setI(idx)
    audioRef.current.src = tracks[idx].src
    audioRef.current.play()
  }

  return (
    <div className="card">
      <audio ref={audioRef} controls className="w-full" src={tracks[0]?.src}></audio>
      <div className="mt-4 space-y-2">
        {tracks.map((t,idx)=> (
          <div key={idx} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{t.title}</div>
              <div className="text-sm text-gray-500">{t.description}</div>
            </div>
            <div>
              <button onClick={()=>playIndex(idx)} className="px-3 py-1 rounded-full bg-primary">Play</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}