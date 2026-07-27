import React from 'react'

// Agar aapko URL search parameters ya route segments dynamic use karne hon
interface PageProps {
  params: Promise<{ slug?: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ params, searchParams }: PageProps) {
  // Dynamic segments ya search parameters reading (Optional)
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  return (
    <main style={{
      display: 'grid',
      placeItems: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Next.js + TypeScript</h1>
        <p>Your boilerplate is ready!</p>
      </div>
    </main>
  )
}
