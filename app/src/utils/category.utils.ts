import { Category } from '../types/category.types';

export const getCategoryItem = (category: Category) => {
  const { name } = category;

  switch (name) {
    case 'Entertainment':
      return { name: 'balloon', color: '#ff5714' };
  }
};
