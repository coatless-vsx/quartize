/**
 * Main entry point for the Quartize VS Code extension.
 * Provides functionality for creating Quarto blog posts through VS Code.
 * 
 * @packageDocumentation
 * @module Extension
 * @preferred
 * 
 * @remarks
 * This extension provides two main ways to create blog posts:
 * 1. Through the command palette
 * 2. Through a webview-based form interface
 * 
 * @copyright Copyright (c) 2024 HJJB, LLC. All rights reserved.
 */

import * as vscode from 'vscode';
import { PostCommandManager } from './commands/postCommandManager';

/**
 * Activates the Quartize extension.
 * 
 * @remarks
 * This is called by VS Code when the extension is first loaded.
 * Sets up command managers and registers all extension commands.
 * 
 * @param context - The extension context provided by VS Code
 */
export function activate(context: vscode.ExtensionContext) {
    const postManager = new PostCommandManager(context);
    postManager.registerCommands();
}

/**
 * Handles extension deactivation.
 * 
 * @remarks
 * Called by VS Code when the extension is being deactivated.
 * Currently no cleanup is required.
 */
export function deactivate() {}