"use client";

import React from 'react';

import Link from 'next/link';
import { usePathname } from "next/navigation";

type Props = {
    item: { title: string; path: string; }; 
}

const NavLink = ({item}: Props) => {
    const pathName = usePathname();
  return (
    <li className="header__nav-item">
      <Link className={`header__navLink ${pathName === item.path && "active"}`} href={item.path}>{item.title}</Link>
    </li>
  )
}

export default NavLink;