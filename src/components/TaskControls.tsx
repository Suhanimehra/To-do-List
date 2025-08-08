// File: src/components/TaskControls.tsx
'use client';

import { useState } from 'react';
import { useTasksStore, SortOption, FilterOption } from '../lib/store';
import { playSound } from '../lib/sounds';

export default function TaskControls() {
  const setSortBy = useTasksStore((state) => state.setSortBy);
  const setFilterBy = useTasksStore((state) => state.setFilterBy);
  const clearCompletedTasks = useTasksStore((state) => state.clearCompletedTasks);
  const sortBy = useTasksStore((state) => state.sortBy);
  const filterBy = useTasksStore((state) => state.filterBy);
  const [tagInput, setTagInput] = useState('');
  
  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    playSound('click');
  };
  
  const handleFilterChange = (option: FilterOption) => {
    if (option === 'tag' && tagInput) {
      setFilterBy(option, tagInput);
    } else {
      setFilterBy(option);
    }
    playSound('click');
  };
  
  const handleTagFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagInput) {
      setFilterBy('tag', tagInput);
      playSound('click');
    }
  };
  
  const handleClearCompleted = () => {
    clearCompletedTasks();
    playSound('click');
  };
  
  return (
    <div className="card-kawaii p-4 mb-6 pixel-bg">
      <h2 className="text-sm font-bold mb-4 text-pink-600 text-center pixel-text">
        🔮 Task Controls 🔮
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sort Controls */}
        <div className="pixel-border p-2">
          <h3 className="text-xs font-bold mb-2 text-pink-500">✨ Sort By</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSortChange('created')}
              className={`text-xs px-3 py-1 rounded-full transition-all ${sortBy === 'created' ? 'bg-pink-400 text-white' : 'bg-pink-100 text-pink-600'}`}
              style={{ imageRendering: 'pixelated' }}
            >
              🆕 Newest
            </button>
            <button
              onClick={() => handleSortChange('dueDate')}
              className={`text-xs px-3 py-1 rounded-full transition-all ${sortBy === 'dueDate' ? 'bg-pink-400 text-white' : 'bg-pink-100 text-pink-600'}`}
              style={{ imageRendering: 'pixelated' }}
            >
              ⏰ Due Date
            </button>
            <button
              onClick={() => handleSortChange('priority')}
              className={`text-xs px-3 py-1 rounded-full transition-all ${sortBy === 'priority' ? 'bg-pink-400 text-white' : 'bg-pink-100 text-pink-600'}`}
              style={{ imageRendering: 'pixelated' }}
            >
              🔥 Priority
            </button>
            <button
              onClick={() => handleSortChange('title')}
              className={`text-xs px-3 py-1 rounded-full transition-all ${sortBy === 'title' ? 'bg-pink-400 text-white' : 'bg-pink-100 text-pink-600'}`}
              style={{ imageRendering: 'pixelated' }}
            >
              🔤 Title
            </button>
          </div>
        </div>
        
        {/* Filter Controls */}
        <div className="pixel-border p-2">
          <h3 className="text-xs font-bold mb-2 text-pink-500">🔍 Filter</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange('all')}
              className={`text-xs px-3 py-1 rounded-full transition-all ${filterBy === 'all' ? 'bg-pink-400 text-white' : 'bg-pink-100 text-pink-600'}`}
              style={{ imageRendering: 'pixelated' }}
            >
              ✨ All
            </button>
            <button
              onClick={() => handleFilterChange('active')}
              className={`text-xs px-3 py-1 rounded-full transition-all ${filterBy === 'active' ? 'bg-pink-400 text-white' : 'bg-pink-100 text-pink-600'}`}
              style={{ imageRendering: 'pixelated' }}
            >
              🌟 Active
            </button>
            <button
              onClick={() => handleFilterChange('completed')}
              className={`text-xs px-3 py-1 rounded-full transition-all ${filterBy === 'completed' ? 'bg-pink-400 text-white' : 'bg-pink-100 text-pink-600'}`}
              style={{ imageRendering: 'pixelated' }}
            >
              ✅ Completed
            </button>
            <button
              onClick={() => handleFilterChange('highPriority')}
              className={`text-xs px-3 py-1 rounded-full transition-all ${filterBy === 'highPriority' ? 'bg-pink-400 text-white' : 'bg-pink-100 text-pink-600'}`}
              style={{ imageRendering: 'pixelated' }}
            >
              🔥 High Priority
            </button>
          </div>
        </div>
      </div>
      
      {/* Tag Filter */}
      <div className="mt-4 pixel-border p-2">
        <form onSubmit={handleTagFilter} className="flex gap-2">
          <input
            type="text"
            placeholder="🏷️ Filter by tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="flex-1 input-kawaii text-xs h-8 px-2"
            style={{ imageRendering: 'pixelated' }}
          />
          <button
            type="submit"
            className="btn-kawaii text-xs px-3 py-1 h-8"
            style={{ imageRendering: 'pixelated' }}
          >
            🔍 Filter
          </button>
        </form>
      </div>
      
      {/* Clear Completed Button */}
      <div className="mt-4 text-center">
        <button
          onClick={handleClearCompleted}
          className="btn-kawaii text-xs px-4 py-2 bg-gradient-to-r from-red-400 to-pink-400"
          style={{ imageRendering: 'pixelated' }}
        >
          🧹 Clear Completed Tasks
        </button>
      </div>
    </div>
  );
}