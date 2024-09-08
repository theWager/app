import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type ButtonProps = {
  icon?: string
  title: string
  href: string
  classes?: string
  disabled?: boolean
}

const IconButton: React.FC<ButtonProps> = ({ icon, title, href, classes }) => {
  return (
    <Link
      href={href}
      className={
        classes +
        'inline-flex px-3 justify-center items-center gap-1 flex-shrink-0 text-sm bg-transparent text-white rounded-lg hover:opacity-60 transition-colors duration-200'
      }
    >
      {icon && (
        <Image src={icon} alt={`${title} icon`} className='w-4.5 h-4.5' />
      )}
      {title}
    </Link>
  )
}

export default IconButton
