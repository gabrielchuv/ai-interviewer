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
        description: `Imagine an e-commerce website where customers can use a special "bundle discount" offer. 
In this bundle discount, a customer has a voucher that applies only if they purchase exactly two items whose prices 
add up to a specific total voucher amount, for instance, $100. Your task as a software engineer is to scan the product catalog and 
identify two items that, when combined, equal the voucher amount.`,
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
        description: `Imagine you're building a restaurant kitchen game. After the day is over and the plates
have been washed the player must organise the plates and cover them with a matching cover. 

There are three types of plates and their matching covers:
- A soup plate represented by '(' matched by a cover ')',
- A dinner plate represented by '[' matched by a cover ']',
- A dessert plate represented by '<' matched by a cover '>'.

Your task is to write a function that takes in a string representing plates and covers and checks if it is valid. 
A string of plates is valid if every opening plate has a corresponding closing plate in the correct order.
The correct order allows for nested plates, for example, a soup plate can be nested inside a dinner plate.`,
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
        description: `Imagine you're working in a spy agency, and agents communicate using secret passphrases.
These passphrases must read the same forwards and backwards to verify authenticity. However:
- Agents are often in a hurry, so the message may include spaces, punctuation, or mixed casing.
- The system must ignore anything that isn't a letter or a number, and it must treat uppercase 
and lowercase as the same.

Your job is to create a system that:
- Cleans up the message (removes spaces, commas, colons, etc.)
- Ignores casing
- Checks if what's left reads the same forwards and backwards

If this criteria is met, return true, otherwise return false.`,
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
        description: `You are given two non-empty linked lists representing two non-negative integers. The 
digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers
and return the sum as a linked list.`,
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
        description: `Imagine you're hiking through a mountain trail network (a tree). Each junction has a 
signpost with an elevation number. As you hike from the starting point (root) to any junction, a junction 
is considered 'good' if its elevation is higher than or equal to any previous elevation on that path — 
it's a new personal best. You are given a binary tree representing the mountain trail network. Your goal is 
to count how many junctions are 'good', meaning they're the highest seen so far on their way from the start.`,
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
        description: `Imagine a fruit storage room arranged like a grid. Each cell in the grid holds either 
a fresh orange (1), a rotten orange (2), or is empty (0). Every minute, the smell from rotten oranges 
spreads to any fresh orange directly next to them (up, down, left, or right), causing them to rot too. 
Your task is to figure out the minimum time it takes for all fresh oranges to rot, or determine if it 
is impossible for all fresh oranges to rot.`,
        examples: `Examples:

        Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
        Output: 4

        Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
        Output: -1`
    },
    {
        id: 8,
        title: "3Sum",
        description: `You're fixing a broken chair leg and need to recreate it using spare wood pieces. 
Each piece has a specific length, and your goal is to combine exactly three different pieces to match the 
required leg length (e.g., 30 cm). You can't reuse the same piece, and you want to find all unique 
combinations of three pieces that add up to that exact target length.`,
        examples: `Examples:

        Input: nums = [-1,0,1,2,-1,-4]
        Output: [[-1,-1,2],[-1,0,1]]`
    },
    {
        id: 9,
        title: "Letter Combinations of a Phone Number",
        description: `Given a string containing digits from 2-9 inclusive, return all possible letter 
combinations that the number could represent. Return the answer in any order. A mapping of digits to 
letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.`,
        examples: `Examples:

        Input: digits = "23"
        Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]`
    },
    {
        id: 10,
        title: "Remove Nth Node From End of List",
        description: `Imagine a line of people waiting for coffee, and you want to remove the nth person 
from the end — maybe the 2nd-to-last person forgot their wallet. You can only walk the line from front to 
back. You are given a linked list representing the line of people and the nth person to remove.`,
        examples: `Examples:

        Input: head = [1,2,3,4,5], n = 2
        Output: [1,2,3,5]`
    },
    {
        id: 11,
        title: "Generate Parentheses",
        description: `Given n pairs of parentheses, write a function to generate all combinations of 
well-formed parentheses.`,
        examples: `Examples:

        Input: n = 3
        Output: ["((()))","(()())","(())()","()(())","()()()"]`
    },
    {
        id: 12,
        title: "Unique Paths",
        description: `You're flying over a flooded landscape, where a map shows '1' for land and '0' 
for water. Land areas that are connected side-by-side (not diagonally) form a single island. Your job 
is to count how many separate land patches (islands) you can see from above — each one surrounded 
by water and not touching another.`,
        examples: `Examples:

        Input: m = 3, n = 7
        Output: 28

        Input: m = 3, n = 2
        Output: 3`
    },
]