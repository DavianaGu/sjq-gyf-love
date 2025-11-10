import React, {useEffect, useState} from 'react'
// 修改为你们真实开始时间
const START_ISO = '2020-08-15T18:00:00'

export default function Timer(){
  const [now, setNow] = useState(()=>Date.now())
  useEffect(()=>{
    const id = setInterval(()=> setNow(Date.now()), 250)
    return ()=> clearInterval(id)
  },[])

  const diff = Math.max(0, now - new Date(START_ISO).getTime())
  const sec = Math.floor(diff/1000)
  const days = Math.floor(sec/86400)
  const hours = Math.floor((sec%86400)/3600)
  const minutes = Math.floor((sec%3600)/60)
  const seconds = sec%60

  return (
    <div className="card text-center">
      <div className="text-sm text-gray-600">我们在一起</div>
      <div className="text-3xl font-semibold mt-2">{days} 天 {hours} 时 {minutes} 分 {seconds} 秒</div>
    </div>
  )
}