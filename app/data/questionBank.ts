export interface Question {
    id: number;
    title: string;
    description: string;
}

export const questionBank: Question[] = [
    {
        id: 1,
        title: "Reverse a Linked List",
        description: `/* Reverse the nodes of a singly linked list so that the head becomes the tail and vice versa.
        
        Example 1:
        Input: 1 -> 2 -> 3 -> 4 -> 5
        Output: 5 -> 4 -> 3 -> 2 -> 1

        Example 2:
        Input: 1 -> 2
        Output: 2 -> 1

        Write your solution below:
        */
        `,
    },
    {
        id: 2,
        title: "Merge Two Sorted Arrays",
        description: `/* Merge two pre-sorted arrays into a single sorted array efficiently.

        Example 1:
        Input: [1, 2, 4], [1, 3, 4]
        Output: [1, 1, 2, 3, 4, 4]

        Example 2:
        Input: [1, 2, 3], [4, 5, 6]
        Output: [1, 2, 3, 4, 5, 6]

        Write your solution below:
        */
        `,
    },
    {
        id: 3,
        title: "Valid Parentheses",
        description: `/* Determine if a string containing various types of parentheses is valid, meaning every opening bracket has a corresponding closing bracket in the correct order.

        Example 1:
        Input: "()"
        Output: true

        Example 2:
        Input: "()[]{}"
        Output: true

        Write your solution below:
        */
        `,
    },
    {
        id: 4,
        title: "Longest Substring Without Repeating Characters",
        description: `/* Find the length of the longest substring in a given string that contains no repeating characters.

        Example 1:
        Input: "abcabcbb"
        Output: 3
        Explanation: The longest substring without repeating characters is "abc", which has a length of 3.

        Example 2:
        Input: "bbbbb"
        Output: 1
        Explanation: The longest substring without repeating characters is "b", which has a length of 1.

        Write your solution below:
        */
        `,
    },
    {
        id: 5,
        title: "Binary Tree Inorder Traversal",
        description: `/* Perform an inorder traversal (left, root, right) of a binary tree and return the sequence of visited nodes.

        Example 1:
        Input: 
            1
             \
              2
             /
            3
        Output: [1, 3, 2]

        Example 2:
        Input:
            4
           / \
          2   5
         / \
        1   3
        Output: [1, 2, 3, 4, 5]

        Write your solution below:
        */
        `,
    },
    {
        id: 6,
        title: "Find Minimum in Rotated Sorted Array",
        description: `/* Given a rotated sorted array without duplicates, find the minimum element efficiently.

        Example 1:
        Input: [3, 4, 5, 1, 2]
        Output: 1

        Example 2:
        Input: [4, 5, 6, 7, 0, 1, 2]
        Output: 0

        Write your solution below:
        */
        `,
    },
    {
        id: 7,
        title: "Top K Frequent Elements",
        description: `/* Identify the top K most frequent elements in an array.

        Example 1:
        Input: [1, 1, 1, 2, 2, 3], k = 2
        Output: [1, 2]

        Example 2:
        Input: [1, 1, 1, 2, 2, 3], k = 1
        Output: [1]

        Write your solution below:
        */
        `,
    },
    {
        id: 8,
        title: "Two Sum",
        description: `/* Given an array of integers, return the indices of the two numbers such that they add up to a specific target.

        Example 1:
        Input: [2, 7, 11, 15], target = 9
        Output: [0, 1]

        Example 2:
        Input: [3, 2, 4], target = 6
        Output: [1, 2]

        Write your solution below:
        */
        `,
    },
    {
        id: 9,
        title: "Number of Islands",
        description: `/* Given a 2D grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

        Example 1:
        Input:
        [
            ["1","1","1","1","0"],
            ["1","1","0","1","0"],
            ["1","1","0","0","0"],
            ["0","0","0","0","0"]
        ]
        Output: 1

        Example 2:
        Input:
        [
            ["1","1","0","0","0"],
            ["1","1","0","0","0"],
            ["0","0","1","0","0"],
            ["0","0","0","1","1"]
        ]
        Output: 3

        Write your solution below:
        */
        `,
    },
    {
        id: 10,
        title: "Course Schedule",
        description: `/* Determine if it's possible to complete all courses given the prerequisite pairs, ensuring there are no cyclic dependencies.

        Example 1:
        Input: numCourses = 2, prerequisites = [[1, 0]]
        Output: true
        Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.

        Example 2:
        Input: numCourses = 2, prerequisites = [[1, 0], [0, 1]]
        Output: false
        Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

        Write your solution below:
        */
        `,
    },
]