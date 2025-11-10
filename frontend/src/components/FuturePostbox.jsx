import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export default function FuturePostbox(){
  const [list, setList] = useState([])
  const [txt, setTxt] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    (async ()=> {
      const { data: sessionData } = await supabase.auth.getSession()
      const u = sessionData?.session?.user ?? null
      setUser(u)
      fetchPosts(u)
    })()
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      fetchPosts(u)
    })
    return ()=> sub?.subscription?.unsubscribe?.()
  }, [])

  async function fetchPosts(currUser){
    setLoading(true)
    if (currUser) {
      const { data, error } = await supabase.from('future_posts').select('*').order('created_at', { ascending: false })
      if (error) { console.error(error); setList([]); setLoading(false); return }
      setList(data || [])
    } else {
      const { data, error } = await supabase.from('future_posts').select('*').eq('is_public', true).order('created_at', { ascending: false })
      if (error) { console.error(error); setList([]); setLoading(false); return }
      setList(data || [])
    }
    setLoading(false)
  }

  async function add(){
    if(!txt.trim()) return
    if(!user && !isPublic){
      const ok = confirm('游客无法发布私密内容。是否将此内容以公开方式发布？点击 取消 将跳转登录。')
      if(!ok) { window.location.href = '/secrets'; return }
    }
    const payload = { content: txt, is_public: !!isPublic }
    const { error } = await supabase.from('future_posts').insert([payload])
    if (error) { alert('保存失败'); console.error(error); return }
    setTxt('')
    fetchPosts(user)
  }

  async function remove(id){
    if(!confirm('确认删除？')) return
    const { error } = await supabase.from('future_posts').delete().match({ id })
    if (error) { alert('删除失败'); console.error(error); return }
    fetchPosts(user)
  }

  return (
    <div className="card">
      <h3 className="font-semibold">写给未来的信</h3>
      <textarea value={txt} onChange={e=>setTxt(e.target.value)} placeholder="写下未来想说的话..." className="w-full mt-2 p-2 border rounded" rows={4}></textarea>

      <div className="mt-3 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isPublic} onChange={e=>setIsPublic(e.target.checked)} />
          公开（所有人可见）
        </label>
        <div className="flex gap-2">
          <button onClick={add} className="px-4 py-2 rounded-full bg-accent/80">存入邮局</button>
          {user ? <span className="text-sm self-center">已登录：{user.email}</span> : <span className="text-sm self-center text-gray-500">游客模式（登录后可见私密条目）</span>}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {loading ? <div>加载中…</div> : list.length === 0 ? <div className="text-sm text-gray-500">暂无信件</div> : list.map(l=> (
          <div key={l.id} className="p-3 bg-white/60 rounded">
            <div className="text-sm">{l.content}</div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gray-500">{new Date(l.created_at).toLocaleString()}</div>
              <div className="text-xs text-gray-500">
                {l.is_public ? <span className="mr-3">公开</span> : <span className="mr-3">私密</span>}
                {user && <button onClick={()=>remove(l.id)}>删除</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}