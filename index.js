#! /usr/bin/env node 
// Import necessary modules
import inquirer from 'inquirer';
import chalk from 'chalk';
// Define TodoApp class
class TodoApp {
    todos;
    nextId;
    constructor() {
        // Initialize empty array for todos and nextId
        this.todos = [];
        this.nextId = 1;
    }
    // Display menu options
    displayMenu() {
        console.log(chalk.yellow.bold('\nTodo App'));
        console.log(chalk.cyan('1. Add Todo'));
        console.log(chalk.cyan('2. Update Todo'));
        console.log(chalk.cyan('3. Delete Todo'));
        console.log(chalk.cyan('4. View Todos'));
        console.log(chalk.cyan('5. Mark Todo as Complete'));
        console.log(chalk.red('0. Exit'));
    }
    // Function to add todo
    async addTodo() {
        const { task } = await inquirer.prompt({
            type: 'input',
            name: 'task',
            message: 'Enter your todo task:'
        });
        this.todos.push({ id: this.nextId++, task, completed: false });
        console.log(chalk.green('Todo added successfully!'));
    }
    // Function to update todo
    async updateTodo() {
        const { id } = await inquirer.prompt({
            type: 'input',
            name: 'id',
            message: 'Enter the ID of the todo to update:'
        });
        const todoIndex = this.todos.findIndex(todo => todo.id === parseInt(id));
        if (todoIndex !== -1) {
            const { task } = await inquirer.prompt({
                type: 'input',
                name: 'task',
                message: 'Edit the task:',
                default: this.todos[todoIndex].task // Display existing task as default value
            });
            this.todos[todoIndex].task = task;
            console.log(chalk.green('Todo updated successfully!'));
        }
        else {
            console.log(chalk.red('Todo not found!'));
        }
    }
    // Function to delete todo
    async deleteTodo() {
        const { id } = await inquirer.prompt({
            type: 'input',
            name: 'id',
            message: 'Enter the ID of the todo to delete:'
        });
        const todoIndex = this.todos.findIndex(todo => todo.id === parseInt(id));
        if (todoIndex !== -1) {
            this.todos.splice(todoIndex, 1);
            console.log(chalk.green('Todo deleted successfully!'));
        }
        else {
            console.log(chalk.red('Todo not found!'));
        }
    }
    // Function to mark todo as complete 
    async markTodo() {
        const { id } = await inquirer.prompt({
            type: 'input',
            name: 'id',
            message: 'Enter the ID of the todo to mark as complete:'
        });
        const todoIndex = this.todos.findIndex(todo => todo.id === parseInt(id));
        if (todoIndex !== -1) {
            this.todos[todoIndex].completed = !this.todos[todoIndex].completed;
            console.log(chalk.green('Todo marked successfully!'));
        }
        else {
            console.log(chalk.red('Todo not found!'));
        }
    }
    // Function to view all todos
    viewTodos() {
        console.log(chalk.yellow.bold('\nTodos:'));
        this.todos.forEach(todo => {
            const status = todo.completed ? chalk.green('(Completed)') : chalk.red('(Incomplete)');
            console.log(`${todo.id}. ${todo.task} ${status}`);
        });
    }
    // Function to start the Todo App
    async start() {
        let choice = '';
        while (choice !== '0') {
            this.displayMenu();
            const { action } = await inquirer.prompt({
                type: 'input',
                name: 'action',
                message: 'Enter your choice:'
            });
            choice = action;
            switch (choice) {
                case '1':
                    await this.addTodo();
                    break;
                case '2':
                    await this.updateTodo();
                    break;
                case '3':
                    await this.deleteTodo();
                    break;
                case '4':
                    this.viewTodos();
                    break;
                case '5':
                    await this.markTodo();
                    break;
                case '0':
                    console.log(chalk.yellow('Exiting...'));
                    break;
                default:
                    console.log(chalk.red('Invalid choice!'));
            }
        }
    }
}
// Create TodoApp instance and start the app
const todoApp = new TodoApp();
todoApp.start();
