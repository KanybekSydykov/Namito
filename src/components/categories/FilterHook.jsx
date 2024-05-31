import { useState, useEffect } from 'react';

export const useConstructUrl = (initialFilters = {}, initialSorting = '') => {
  const [filter, setFilters] = useState(initialFilters);
  const [sorting, setSorting] = useState(initialSorting);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const constructUrl = (filters, sorting) => {
      const baseUrl = 'https://namito.tatadev.pro/api/products/';
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item) params.append(key, item);
          });
        } else if (value) {
          params.append(key, value);
        }
      });

      if (sorting) {
        params.append('ordering', sorting);
      }

      return `${baseUrl}?${params.toString()}`;
    };

    setUrl(constructUrl(filter, sorting));
  }, [filter, sorting]);

  return { filter, setFilters, sorting, setSorting, url };
};
