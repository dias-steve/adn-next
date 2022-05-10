import React from 'react'
import Link from 'next/link'

export default function Button({url, name, idDiv}) {
  return (
    <Link href={url}>
    <a> 
    <div id={idDiv} className="btn-primary">
      <span>{name}</span>
    </div>
    </a>
  </Link>
  )
}
