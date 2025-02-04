"use client"

import Link from "next/link"
import Logo from "./Logo"
import { DiscIcon as Discord } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  return (
    <nav className="bg-[#2D4F1E] text-[#FAF6F1] p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/courses" className="hover:text-[#FAF6F1]/80 transition">
            Courses
          </Link>
          <Link href="/guides" className="hover:text-[#FAF6F1]/80 transition">
            Guides
          </Link>
          <Link href="/library" className="hover:text-[#FAF6F1]/80 transition">
            Library
          </Link>
          <Link href="/community" className="hover:text-[#FAF6F1]/80 transition">
            Community
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:text-[#FAF6F1]/80 transition">Join Us</DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Link href="https://discord.gg/trail" className="flex items-center w-full">
                  <Discord className="mr-2 h-4 w-4" />
                  Join Discord
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/contact" className="w-full">
                  Contact Us
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/collaborate" className="w-full">
                  Collaborate
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center space-x-2">
            <Link
              href="/login"
              className="bg-[#FAF6F1] text-[#2D4F1E] px-4 py-2 rounded-lg hover:bg-[#FAF6F1]/90 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-[#FAF6F1] text-[#2D4F1E] px-4 py-2 rounded-lg hover:bg-[#FAF6F1]/90 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

