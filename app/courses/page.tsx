import React from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const courseCategories = {
  STEM: [
    { title: "Introduction to Programming", level: "Beginner", duration: "8 weeks", enrolled: 245 },
    { title: "Data Science Fundamentals", level: "Intermediate", duration: "12 weeks", enrolled: 189 },
    { title: "Physics for High School", level: "Advanced", duration: "16 weeks", enrolled: 156 }
  ],
  Humanities: [
    { title: "World History", level: "Beginner", duration: "10 weeks", enrolled: 178 },
    { title: "Creative Writing", level: "Intermediate", duration: "6 weeks", enrolled: 134 },
    { title: "Philosophy 101", level: "Beginner", duration: "8 weeks", enrolled: 112 }
  ],
  Elementary: [
    { title: "Basic Mathematics", level: "K-2", duration: "4 weeks", enrolled: 267 },
    { title: "Reading Adventures", level: "K-3", duration: "6 weeks", enrolled: 223 },
    { title: "Science Discovery", level: "3-5", duration: "8 weeks", enrolled: 198 }
  ]
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] flex flex-col">
      <Navbar />
      
      <main className="flex-grow px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-[#2D4F1E]">Explore Courses</h1>
            <Link href="/create-course">
              <Button className="bg-[#8B4513] text-[#FAF6F1] hover:bg-[#8B4513]/90 transition-all duration-300">
                Create New Course
              </Button>
            </Link>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-[#2D4F1E]/10">
            <Tabs defaultValue="STEM" className="space-y-6">
              <TabsList className="bg-[#2D4F1E]/10 p-1 rounded-lg">
                {Object.keys(courseCategories).map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="data-[state=active]:bg-[#2D4F1E] data-[state=active]:text-[#FAF6F1] rounded-md px-6 py-2 transition-all duration-300"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(courseCategories).map(([category, courses]) => (
                <TabsContent key={category} value={category} className="space-y-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, index) => (
                      <Card key={index} className="border-[#2D4F1E]/20 hover:shadow-xl transition-all duration-300">
                        <CardHeader>
                          <CardTitle className="text-xl text-[#2D4F1E]">{course.title}</CardTitle>
                          <CardDescription className="text-[#2D4F1E]/70">
                            Level: {course.level} • Duration: {course.duration}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-[#2D4F1E]/70">
                              {course.enrolled} enrolled
                            </span>
                            <Button variant="outline" 
                              className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-[#FAF6F1] transition-all duration-300">
                              Learn More
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}