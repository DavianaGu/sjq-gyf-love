import React from 'react'

export default function Timeline({events}){
  return (
    <div className="space-y-8">
      {events.map((e,idx)=> (
        <div key={idx} className="flex gap-4 items-start card">
          <div className="w-12 h-12 flex items-center justify-center bg-pink-100 rounded-full">❤</div>
          <div>
            <div className="text-sm text-gray-500">{e.event_date?.slice(0,10)}</div>
            <div className="font-medium">{e.title}</div>
            {e.note && <div className="text-sm text-gray-600 mt-2">{e.note}</div>}
            {e.photo_url && <img src={e.photo_url} alt="evt" className="mt-2 rounded-lg max-w-sm" />}
          </div>
        </div>
      ))}
    </div>
  )
}