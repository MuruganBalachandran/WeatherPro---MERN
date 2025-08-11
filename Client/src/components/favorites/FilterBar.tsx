import React from 'react';
import { Filter, SortAsc } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setFilter } from '../../redux/favoritesSlice';

const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.favorites.filter);

  const filters = [
    { value: 'all', label: 'All Cities' },
    { value: 'temperature', label: 'Sort by Temperature' },
    { value: 'condition', label: 'Group by Condition' },
    { value: 'alphabetical', label: 'Alphabetical' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <Filter className="h-5 w-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter & Sort:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => dispatch(setFilter(filter.value as any))}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentFilter === filter.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;