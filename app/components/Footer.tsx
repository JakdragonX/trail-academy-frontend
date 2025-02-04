import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#2D4F1E] text-[#FAF6F1]/90">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-[#FAF6F1] mb-3">Platform</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/enterprise">Enterprise</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#FAF6F1] mb-3">Legal</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/terms">Terms</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/cookies">Cookies</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#FAF6F1] mb-3">Company</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#FAF6F1] mb-3">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com/trail" className="hover:text-[#FAF6F1]">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="https://twitter.com/trail" className="hover:text-[#FAF6F1]">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="https://linkedin.com/company/trail" className="hover:text-[#FAF6F1]">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href="https://instagram.com/trail" className="hover:text-[#FAF6F1]">
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-[#FAF6F1]/10 text-xs text-center text-[#FAF6F1]/70">
          © {currentYear} Trail Learning, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

