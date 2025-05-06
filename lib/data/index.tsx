interface NavGroup {
  name: string
  icon?: string
  link: string
  subLinks?: NavGroup[]
}

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
