/**
 * Provides command management functionality for the Quartize extension.
 * 
 * @module Commands
 */


import * as vscode from 'vscode';
import { PalettePostCreator } from '../services/palettePostCreator';
import { WebviewPostCreator } from '../services/webviewPostCreator';

/**
 * Manages the registration and lifecycle of all extension commands.
 * 
 * @category Commands
 * 
 * @remarks
 * Coordinates between different post creation methods and maintains command subscriptions.
 * This class serves as the central hub for command registration and management.
 * 
 * @example
 * ```typescript
 * const manager = new PostCommandManager(context);
 * manager.registerCommands();
 * ```
 */
export class PostCommandManager {
    /** The VS Code extension context */
    private context: vscode.ExtensionContext;
    
    /** Handler for command palette post creation */
    private paletteCreator: PalettePostCreator;

    /** Handler for webview post creation */
    private webviewCreator: WebviewPostCreator;

    /**
     * Creates a new PostCommandManager instance.
     * 
     * @param context - The VS Code extension context
     */
    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.paletteCreator = new PalettePostCreator();
        this.webviewCreator = new WebviewPostCreator();
    }

    /**
     * Registers all extension commands with VS Code.
     * 
     * @remarks
     * Sets up command handlers and adds them to extension subscriptions.
     * 
     * @returns void
     * 
     * @beta This API is still in beta and may change
     */
    public registerCommands(): void {
        const paletteCommand = vscode.commands.registerCommand(
            'quartize.newPostPalette',
            () => this.paletteCreator.createPost()
        );

        const webviewCommand = vscode.commands.registerCommand(
            'quartize.newPostPanel',
            () => this.webviewCreator.createPostPanel()
        );

        this.context.subscriptions.push(paletteCommand, webviewCommand);
    }
}