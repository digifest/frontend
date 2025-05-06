'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Bell, ChevronDown, Menu, Settings } from 'lucide-react'
// import { ModeToggle } from '@/components/ui/pages/search/mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/lib/store/global.store'
import { navLinks, appNavLinks } from '@/lib/data'

interface NavbarProps {
  variant?: 'landing' | 'app'
}

export default function Navbar({ variant = 'app' }: NavbarProps) {
  const pathname = usePathname()
  const toggleSidebar = useSidebar((state) => state.toggleSidebar)

  // Use the appropriate navigation links based on variant
  const navigationLinks = variant === 'landing' ? navLinks : appNavLinks

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="container flex items-center justify-between gap-5 p-5">
        <div className="flex items-center gap-2">
          {variant === 'app' && (
            <button onClick={toggleSidebar} className="md:hidden">
              <Menu className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </button>
          )}

          <Link href="/">
            <Image
              src="/svgs/logo.svg"
              width={100}
              height={50}
              alt="logo"
              className="dark:invert"
            />
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationLinks.map((item) =>
            item.subLinks && item.subLinks.length > 0 ? (
              // Render dropdown for items with subLinks
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                  <span className="tracking-widest flex items-center gap-2">
                    {item.icon}
                    {item.name}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.subLinks.map((subItem) => (
                    <DropdownMenuItem key={subItem.name}>
                      <Link href={subItem.link} className="flex w-full">
                        {subItem.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Render regular link for items without subLinks
              <Link
                key={item.name}
                href={item.link}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.link
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <span className="tracking-widest flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </span>
              </Link>
            )
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {variant === 'landing' ? (
            <>
              <button className="py-2 px-4 text-sm">Login</button>
              <button className="bg-primary text-white px-6 py-2 rounded-sm text-sm">
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button className="relative">
                <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              {/* <ModeToggle /> */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback>E</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block font-medium">
                    Emmanuel 
                  </span>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
