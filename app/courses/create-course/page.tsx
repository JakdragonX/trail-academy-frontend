"use client"

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { BookOpen, GraduationCap } from 'lucide-react';
import ContentSpecificationForm from './components/ContentSpecificationForm';
import LoadingState from './components/LoadingState';
import StudentModuleView from './components/StudentModuleView';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function CreateCoursePage() {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [courseType, setCourseType] = useState(null);
  const [configData, setConfigData] = useState({
    examCount: 1,
    moduleCount: 5,
    includeNotes: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [generatedContent, setGeneratedContent] = useState(null);

  const generateCourseContent = async (specs) => {
    setIsGenerating(true);
    try {
      setCurrentTask('structuring');
      const response = await fetch('/api/create-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseType,
          moduleCount: configData.moduleCount,
          examCount: configData.examCount,
          includeNotes: configData.includeNotes,
          courseSpecs: specs
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      setCurrentTask('finalizing');
      setGeneratedContent(data.course);
      setCurrentStep('preview');
    } catch (error) {
      console.error('Error generating course:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderContent = () => {
    if (isGenerating) {
      return <LoadingState currentTask={currentTask} />;
    }

    switch (currentStep) {
      case 'welcome':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card 
              className="p-6 cursor-pointer border-2 hover:border-[#2D4F1E] transition-all"
              onClick={() => {
                setCourseType('traditional');
                setCurrentStep('create');
              }}>
              <div className="text-center space-y-4">
                <BookOpen className="w-16 h-16 mx-auto text-[#2D4F1E]" />
                <h2 className="text-xl font-semibold">Traditional Course</h2>
                <p className="text-gray-600">All modules weighted equally</p>
              </div>
            </Card>

            <Card 
              className="p-6 cursor-pointer border-2 hover:border-[#2D4F1E] transition-all"
              onClick={() => {
                setCourseType('college');
                setCurrentStep('create');
              }}>
              <div className="text-center space-y-4">
                <GraduationCap className="w-16 h-16 mx-auto text-[#2D4F1E]" />
                <h2 className="text-xl font-semibold">College Course</h2>
                <p className="text-gray-600">Emphasis on midterm/final exams</p>
              </div>
            </Card>
          </div>
        );

      case 'create':
        return (
          <ContentSpecificationForm
            onUpdate={(specs) => generateCourseContent(specs)}
          />
        );

      case 'preview':
        return generatedContent && (
          <StudentModuleView
            modules={generatedContent.modules}
            onBack={() => setCurrentStep('create')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1] flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-[#2D4F1E] mb-8 text-center">
            Create New Course
          </h1>
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}