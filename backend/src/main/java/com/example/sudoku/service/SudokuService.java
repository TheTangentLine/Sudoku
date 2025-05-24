package com.example.sudoku.service;

import java.util.Arrays;
import java.util.concurrent.CompletableFuture;
import org.springframework.stereotype.Service;
import com.example.sudoku.model.SudokuBoard;

@Service
public class SudokuService {

    // Generate a random Sudoku board --------------------------------------------
    public CompletableFuture<SudokuBoard> generateBoard(int difficulty) {
        return CompletableFuture.supplyAsync(() -> {

            int[][] board, solution;
            int randomBoard = (int) (Math.random() * 3);

            switch (randomBoard) {
                case 0:
                    board = new int[][] {
                            { 4, 3, 5, 2, 6, 9, 7, 8, 1 },
                            { 6, 8, 2, 5, 7, 1, 4, 9, 3 },
                            { 1, 9, 7, 8, 3, 4, 5, 6, 2 },
                            { 8, 2, 6, 1, 9, 5, 3, 4, 7 },
                            { 3, 7, 4, 6, 8, 2, 1, 5, 9 },
                            { 5, 1, 9, 7, 4, 3, 2, 8, 6 },
                            { 7, 4, 1, 3, 2, 6, 8, 5, 9 },
                            { 2, 5, 3, 9, 1, 8, 6, 7, 4 },
                            { 9, 6, 8, 4, 5, 7, 2, 1, 3 }
                    };
                    solution = new int[board.length][];
                    for (int i = 0; i < board.length; i++) {
                        solution[i] = Arrays.copyOf(board[i], board[i].length);
                    }
                    break;
                case 1:
                    board = new int[][] {
                            { 9, 2, 7, 5, 3, 8, 1, 6, 4 },
                            { 6, 5, 4, 1, 7, 2, 9, 8, 3 },
                            { 8, 3, 1, 9, 4, 6, 7, 2, 5 },
                            { 4, 9, 3, 7, 6, 1, 8, 5, 2 },
                            { 5, 1, 2, 4, 8, 9, 3, 7, 6 },
                            { 7, 8, 6, 3, 2, 5, 4, 1, 9 },
                            { 2, 6, 8, 2, 1, 3, 5, 4, 7 },
                            { 1, 7, 5, 8, 5, 4, 6, 9, 8 },
                            { 3, 4, 9, 6, 9, 7, 2, 3, 1 }
                    };
                    solution = new int[board.length][];
                    for (int i = 0; i < board.length; i++) {
                        solution[i] = Arrays.copyOf(board[i], board[i].length);
                    }
                    break;

                default:
                    board = new int[][] {
                            { 9, 6, 8, 4, 5, 7, 2, 1, 3 },
                            { 2, 5, 3, 9, 1, 8, 6, 7, 4 },
                            { 7, 4, 1, 3, 2, 6, 8, 5, 9 },
                            { 5, 1, 9, 7, 4, 3, 2, 8, 6 },
                            { 3, 7, 4, 6, 8, 2, 1, 5, 9 },
                            { 8, 2, 6, 1, 9, 5, 3, 4, 7 },
                            { 1, 9, 7, 8, 3, 4, 5, 6, 2 },
                            { 6, 8, 2, 5, 7, 1, 4, 9, 3 },
                            { 4, 3, 5, 2, 6, 9, 7, 8, 1 }
                    };
                    solution = new int[board.length][];
                    for (int i = 0; i < board.length; i++) {
                        solution[i] = Arrays.copyOf(board[i], board[i].length);
                    }
            }

            // Handle difficulty levels ----------------------------------------------
            int cellsDeleted = 0;

            switch (difficulty) {
                case 0:
                    cellsDeleted = 20;
                    break;
                case 1:
                    cellsDeleted = 40;
                    break;
                case 2:
                    cellsDeleted = 70;
                    break;
            }

            // Randomly remove numbers from the board to create a puzzle -----------------
            boolean[][] fixedCells = new boolean[9][9]; // Array to track fixed cells

            for (int i = 0; i < cellsDeleted; i++) {
                int row = (int) (Math.random() * 9);
                int col = (int) (Math.random() * 9);
                board[row][col] = 0; // Remove the number
                fixedCells[row][col] = true; // Mark this cell as fixed
            }

            return new SudokuBoard(board, fixedCells, solution);
        });
    }

    // Validate the Sudoku board submitted by the user -----------------------------
    public CompletableFuture<Boolean> validateBoard(SudokuBoard board) {
        return CompletableFuture.supplyAsync(() -> {
            return Arrays.deepEquals(board.getBoard(), board.getSolution());
        });
    }

}
