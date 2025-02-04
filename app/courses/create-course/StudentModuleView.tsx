// app/course/create-course/components/StudentModuleView.tsx
"use client"

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Video, ArrowLeft, ArrowRight, FileText, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Module {
  id: number;
  title: string;
  description: string;
  content: {
    lecture: string;
    readings: Array<{ title: string; pages: string; link?: string }>;
    videos: Array<{ title: string; duration: string; description?: string }>;
    exercises: string[];
  };
  quiz: {
    questions: Question[];
  };
}

interface StudentModuleViewProps {
  modules: Module[];
  onBack: () => void;
}

export default function StudentModuleView({ modules, onBack }: StudentModuleViewProps) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: string]: boolean }>({});
  
  const currentModule = modules[currentModuleIndex];

  const navigateModule = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    } else if (direction === 'next' && currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
    // Reset quiz state when changing modules
    setSelectedAnswers({});
    setShowExplanations({});
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
    setShowExplanations(prev => ({
      ...prev,
      [questionIndex]: true
    }));
  };

  const isAnswerCorrect = (questionIndex: number) => {
    const selectedAnswer = selectedAnswers[questionIndex];
    return selectedAnswer === currentModule.quiz.questions[questionIndex].correct;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#2D4F1E] hover:underline"
        >
          <ArrowLeft size={20} />
          Back to Editor
        </button>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigateModule('prev')}
            disabled={currentModuleIndex === 0}
            variant="outline"
            className="border-[#2D4F1E] text-[#2D4F1E]"
          >
            <ArrowLeft size={20} />
          </Button>
          <span className="font-medium">
            Module {currentModuleIndex + 1} of {modules.length}
          </span>
          <Button
            onClick={() => navigateModule('next')}
            disabled={currentModuleIndex === modules.length - 1}
            variant="outline"
            className="border-[#2D4F1E] text-[#2D4F1E]"
          >
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>

      <Card className="border-2 border-[#2D4F1E]">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-[#2D4F1E]">{currentModule.title}</h2>
          <p className="text-gray-600 mb-6">{currentModule.description}</p>

          <Tabs defaultValue="content" className="space-y-4">
            <TabsList className="bg-[#FAF6F1] w-full justify-start">
              <TabsTrigger 
                value="content"
                className="data-[state=active]:bg-[#2D4F1E] data-[state=active]:text-[#FAF6F1]"
              >
                Lecture Content
              </TabsTrigger>
              <TabsTrigger 
                value="resources"
                className="data-[state=active]:bg-[#2D4F1E] data-[state=active]:text-[#FAF6F1]"
              >
                Resources
              </TabsTrigger>
              <TabsTrigger 
                value="quiz"
                className="data-[state=active]:bg-[#2D4F1E] data-[state=active]:text-[#FAF6F1]"
              >
                Quiz
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="prose max-w-none">
              <div className="bg-white rounded-lg p-6">
                <p className="whitespace-pre-wrap text-gray-800">{currentModule.content.lecture}</p>
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#2D4F1E] flex items-center gap-2">
                    <Book size={20} />
                    Required Readings
                  </h3>
                  {currentModule.content.readings.map((reading, idx) => (
                    <Card key={idx} className="hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-[#2D4F1E]">{reading.title}</h4>
                        <p className="text-sm text-gray-600">Pages: {reading.pages}</p>
                        {reading.link && (
                          <a 
                            href={reading.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#8B4513] hover:underline mt-2 inline-block"
                          >
                            Access Reading Material
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#2D4F1E] flex items-center gap-2">
                    <Video size={20} />
                    Video Resources
                  </h3>
                  {currentModule.content.videos.map((video, idx) => (
                    <Card key={idx} className="hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-[#2D4F1E]">{video.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">Duration: {video.duration}</p>
                        {video.description && (
                          <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                        )}
                        <Button className="bg-[#2D4F1E] text-[#FAF6F1] hover:bg-[#2D4F1E]/90">
                          Watch Video
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {currentModule.content.exercises.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-[#2D4F1E] flex items-center gap-2 mb-4">
                    <FileText size={20} />
                    Practice Exercises
                  </h3>
                  <div className="bg-[#FAF6F1] rounded-lg p-4 space-y-2">
                    {currentModule.content.exercises.map((exercise, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[#2D4F1E]">•</span>
                        <p>{exercise}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="quiz">
              <div className="space-y-6">
                {currentModule.quiz.questions.map((question, idx) => (
                  <Card key={idx} className="border-2">
                    <CardContent className="p-6">
                      <p className="font-medium text-lg mb-4 text-[#2D4F1E]">
                        {idx + 1}. {question.question}
                      </p>
                      <div className="space-y-3">
                        {question.options.map((option, optIdx) => (
                          <button
                            key={optIdx}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              selectedAnswers[idx] === optIdx
                                ? showExplanations[idx]
                                  ? optIdx === question.correct
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-red-500 bg-red-50'
                                  : 'border-[#2D4F1E] bg-[#2D4F1E] text-white'
                                : 'border-gray-200 hover:border-[#2D4F1E]'
                            }`}
                            onClick={() => handleAnswerSelect(idx, optIdx)}
                            disabled={showExplanations[idx]}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              {showExplanations[idx] && selectedAnswers[idx] === optIdx && (
                                <CheckCircle 
                                  className={optIdx === question.correct ? 'text-green-500' : 'text-red-500'} 
                                />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      {showExplanations[idx] && (
                        <div className={`mt-4 p-4 rounded-lg ${
                          isAnswerCorrect(idx) ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}>
                          <p className="text-[#2D4F1E]">
                            <span className="font-medium">
                              {isAnswerCorrect(idx) ? 'Correct! ' : 'Incorrect. '}
                            </span>
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}