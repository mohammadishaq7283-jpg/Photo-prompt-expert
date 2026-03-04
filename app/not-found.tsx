'use client';

// app/not-found.tsx
export default function NotFound() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: 'red' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ margin: '20px 0', color: '#888' }}>Redirecting issue? Try clicking below:</p>
      <a href="/en" style={{ padding: '10px 20px', background: 'blue', borderRadius: '5px', textDecoration: 'none', color: 'white' }}>Go Home</a>
    </div>
  );
}
