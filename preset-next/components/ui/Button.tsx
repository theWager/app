import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ButtonProps = {
  icon: string;
  title: string;
  href: string;
  classes?: string;
};

const IconButton: React.FC<ButtonProps> = ({ icon, title, href, classes }) => {
  return (
    <Link
      href={href}
      className={
        classes +
        'inline-flex h-9 px-3 justify-center items-center gap-1 flex-shrink-0 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200'
      }
    >
      <Image src={icon} alt={`${title} icon`} className="w-4.5 h-4.5" />
      <span>{title}</span>
    </Link>
  );
};

export default IconButton;
