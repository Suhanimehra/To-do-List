// File: src/components/TaskSearch.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTasksStore } from '../lib/store';
import { playSound } from '../lib/sounds';

export default function TaskSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const tasks = useTasksStore((state) => state.tasks);
  const filterTag = useTasksStore((state) => state.filterTag);
  const setFilterTag = useTasksStore((state) => state.setFilterTag);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Search in titles, descriptions, and tags
    const results = new Set<string>();
    
    tasks.forEach(task => {
      // Search in title
      if (task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.add(task.title);
      }
      
      // Search in description
      if (task.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.add(task.title);
      }
      
      // Search in tags
      task.tags.forEach(tag => {
        if (tag.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.add(tag);
        }
      });
    });
    
    setSearchResults(Array.from(results));
  }, [searchTerm, tasks]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() !== '') {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };
  
  const handleResultClick = (result: string) => {
    // Check if it's a tag
    const isTag = tasks.some(task => task.tags.includes(result));
    
    if (isTag) {
      setFilterTag(result);
    } else {
      // It's a task title, set the search term to it
      setSearchTerm(result);
    }
    
    setShowResults(false);
    playSound('click');
    
    // Add animation
    const input = document.querySelector('.search-input') as HTMLElement;
    if (input) {
      input.classList.add('celebrate');
      setTimeout(() => input.classList.remove('celebrate'), 500);
    }
  };
  
  return (
    <div className="relative mb-4">
      <div className="flex items-center pixel-border overflow-hidden">
        <input
          type="text"
          placeholder="🔍 Search tasks or tags..."
          className="input-kawaii w-full py-2 px-4 search-input"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => {
            if (searchTerm.trim() !== '') {
              setShowResults(true);
            }
          }}
          onBlur={() => {
            // Delay hiding to allow for clicks on results
            setTimeout(() => setShowResults(false), 200);
          }}
        />
        {searchTerm && (
          <button 
            className="px-2 text-pink-500 hover:text-pink-700"
            onClick={() => {
              setSearchTerm('');
              setShowResults(false);
              playSound('click');
            }}
          >
            ✖️
          </button>
        )}
      </div>
      
      {showResults && searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white pixel-border shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((result, index) => {
            // Check if it's a tag
            const isTag = tasks.some(task => task.tags.includes(result));
            
            return (
              <div 
                key={index}
                className="px-4 py-2 hover:bg-pink-100 cursor-pointer flex items-center"
                onClick={() => handleResultClick(result)}
              >
                <span className="mr-2">{isTag ? '🏷️' : '📝'}</span>
                <span>{result}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}