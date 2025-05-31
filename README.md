# Sudoku Game

This is my first full-stack project and also my first time uploading a project to Github. I built this Sudoku game to practice working with a modern tech stack and to get hands-on experience managing a project from end to end.

## Features
- **Frontend**: Built with React and TypeScript, using Vite as the build tool.
- **Backend**: Powered by Java Spring Boot (Maven), responsible for generating random Sudoku boards and validating whether a board is solved correctly.
- **User Interface**: Simple, clean, and easy-to-use Sudoku board interface. But is not responsive
- **Validation**: Provides immediate feedback on whether the user's board solution is correct.

## Frontend (React + TypeScript)
The frontend is responsible for the user interface where users can interact with the Sudoku board. It includes features like:
- A page that allow users to choose difficulty: Easy, Medium, Difficult.
- A page that allow users to play the game.
  + A grid of cells that users can fill.
  + A timer to record how much time users take to solve.
  + A pause button to stop the timer and blur the board.
  + Buttons for summitting the answer.
- A page that allow users to check the result.

- Weakness: The design is not very responsive.

### Installation & Setup
To get started with the frontend, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/TheTangentLine/sudoku_fullstack.git
    cd sudoku_fullstack/frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```
    This will start the React app at [http://localhost:5173](http://localhost:5173).

## Backend (Java Spring Boot)
The backend is a simple Spring Boot application that provides two key endpoints:
- **Generate Sudoku Board**: Returns a randomly generated Sudoku puzzle.
- **Validate Solution**: Checks whether a given board configuration is valid and complete.

### Installation & Setup
To get started with the backend, follow these steps:

1. Navigate to the backend directory:
    ```bash
    cd sudoku_fullstack/backend
    ```

2. Build the project:
    ```bash
    mvn clean install
    ```

3. Run the backend server:
    ```bash
    mvn spring-boot:run
    ```
    This will start the backend API on [http://localhost:8080](http://localhost:8080).

### API Endpoints
1. **GET** `/api/generate-board`
   Generates a new Sudoku board.
   - Example response:
   ```json
    {
      "board": [
        [9, 6, 8, 4, 5, 0, 2, 0, 0],
        [2, 5, 3, 9, 1, 8, 6, 7, 4],
        [7, 4, 1, 3, 2, 6, 8, 5, 9],
        [0, 0, 9, 7, 4, 3, 2, 8, 0],
        [3, 7, 4, 6, 8, 2, 1, 0, 9],
        [8, 0, 6, 0, 9, 0, 3, 4, 0],
        [1, 9, 7, 8, 3, 4, 5, 0, 2],
        [0, 8, 2, 5, 7, 1, 4, 9, 0],
        [0, 3, 5, 2, 0, 9, 0, 8, 1]
      ],
      "fixedCells": [
        [false, false, false, false, false, true, false, true, true],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [true, true, false, false, false, false, false, false, true],
        [false, false, false, false, false, false, false, true, false],
        [false, true, false, true, false, true, false, false, true],
        [false, false, false, false, false, false, false, true, false],
        [true, false, false, false, false, false, false, false, true],
        [true, false, false, false, true, false, true, false, false]
      ],
      "solution": [
        [9, 6, 8, 4, 5, 7, 2, 1, 3],
        [2, 5, 3, 9, 1, 8, 6, 7, 4],
        [7, 4, 1, 3, 2, 6, 8, 5, 9],
        [5, 1, 9, 7, 4, 3, 2, 8, 6],
        [3, 7, 4, 6, 8, 2, 1, 5, 9],
        [8, 2, 6, 1, 9, 5, 3, 4, 7],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [4, 3, 5, 2, 6, 9, 7, 8, 1]
      ]
    }
   
2. **POST** `/api/validate-board`
   Check whether the answer is correct or not.
   - Example request:
```json
      {
      "board": [
        [9, 6, 8, 4, 5, 0, 2, 0, 0],
        [2, 5, 3, 9, 1, 8, 6, 7, 4],
        [7, 4, 1, 3, 2, 6, 8, 5, 9],
        [0, 0, 9, 7, 4, 3, 2, 8, 0],
        [3, 7, 4, 6, 8, 2, 1, 0, 9],
        [8, 0, 6, 0, 9, 0, 3, 4, 0],
        [1, 9, 7, 8, 3, 4, 5, 0, 2],
        [0, 8, 2, 5, 7, 1, 4, 9, 0],
        [0, 3, 5, 2, 0, 9, 0, 8, 1]
      ],
      "fixedCells": [
        [false, false, false, false, false, true, false, true, true],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [true, true, false, false, false, false, false, false, true],
        [false, false, false, false, false, false, false, true, false],
        [false, true, false, true, false, true, false, false, true],
        [false, false, false, false, false, false, false, true, false],
        [true, false, false, false, false, false, false, false, true],
        [true, false, false, false, true, false, true, false, false]
      ],
      "solution": [
        [9, 6, 8, 4, 5, 7, 2, 1, 3],
        [2, 5, 3, 9, 1, 8, 6, 7, 4],
        [7, 4, 1, 3, 2, 6, 8, 5, 9],
        [5, 1, 9, 7, 4, 3, 2, 8, 6],
        [3, 7, 4, 6, 8, 2, 1, 5, 9],
        [8, 2, 6, 1, 9, 5, 3, 4, 7],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [4, 3, 5, 2, 6, 9, 7, 8, 1]
      ]
    }
```
  - Example response:
```json
  false
