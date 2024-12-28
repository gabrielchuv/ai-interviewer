'use client';

import { Box, Button, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const initialCode = `/*
Two Sum

Given an array of integers nums and an integer target, return indices of the two numbers in the array
such that they add up to target. You may assume that each input would have exactly one solution,
and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]
Explanation: Because nums[1] + nums[2] == 6, we return [1, 2].

Write your solution below:
*/

function twoSum(nums: number[], target: number): number[] {
    // Your solution here
    
}`;

export function CodeEditor() {
  const handleSubmit = () => {
    // Will be implemented later
    console.log('Submit clicked');
  };

  return (
    <Box 
      sx={{ 
        flex: 2, 
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Code
      </Typography>
      <CodeMirror
        value={initialCode}
        height="calc(100% - 100px)"
        extensions={[javascript()]}
        theme="dark"
      />
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 2
        }}
      >
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleSubmit}
          sx={{ width: '120px' }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
} 