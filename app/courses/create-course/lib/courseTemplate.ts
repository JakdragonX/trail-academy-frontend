export interface CourseModule {
    id: number;
    title: string;
    description: string;
    content: {
      lecture: string;
      readings: Array<{
        title: string;
        pages: string;
        link?: string;
      }>;
      videos: Array<{
        title: string;
        duration: string;
        description?: string;
      }>;
      exercises: string[];
    };
    quiz: {
      questions: Array<{
        question: string;
        options: string[];
        correct: number;
        explanation: string;
      }>;
    };
  }
  
  export interface CourseTemplate {
    title: string;
    description: string;
    targetAudience: string;
    modules: CourseModule[];
    finalExam?: {
      questions: Array<{
        question: string;
        options: string[];
        correct: number;
        explanation: string;
      }>;
    };
  }