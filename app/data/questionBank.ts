export interface Question {
    id: number;
    title: string;
    description: string;
    examples: string;
    milestones?: {
        id: number;
        title: string;
        description: string;
    }[];
}

export const questionBank: Question[] = [
    {
        id: 1,
        title: "Two Sum",
        description: `In an e-commerce platform, customers often receive promotional discounts when they purchase two items 
whose total price meets a certain threshold. Your task is to develop a feature that suggests two products from a given list 
that add up to exactly the minimum required spend for a discount. 

For example, if a customer has a $50 minimum spend to qualify 
for free shipping and their cart has items priced at $10, $25, $30, and $40, the system should recommend the pair $25 and $30 
to reach the target exactly.`,
        examples: `Examples:

Input: nums = [2,7,11,15], target = 9
Output: [0,1] (2 + 7 = 9)

Input: nums = [3,2,4], target = 6
Output: [1,2] (2 + 4 = 6)`,
        milestones: [
            {
                id: 1,
                title: "Identify Edge Cases Where No Valid Pair Exists",
                description: `Recognizes that there is always exactly one valid pair based on the problem guarantee.
Discusses what would happen if the guarantee didn’t exist (e.g., no valid pair scenario like [10, 20, 30] with a target of 100).
Mentions possible variations, like handling multiple valid pairs or requiring the "best" pair.`,
            },
            {
                id: 2,
                title: "Identify Relevant Data Structures",
                description: `Lists possible data structures:
- Array/List (for storing item prices).
- Hash Table/Set (for efficient lookups).
Considers alternatives like sorting + two-pointer approach.`,
            },
            {
                id: 3,
                title: "Justify Choice of Data Structures with Complexity Analysis",
                description: `Explains why a hash table (dict/set) enables O(n) time complexity for quick lookups.
Compares with a brute-force O(n²) nested loop approach and explains why it’s inefficient.
Discusses the trade-offs of sorting the list first (O(n log n) time) and using the two-pointer technique.`,
            },
            {
                id: 4,
                title: "Code the Solution",
                description: `Implements the solution in an organized, readable manner.
Uses meaningful variable names (prices, target, seen_prices).
Ensures correct return format (either the price pair or indices).`,
            },
            {
                id: 5,
                title: "Walk Through the Code with an Example",
                description: `Takes an input example and manually traces execution step by step.
Shows how the hash table updates and when a match is found.
Checks if the code handles all possible valid inputs.
`,
            },
            {
                id: 6,
                title: "Address Edge Cases & Invalid Inputs",
                description: `Handles cases like:
- Minimum input size (e.g., only two numbers).
- Duplicate numbers in the list (ensuring the same item isn’t reused).
- Unsorted input order (verifying that approach works regardless).
- If no valid pair existed (although this is ruled out by the problem guarantee).
`,
            },
        ]
    },
    {
        id: 2,
        title: "Valid Parentheses",
        description: "Determine if a string containing various types of parentheses is valid, meaning every opening bracket has a corresponding closing bracket in the correct order.",
        examples: `Examples:

Input: "()"
Output: true

Input: "()[]{}"
Output: true

Input: "(]"
Output: false`
    },
    {   
        id: 3,
        title: "Valid Palindrome",
        description: "Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.",
        examples: `Examples:

        Input: "A man, a plan, a canal: Panama"
        Output: true
        Explanation: "amanaplanacanalpanama" is a palindrome.

        Input: "race a car"
        Output: false
        Explanation: "raceacar" is not a palindrome.`
    },
    {
        id: 4,
        title: "Reverse Linked List",
        description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        examples: `Examples:

        Input: 1 -> 2 -> 3 -> 4 -> 5
        Output: 5 -> 4 -> 3 -> 2 -> 1

        Input: 1 -> 2
        Output: 2 -> 1`
    },
    {
        id: 5,
        title: "Add Two Numbers",
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
        examples: `Examples:

        Input: l1 = [2,4,3], l2 = [5,6,4]
        Output: [7,0,8]
        Explanation: 342 + 465 = 807.

        Input: l1 = [0], l2 = [0]
        Output: [0]`
    },
    {
        id: 6,
        title: "Count Good Nodes in Binary Tree",
        description: "Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X. Return the number of good nodes in the binary tree.",
        examples: `Examples:

        Input:

                3
               / \
              1   4
             /   / \
            3   1   5

        Output: 4
        Explanation:
        Root Node (3) is always a good node because it is the root.
        Node 4 -> (3,4) is the maximum value in the path starting from the root.
        Node 5 -> (3,4,5) is the maximum value in the path.
        Node 3 -> (3,1,3) is the maximum value in the path.
        Node 1 -> (3,1) is not a good node because 3 is greater than 1.`
    }, 
    {
        id: 7,
        title: "Rotting Oranges",
        description: "You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.",
        examples: `Examples:

        Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
        Output: 4

        Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
        Output: -1`
    },
    {
        id: 8,
        title: "3Sum",
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
        examples: `Examples:

        Input: nums = [-1,0,1,2,-1,-4]
        Output: [[-1,-1,2],[-1,0,1]]`
    },
    {
        id: 9,
        title: "Letter Combinations of a Phone Number",
        description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order. A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.",
        examples: `Examples:

        Input: digits = "23"
        Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]`
    },
    {
        id: 10,
        title: "Remove Nth Node From End of List",
        description: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
        examples: `Examples:

        Input: head = [1,2,3,4,5], n = 2
        Output: [1,2,3,5]`
    },
    {
        id: 11,
        title: "Generate Parentheses",
        description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
        examples: `Examples:

        Input: n = 3
        Output: ["((()))","(()())","(())()","()(())","()()()"]`
    },
    {
        id: 12,
        title: "Unique Paths",
        description: "There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time. Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner. The test cases are generated so that the answer will be less than or equal to 2 * 10^9.",
        examples: `Examples:

        Input: m = 3, n = 7
        Output: 28

        Input: m = 3, n = 2
        Output: 3`
    },
]