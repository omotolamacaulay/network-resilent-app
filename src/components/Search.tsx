// import React, { useState } from 'react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search articles..."
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default Search;
