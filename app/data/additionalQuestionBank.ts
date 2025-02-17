export interface Question {
    id: number;
    title: string;
    description: string;
    examples: string;
}

export const questionBank: Question[] = [
    {
        id: 3,
        title: "Merge Two Sorted Lists",
        description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two sorted linked lists into a single sorted linked list.",
        examples: `Examples:

Input: 1 -> 2 -> 4, 1 -> 3 -> 4
Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4

Input: [], []
Output: []`
    },
    {
        id: 4,
        title: "Diameter of Binary Tree",
        description: "Find the diameter of a binary tree, which is defined as the length of the longest path between any two nodes in the tree, which may or may not pass through the root.",
        examples: `Examples:

Input: 
  1
 / \\
2   3
/ \\
4   5

Output: 3 (path: 4 -> 2 -> 1 -> 3 or 5 -> 2 -> 1 -> 3)

Input: 
    1
   /
  2
 /
3
/
4
Output: 3 (path: 4 -> 2 -> 1 -> 3)`
    },
    {
        id: 5,
        title: "Subtree of Another Tree",
        description: "Given the roots of two binary trees root and subRoot, determine if one binary tree is a subtree of another binary tree.",
        examples: `Examples:

Input: 
Tree 1:
        1
       / \\
      2   3
     / \\
    4   5

Tree 2:
        2
       / \\
      4   5

Output: true`
    },
    {
        id: 6,
        title: "Plus One",
        description: "You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's. Increment the large integer by one and return the resulting array of digits.",
        examples: `Examples:

Input: [1,2,3]
Output: [1,2,4]
Explanation: The large integer 123 is incremented by one to become 124.

Input: [4,3,2,1]
Output: [4,3,2,2]
Explanation: The large integer 4321 is incremented by one to become 4322.`
    },
    {
        id: 7,
        title: "Climbing Stairs",
        description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        examples: `Examples:

        Input: 2
        Output: 2
        Explanation: There are two ways to climb to the top.
        1. 1 step + 1 step
        2. 2 steps

        Input: 3
        Output: 3
        Explanation: There are three ways to climb to the top.
        1. 1 step + 1 step + 1 step
        2. 1 step + 2 steps
        3. 2 steps + 1 step`
    },
    {
        id: 8,
        title: "Same Tree",
        description: "Given the roots of two binary trees p and q, check if they are the same or not.",
        examples: `Examples:

        Input: 
        Tree 1:
                1
               / \\
              2   3
             / \\
            4   5

        Tree 2:
                1
               / \\
              2   3
             / \\
            4   5

        Output: true`
    },
    {
        id: 9,
        title: "Last Stone Weight",
        description: "You are given an array of integers stones where stones[i] represents the weight of the ith stone. We are playing a game with the stones. On each turn, we choose the two heaviest stones and smash them together. If the two stones have the same weight, they both break; otherwise, the stone with the larger weight breaks the stone with the smaller weight, and the remaining stone has a weight equal to the difference of their weights. At the end of the game, there is at most one stone left. Return the weight of the last remaining stone. If there are no stones left, return 0.",
        examples: `Examples:

        Input: [2,7,4,1,8,1]
        Output: 1

        Input: [1]
        Output: 1`
    },
    {
        id: 10,
        title: "Maximum Depth of Binary Tree",
        description: "Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
        examples: `Examples:

        Input: 
                1
               / \\
              2   3
             / \\
            4   5

        Output: 3 (path: 4 -> 2 -> 1 or 5 -> 2 -> 1)`
    },
    {
        id: 11,
        title: "Balanced Binary Tree",
        description: "Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.",
        examples: `Examples:

        Input: 
                1
               / \\
              2   3
             / \\
            4   5

        Output: true

        Input:
                1
               /
              2
             /
            3
           /
          4

        Output: false`
    },
    {   
        id: 12,
        title: "Best Time to Buy and Sell Stock",
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
        examples: `Examples:

        Input: [7,1,5,3,6,4]
        Output: 5
        Explanation: The maximum profit can be achieved by buying on day 2 (price = 1) and selling on day 5 (price = 6).

        Input: [7,6,4,3,1]
        Output: 0
        Explanation: In this case, no transactions are done and the max profit = 0.`
    },
    {
        id: 14,
        title: "Single Number",
        description: "Given an array of integers nums, return the single number that appears only once. You must implement a solution with a linear runtime complexity and use only constant extra space.",
        examples: `Examples:

        Input: [2,2,1]
        Output: 1

        Input: [4,1,2,1,2]
        Output: 4

        Input: [1]
        Output: 1`
    },
    {
        id: 15,
        title: "Linked List Cycle",
        description: "Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Return true if there is a cycle in the linked list. Otherwise, return false.",
        examples: `Examples:

        Input: 1 -> 2 -> 3 -> 4 -> 5 -> 2 (cycle)
        Output: true

        Input: 1 -> 2 -> 3 -> 4 -> 5
        Output: false`  
    },
    {
        id: 16,
        title: "Reverse Bits",
        description: "Reverse the bits of a given 32-bit unsigned integer.",
        examples: `Examples:

        Input: 00000010100101000001111010011100
        Output: 00111001011110000010100101000000

        Input: 00000010100101000001111010011100
        Output: 00111001011110000010100101000000`
    },
    {
        id: 17,
        title: "Number of 1 Bits",
        description: "Given a positive integer n, write a function that returns the number of set bits in its binary representation.",
        examples: `Examples:

        Input: 11
        Output: 3
        Explanation: The binary representation of 11 is 1011, which has 3 set bits.

        Input: 128
        Output: 1
        Explanation: The binary representation of 128 is 10000000, which has 1 set bit.

        Input: 128
        Output: 1`
    },
    {   
        id: 18,
        title: "Happy Number",
        description: "Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits. Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy. Return true if n is a happy number, and false if not.",
        examples: `Examples:

        Input: 19
        Output: true

        Input: 2
        Output: false`
    },
    {
        id: 20,
        title: "Contains Duplicate",
        description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
        examples: `Examples:

        Input: [1,2,3,1]
        Output: true

        Input: [1,2,3,4]
        Output: false`
    },
    {
        id: 21,
        title: "Invert Binary Tree",
        description: "Given the root of a binary tree, invert the tree, and return its root.",
        examples: `Examples:

        Input:
                1
               / \\
              2   3
             / \\
            4   5

        Output:
                1
               / \\
              3   2
                 / \\
                5   4`
    },
    {
        id: 22,
        title: "Min Cost Climbing Stairs",
        description: "You are given an integer array cost where cost[i] is the cost of the ith step on a staircase. Once you pay the cost, you can either climb one or two steps. You can either start from the step with index 0, or the step with index 1. Return the minimum cost to reach the top of the floor.",
        examples: `Examples:

        Input: [10,15,20]
        Output: 15
        Explanation: You will start at index 1. Pay 15 and climb two steps to reach the top. The total cost is 15.`
    },
    {
        id: 23,
        title: "Valid Anagram",
        description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
        examples: `Examples:

        Input: s = "anagram", t = "nagaram"
        Output: true

        Input: s = "rat", t = "car"
        Output: false`
    },
    {
        id: 24,
        title: "Meeting Rooms",
        description: "Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.",
        examples: `Examples:

        Input: [[0,30],[5,10],[15,20]]
        Output: false

        Input: [[7,10],[2,4]]
        Output: true`
    },
    {
        id: 25,
        title: "Missing Number",
        description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
        examples: `Examples:

        Input: [3,0,1]
        Output: 2

        Input: [0,1]
        Output: 2

        Input: [9,6,4,2,3,5,7,0,1]
        Output: 8`
    },
    {   
        id: 26,
        title: "Kth Largest Element in a Stream",
        description: "Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element. Implement the KthLargest class: KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums. int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.",
        examples: `Examples:

        Input: k = 3, nums = [4, 5, 8, 2], val = 3
        Output: 4

        Input: k = 1, nums = [], val = 3
        Output: 3

        Input: k = 2, nums = [0], val = -1
        Output: -1`
    },
    {
        id: 27,
        title: "Binary Search",
        description: "Given a sorted array of integers nums and an integer target, return the index of target in nums. If target is not found, return -1. You must write an algorithm with O(log n) runtime complexity.",
        examples: `Examples:

        Input: nums = [1,2,3,4,5], target = 3
        Output: 2`
    },
    {
        id: 28,
        title: "Counting Bits",
        description: "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.",
        examples: `Examples:

        Input: 2
        Output: [0,1,1]

        Input: 5
        Output: [0,1,1,2,1,2]`
    },
    {
        id: 30,
        title: "Longest Substring Without Repeating Characters",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        examples: `Examples:

        Input: s = "abcabcbb"
        Output: 3
        Explanation: The longest substring without repeating characters is "abc", which has a length of 3.

        Input: s = "bbbbb"
        Output: 1
        Explanation: The longest substring without repeating characters is "b", which has a length of 1.`
    },
    {
        id: 31,
        title: "Longest Palindromic Substring",
        description: "Given a string s, return the longest palindromic substring in s.",
        examples: `Examples:

        Input: s = "babad"
        Output: "bab"
        Explanation: "aba" is also a valid answer.

        Input: s = "cbbd"
        Output: "bb"`
    },
    {
        id: 32,
        title: "Coin Change II",
        description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0. You may assume that you have an infinite number of each kind of coin.",
        examples: `Examples:

        Input: coins = [1,2,5], amount = 5
        Output: 4
        Explanation: There are four ways to make up the amount:
        5=5
        5=2+2+1
        5=2+1+2
        5=1+2+2
        5=1+1+1+1+1`
    },
    {
        id: 33,
        title: "Reverse Integer",
        description: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
        examples: `Examples:

        Input: 123
        Output: 321

        Input: -123
        Output: -321`
    },
    {
        id: 35,
        title: "Container With Most Water",
        description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store. Notice that you may not slant the container.",
        examples: `Examples:

        Input: height = [1,8,6,2,5,4,8,3,7]
        Output: 49

        Input: height = [1,1]
        Output: 1`
    }, 
    {
        id: 41,
        title: "Search in Rotated Sorted Array",
        description: "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated around an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 to become [4,5,6,7,0,1,2]. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.",
        examples: `Examples:

        Input: nums = [4,5,6,7,0,1,2], target = 0
        Output: 4

        Input: nums = [4,5,6,7,0,1,2], target = 3
        Output: -1`
    },
    {
        id: 42,
        title: "Valid Sudoku",
        description: "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules: Each row must contain the digits 1-9 without repetition. Each column must contain the digits 1-9 without repetition. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition. Note: A Sudoku board (partially filled) could be valid but is not necessarily solvable. Only the filled cells need to be validated according to the mentioned rules.",
        examples: `Examples:

        Input: board = 
        [["5","3",".",".","7",".",".",".","."]
        ,["6",".",".","1","9","5",".",".","."]
        ,[".","9","8",".",".",".",".","6","."]
        ,["8",".",".",".","6",".",".",".","3"]
        ,["4",".",".","8",".","3",".",".","1"]
        ,["7",".",".",".","2",".",".",".","6"]
        ,[".","6",".",".",".",".","2","8","."]
        ,[".",".",".","4","1","9",".",".","5"]
        ,[".",".",".",".","8",".",".","7","9"]]
        Output: true`
    },
    {
        id: 43,
        title: "Combination Sum",
        description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.",
        examples: `Examples:

        Input: candidates = [2,3,6,7], target = 7
        Output: [[2,2,3],[7]]

        Input: candidates = [2,3,5], target = 8
        Output: [[2,2,2,2],[2,3,3],[3,5]]`
    },
    {
        id: 44,
        title: "Combination Sum II",
        description: "Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target. Each number in candidates may only be used once in the combination. Note: The solution set must not contain duplicate combinations.",
        examples: `Examples:

        Input: candidates = [10,1,2,7,6,1,5], target = 8
        Output: [[1,1,6],[1,2,5],[1,7],[2,6]]`
    },
    {
        id: 45,
        title: "Multiply Strings",
        description: "Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.",
        examples: `Examples:

        Input: num1 = "2", num2 = "3"
        Output: "6"

        Input: num1 = "123", num2 = "456"
        Output: "56088"`
    },
    {
        id: 46,
        title: "Jump Game II",
        description: "You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0]. Each element nums[i] represents the maximum length of a forward jump you can make from index i. In other words, if you are at nums[i], you can jump to any nums[j] where: i + 1 <= j <= min(i + nums[i], n - 1). Return the minimum number of jumps to reach the last index of the array. The test cases are generated such that you can always reach the last index.",
        examples: `Examples:

        Input: nums = [2,3,1,1,4]
        Output: 2

        Input: nums = [2,3,0,1,4]
        Output: 2`
    },
    {
        id: 47,
        title: "Permutations",
        description: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
        examples: `Examples:

        Input: nums = [1,2,3]
        Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`
    },
    {
        id: 48,
        title: "Rotate Image",
        description: "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.",
        examples: `Examples:

        Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
        Output: [[7,4,1],[8,5,2],[9,6,3]]`
    },
    {
        id: 49,
        title: "Group Anagrams",
        description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
        examples: `Examples:

        Input: strs = ["eat","tea","tan","ate","nat","bat"]
        Output: [["bat"],["nat","tan"],["ate","eat","tea"]]`
    },
    {
        id: 50,
        title: "Pow(x, n)",
        description: "Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).",
        examples: `Examples:

        Input: x = 2.00000, n = 10
        Output: 1024.00000

        Input: x = 2.10000, n = 3
        Output: 9.26100`
    },
    {
        id: 51,
        title: "Maximum Subarray",
        description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
        examples: `Examples:

        Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
        Output: 6

        Input: nums = [1]
        Output: 1`
    },
    {
        id: 52,
        title: "Spiral Matrix",
        description: "Given an m x n matrix, return all elements of the matrix in spiral order.",
        examples: `Examples:

        Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
        Output: [1,2,3,6,9,8,7,4,5]`
    },
    {
        id: 53,
        title: "Jump Game",
        description: "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.",
        examples: `Examples:

        Input: nums = [2,3,1,1,4]
        Output: true

        Input: nums = [3,2,1,0,4]
        Output: false`
    },
    {
        id: 54,
        title: "Merge Intervals",
        description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
        examples: `Examples:

        Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
        Output: [[1,6],[8,10],[15,18]]`
    },
    {
        id: 55,
        title: "Insert Interval",
        description: "You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval. Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary). Return the new list of intervals after the insertion.",
        examples: `Examples:

        Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
        Output: [[1,5],[6,9]]`
    },
    {
        id: 56,
        title: "Permutation in String",
        description: "Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1's permutations is the substring of s2.",
        examples: `Examples:

        Input: s1 = "ab", s2 = "eidbaooo"
        Output: true

        Input: s1 = "ab", s2 = "eidboaoo"
        Output: false`
    },
    {
        id: 58,
        title: "Edit Distance",
        description: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have the following three operations permitted on a word: Insert a character, Delete a character, Replace a character",
        examples: `Examples:

        Input: word1 = "horse", word2 = "ros"
        Output: 3`
    },
    {
        id: 59,
        title: "Set Matrix Zeroes",
        description: "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's. You must do it in place.",
        examples: `Examples:

        Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
        Output: [[1,0,1],[0,0,0],[1,0,1]]`
    },
    {
        id: 60,
        title: "Search a 2D Matrix",
        description: "Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties: Integers in each row are sorted from left to right. The first integer of each row is greater than the last integer of the previous row.",
        examples: `Examples:

        Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
        Output: true`
    },
    {
        id: 61,
        title: "Binary Tree Inorder Traversal",
        description: "Perform an inorder traversal of a binary tree and return the sequence of visited nodes.",
        examples: `Examples:

        Input: 
            1
             \\
              2
             /
            3
        Output: [1, 3, 2]
        
        Input:
            4
           / \\
          2   5
         / \\
        1   3
        Output: [1, 2, 3, 4, 5]`
    },
    {
        id: 62,
        title: "Find Minimum in Rotated Sorted Array",
        description: "Given a rotated sorted array without duplicates, find the minimum element efficiently.",
        examples: `Examples:

        Input: [3, 4, 5, 1, 2]
        Output: 1

        Input: [4, 5, 6, 7, 0, 1, 2]
        Output: 0`
    },
    {
        id: 63,
        title: "Number of Islands",
        description: "Given a 2D grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
        examples: `Examples:

        Input:
        [
            ["1","1","1","1","0"],
            ["1","1","0","1","0"],
            ["1","1","0","0","0"],
            ["0","0","0","0","0"]
        ]
        Output: 1

        Input:
        [
            ["1","1","0","0","0"],
            ["1","1","0","0","0"],
            ["0","0","1","0","0"],
            ["0","0","0","1","1"]
        ]
        Output: 3`
    },
    {
        id: 64,
        title: "Course Schedule",
        description: "Determine if it's possible to complete all courses given the prerequisite pairs, ensuring there are no cyclic dependencies.",
        examples: `Examples:

        Input: numCourses = 2, prerequisites = [[1, 0]]
        Output: true
        Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.

        Input: numCourses = 2, prerequisites = [[1, 0], [0, 1]]
        Output: false
        Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.`,
    },
]