"use client"

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Link as LinkIcon, X } from 'lucide-react';

interface Resource {
  type: 'link' | 'book' | 'note';
  title: string;
  url?: string;
  author?: string;
  description?: string;
}

interface ContentSpecificationFormProps {
  onUpdate: (data: {
    courseTitle: string;
    courseDescription: string;
    targetAudience: string;
    resources: Resource[];
  }) => void;
}

export default function ContentSpecificationForm({ onUpdate }: ContentSpecificationFormProps) {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [newResource, setNewResource] = useState<Resource>({
    type: 'link',
    title: '',
  });

  const addResource = () => {
    if (newResource.title) {
      setResources([...resources, newResource]);
      setNewResource({ type: 'link', title: '' });
    }
  };

  const removeResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onUpdate({
      courseTitle,
      courseDescription,
      targetAudience,
      resources
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#2D4F1E]">Course Title</label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2D4F1E] focus:border-transparent"
            placeholder="Enter course title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#2D4F1E]">Course Description</label>
          <textarea
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2D4F1E] focus:border-transparent"
            rows={4}
            placeholder="Enter course description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#2D4F1E]">Target Audience</label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#2D4F1E] focus:border-transparent"
            placeholder="Who is this course for?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#2D4F1E]">Add Resources</label>
          <div className="flex gap-2 mb-4">
            <select
              value={newResource.type}
              onChange={(e) => setNewResource({ ...newResource, type: e.target.value as Resource['type'] })}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-[#2D4F1E] focus:border-transparent"
            >
              <option value="link">Link</option>
              <option value="book">Book</option>
              <option value="note">Note</option>
            </select>
            <input
              type="text"
              value={newResource.title}
              onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#2D4F1E] focus:border-transparent"
              placeholder="Resource title"
            />
            {newResource.type !== 'note' && (
              <input
                type="text"
                value={newResource.url || ''}
                onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#2D4F1E] focus:border-transparent"
                placeholder={newResource.type === 'link' ? "URL" : "Author"}
              />
            )}
            <Button
              onClick={addResource}
              className="bg-[#2D4F1E] text-white hover:bg-[#2D4F1E]/90"
            >
              Add
            </Button>
          </div>

          {resources.length > 0 && (
            <div className="space-y-2">
              {resources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#FAF6F1] rounded-lg">
                  <div className="flex items-center gap-2">
                    {resource.type === 'link' ? <LinkIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    <span>{resource.title}</span>
                  </div>
                  <X
                    className="w-4 h-4 cursor-pointer hover:text-red-500"
                    onClick={() => removeResource(index)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-[#2D4F1E] text-white hover:bg-[#2D4F1E]/90"
        >
          Generate Course
        </Button>
      </CardContent>
    </Card>
  );
}