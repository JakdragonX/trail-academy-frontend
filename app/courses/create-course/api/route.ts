// app/api/create-course/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const config = await request.json();

    const promptTemplate = `Create a detailed ${config.courseType} course curriculum about "${config.courseSpecs?.courseTitle || 'Untitled Course'}"
    Target audience: ${config.courseSpecs?.targetAudience || 'General audience'}
    Description: ${config.courseSpecs?.courseDescription || 'No description provided'}
    
    The course should have ${config.moduleCount} modules and include:
    - Detailed lecture content for each module
    - Reading materials with page numbers
    - Video lectures with durations
    - Practice exercises
    - Quiz questions with explanations
    
    Format the response as a JSON object with the following structure:
    {
      "title": "Course Title",
      "description": "Course description",
      "modules": [{
        "id": number,
        "title": "Module title",
        "description": "Module description",
        "content": {
          "lecture": "Detailed lecture content",
          "readings": [{"title": "Reading title", "pages": "page range"}],
          "videos": [{"title": "Video title", "duration": "duration"}],
          "exercises": ["exercise description"]
        },
        "quiz": {
          "questions": [{
            "question": "Question text",
            "options": ["option 1", "option 2", "option 3", "option 4"],
            "correct": 0,
            "explanation": "Why this answer is correct"
          }]
        }
      }]
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "system",
          content: "You are an expert course creator and curriculum designer."
        },
        {
          role: "user",
          content: promptTemplate
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" }
    });

    const generatedContent = JSON.parse(completion.choices[0].message.content || '{}');

    if (!generatedContent.modules || !Array.isArray(generatedContent.modules)) {
      throw new Error('Invalid response structure');
    }

    return NextResponse.json({ 
      success: true,
      course: generatedContent
    });

  } catch (error: any) {
    console.error('Course generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate course content', details: error.message },
      { status: 500 }
    );
  }
}