import React from 'react'
import Link from 'next/link'

export default function Button({url, name}) {
  return (
    <Link href={url}>
    <a> 
    <div className="btn-primary">
      <span>{name}</span>
    </div>
    </a>
  </Link>
  )
}
