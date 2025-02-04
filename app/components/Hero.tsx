import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Forest background with overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/forest.jpg-F1VHSiQQvCHKGAM9bym948Are3NLRK.jpeg"
          alt="Forest trail background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#2D4F1E]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D4F1E]/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[#2D4F1E]/30 backdrop-blur-sm p-8 rounded-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#FAF6F1] leading-tight drop-shadow-lg">
              Transform Any Study Material into an AI-Powered Learning Experience
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-[#FAF6F1] drop-shadow">
              Upload textbooks, PDFs, or notes and generate a fully structured course with AI-powered study guides,
              quizzes, and videos.
            </p>
            <div className="space-x-4">
              <Link
                href="/signup"
                className="inline-block bg-[#FAF6F1] text-[#2D4F1E] px-8 py-4 rounded-lg text-xl font-bold hover:transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Start Your Journey
              </Link>
              <Link
                href="/demo"
                className="inline-block bg-[#2D4F1E]/40 backdrop-blur-sm border-2 border-[#FAF6F1] text-[#FAF6F1] px-8 py-4 rounded-lg text-xl font-bold hover:bg-[#2D4F1E]/60 transition-all duration-300"
              >
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAF6F1] to-transparent" />
    </section>
  )
}

