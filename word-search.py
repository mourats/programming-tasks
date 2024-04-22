def exist(board, word):
    # Validate if is possible search
    if not board or not word or not board[0]:
        return False

    # Get the rows and cols size from the board
    rows, cols = len(board), len(board[0])

    def DFS(row, col, index):
        # Base case: if the index is equal to the len word, it means that we already find it
        if index == len(word):
            return True

        # Base case: if the current cell is out of bounds or different of the word at same index, it means that branch is lost
        if row < 0 or col < 0 or row >= rows or col >= cols or board[row][col] != word[index]:
            return False

        # Store the cell and mark it with #
        tmp, board[row][col] = board[row][col], '#'

        # Call DFS function for the four possible directions. If at least one return True, we found it
        found = DFS(row + 1, col, index + 1) or DFS(row - 1, col, index + 1) or DFS(row, col + 1, index + 1) or DFS(row, col - 1, index + 1)

        # Restore the cell marked for next DFS recursion, starting from index 0
        board[row][col] = tmp

        return found

    # For every cell inside the board, call the DFS function
    for i in range(rows):
        for j in range(cols):
            if DFS(i, j, 0):
                return True

    return False

# Board example
board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
]

print("Board:")
for row in board:
    print(' '.join(row))

# Given examples
word1 = "ABCCED"
word2 = "SEE"
word3 = "ABCB"

# Other examples
word4 = "ASADECFD"
word5 = "ESEEDASA"
word6 = "CFSADEESE"

print(f"Word: {word1}, Output:", exist(board, word1))  # Output: True
print(f"Word: {word2}, Output:", exist(board, word2))  # Output: True
print(f"Word: {word3}, Output:", exist(board, word3))  # Output: False

print(f"Word: {word4}, Output:", exist(board, word4))  # Output: False
print(f"Word: {word5}, Output:", exist(board, word5))  # Output: True
print(f"Word: {word6}, Output:", exist(board, word6))  # Output: True
