import Link from "next/link"
import Image from "next/image"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3">
      <div className="w-10 h-10 flex items-center justify-center">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trail%20copy%20png%20icon-M3EHusVbHVSktiYuDPcKCkbldxV4hR.png"
          alt="Trail Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
      <span className="text-2xl font-bold tracking-wider text-[#FAF6F1]">TRAIL ACADEMY</span>
    </Link>
  )
}

