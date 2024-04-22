# Programming Tasks

## 2. Word Search 

### Prerequisites:

- Python installed on your system (Python 3.x recommended).

### Execution Steps:

Run the script using the following command:

```
python3 word-search.py
```

The script is fully commented containing detailed step-by-step instructions for its execution.

### Output Explanation

Given the board:

```
[ 
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E']
]
```

And being the index's of the board:

```
[ 
  [(0,0), (0,1), (0,2), (0,3)],
  [(1,0), (1,1), (1,2), (1,3)],
  [(2,0), (2,1), (2,2), (2,3)]
]
```

- The word "ABCCED" exist at the positions: [(0,0), (0,1), (0,2), (1,2), (2,2), (2,1)].
- The word "SEE" exist at the positions: [(1, 3), (2, 3), (2, 2)].
- The word "ABCB" not exist.
- The word "ASADECFD" not exist. It would be necessary repeat letter.
- The word "ESEEDASA" exist at the positions: [(0, 3), (1, 3), (2, 3), (2, 2), (2, 1), (2, 0), (1, 0), (0, 0)].
- The word "CFSADEESE" exist at the positions: [(1, 2), (1, 1), (1, 0), (2, 0), (2, 1), (2, 2), (2, 3), (1, 3), (0, 3)].
