package com.example.sudoku.model;

public class SudokuBoard {

    // Attributes ---------------------------------------------------

    private int[][] board; // 9x9 Sudoku board
    private boolean[][] fixedCells; // To track which cells are fixed
    private int[][] solution;

    // Constructor ---------------------------------
    public SudokuBoard(int[][] board, boolean[][] fixedCells, int[][] solution) {
        this.board = board;
        this.fixedCells = fixedCells;
        this.solution = solution;
    }

    // Getters --------------------------------

    public int[][] getBoard() {
        return board;
    }

    public boolean[][] getFixedCells() {
        return fixedCells;
    }

    public int[][] getSolution() {
        return solution;
    }

}
