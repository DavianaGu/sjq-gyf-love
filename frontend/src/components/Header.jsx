import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header(){
  const loc = useLocation()
  const items = [
    {to:'/', label:'主页'},
    {to:'/story', label:'我们的故事'},
    {to:'/secrets', label:'秘语时刻'},
    {to:'/music', label:'音乐时刻'},
    {to:'/future', label:'未来邮局'}
  ]
  return (
    <header className="bg-gradient-to-r from-primary to-white/60 py-6 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">SJQ & GYF</div>
          <div className="text-xs text-gray-600">一个只属于你们的小家</div>
        </div>
        <nav className="flex gap-3 items-center">
          {items.map(i=> (
            <Link key={i.to} to={i.to} className={`px-3 py-1 rounded-full ${loc.pathname===i.to? 'bg-white shadow':'hover:bg-white/60'}`}>
              {i.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}