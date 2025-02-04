import OpenAI from 'openai';
import { CourseTemplate, CourseModule } from './courseTemplate';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should be made server-side
});

export interface CourseConfig {
  courseType: 'traditional' | 'college';
  title: string;
  moduleCount: number;
  examCount: number;
  includeNotes: boolean;
  targetAudience?: string;
  description?: string;
}

export async function generateCourseContent(config: CourseConfig): Promise<CourseTemplate> {
  const formatExample = {
    title: config.title,
    description: config.description || 'A comprehensive course',
    modules: [{
      id: 1,
      title: "Module Example",
      description: "Module description",
      content: {
        lecture: "Lecture content",
        readings: [{ title: "Reading Title", pages: "1-10" }],
        videos: [{ title: "Video Title", duration: "10:00" }],
        exercises: ["Exercise description"]
      },
      quiz: {
        questions: [{
          question: "Quiz question?",
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct: 0,
          explanation: "Explanation for the correct answer"
        }]
      }
    }]
  };

  const systemPrompt = `You are an expert course creator specializing in ${config.courseType} education.
Create a detailed course with ${config.moduleCount} modules following academic best practices.
Return the response in valid JSON format exactly matching this structure: ${JSON.stringify(formatExample, null, 2)}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { 
          role: "user", 
          content: `Create a detailed ${config.courseType} course titled "${config.title}".
          Include ${config.moduleCount} modules and ${config.examCount} assessments.
          Target audience: ${config.targetAudience || 'General audience'}
          Description: ${config.description || 'A comprehensive learning experience'}
          ${config.includeNotes ? 'Include detailed study notes with each module.' : ''}`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" }
    });

    const generatedContent = JSON.parse(completion.choices[0].message.content || '{}');
    return generatedContent as CourseTemplate;
    
  } catch (error) {
    console.error('Error generating course content:', error);
    throw error;
  }
}

export async function generateModuleContent(title: string): Promise<CourseModule> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert module creator. Create a detailed module with lecture content, readings, videos, and assessments."
        },
        {
          role: "user",
          content: `Create a detailed module about: ${title}`
        }
      ],
      temperature: 0.7,
    });

    return JSON.parse(completion.choices[0].message.content || '{}') as CourseModule;
  } catch (error) {
    console.error('Error generating module content:', error);
    throw error;
  }
}