import type { ReactNode } from 'react'

interface NavGroup {
  name: string
  icon?: ReactNode
  link: string
  subLinks?: NavGroup[]
}

// Landing page navigation links
export const navLinks: NavGroup[] = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'About',
    link: '/about',
  },
  {
    name: 'Features',
    link: '/features',
  },
  {
    name: 'Contact',
    link: '/contact',
  },
]

// App navigation links
export const appNavLinks: NavGroup[] = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Documents',
    link: '#documents',
  },
  {
    name: 'Help',
    link: '/help',
    subLinks: [
      {
        name: 'FAQs',
        link: '#faqs',
      },
      {
        name: 'Features',
        link: '#Features',
      },
      {
        name: 'Contact Us',
        link: '#contact',
      },
    ],
  },
]
