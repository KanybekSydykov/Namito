'use client'
import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const LeaveReview = () => {
  const [selectedRating, setSelectedRating] = useState(0); // State to track selected rating
  const [hoverRating, setHoverRating] = useState(0); // State to track hovered rating

  const handleHover = (index) => {
    // Change color of stars when hovering
    setHoverRating(index + 1);
  };

  const handleClick = (index) => {
    // Set the selected rating when clicked
    setSelectedRating(index + 1);
  };

  return (
    <Flex flexDir={'row'}>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <StarIcon
          key={index}
          color={(hoverRating === 0 || index >= hoverRating) ? '#CDCDCD' : '#FFC107'} // Change color based on hoveredRating
          onMouseEnter={() => handleHover(index)}
          onMouseLeave={() => setHoverRating(selectedRating)} // Reset hover effect to selectedRating
          onClick={() => handleClick(index)}
          cursor="pointer"
          pe={'2px'}
          w={'31.1px'}
          h={'31.1px'}
        />
      ))}
    </Flex>
  );
};

export default LeaveReview;
