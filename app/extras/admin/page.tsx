"use client";

import { useState } from "react";
import { PageNav } from "@/components/page-nav";

export default function ExtrasAdmin() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("photo");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : null);
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      setStatus('Not authenticated');
      return;
    }
    if (type === 'photo' && (!files || files.length === 0)) {
      setStatus('Select at least one file for photo uploads.');
      return;
    }
    if (type === 'writing' && !body.trim()) {
      setStatus('Enter writing content before uploading.');
      return;
    }

    const fd = new FormData();
    if (files) {
      for (const f of Array.from(files)) {
        fd.append('file', f);
      }
    }
    fd.append('title', title);
    fd.append('type', type);
    fd.append('body', body);

    setStatus('Uploading...');
    const res = await fetch('/api/upload', { method: 'POST', body: fd, headers: { 'x-admin-token': token } });
    if (res.ok) {
      const j = await res.json();
      setStatus('Uploaded.');
      setTitle('');
      setBody('');
      setFiles(null);
    } else {
      setStatus('Upload failed');
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Logging in...');
    const res = await fetch('/api/admin-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (res.ok) {
      const j = await res.json();
      sessionStorage.setItem('admin_token', j.token);
      setToken(j.token);
      setPassword('');
      setStatus('Logged in');
    } else {
      setStatus('Invalid password');
    }
  }

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#f2f2f2', fontFamily: 'var(--font-sans)' }}>
      <PageNav />
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '8rem 2.5rem 6rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 300 }}>Extras Admin</h1>
        {!token ? (
          <form onSubmit={handleLogin} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              Admin password
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" style={{ padding: '0.5rem', border: '1px solid #2a2a2a', background: '#0f0f0f', color: '#f2f2f2' }} />
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" style={{ padding: '0.6rem 1rem', border: '1px solid #2a2a2a', background: '#3a7878', color: '#111' }}>Log in</button>
              <span style={{ color: '#aaaaaa' }}>{status}</span>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #2a2a2a', background: '#0f0f0f', color: '#f2f2f2' }} />
          </label>

          <label style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            Type
            <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: '0.5rem', border: '1px solid #2a2a2a', background: '#0f0f0f', color: '#f2f2f2' }}>
              <option value="photo">Photo(s)</option>
              <option value="writing">Writing / Essay</option>
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            Files {type === 'writing' ? '(optional for writing)' : ''}
            <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            Body (for writing)
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={6} style={{ padding: '0.5rem', border: '1px solid #2a2a2a', background: '#0f0f0f', color: '#f2f2f2' }} />
          </label>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" style={{ padding: '0.6rem 1rem', border: '1px solid #2a2a2a', background: '#3a7878', color: '#111' }}>Upload</button>
              <button type="button" onClick={() => { sessionStorage.removeItem('admin_token'); setToken(null); setStatus(null); }} style={{ padding: '0.6rem 1rem', border: '1px solid #2a2a2a', background: 'transparent', color: '#aaaaaa' }}>Log out</button>
              <span style={{ color: '#aaaaaa' }}>{status}</span>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
