package com.example.sudoku.controller;

import java.util.concurrent.CompletableFuture;
import com.example.sudoku.model.SudokuBoard;
import com.example.sudoku.service.SudokuService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SudokuController {
    // Automatically inject the SudokuService bean -------------------------------
    @Autowired
    private SudokuService sudokuService;

    // Generate a Sudoku board and solution ---------------------------------------
    @GetMapping("/generate-board")
    public CompletableFuture<SudokuBoard> generateBoard(@RequestParam(defaultValue = "0") int difficulty) {
        return sudokuService.generateBoard(difficulty);
    }

    // // Validate the Sudoku board submitted by the user -------------------------
    @PostMapping("/validate-board")
    public CompletableFuture<Boolean> validateBoard(@RequestBody SudokuBoard board) {
        return sudokuService.validateBoard(board);
    }
}
