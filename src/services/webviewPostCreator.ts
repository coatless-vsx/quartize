/**
 * Implements post creation through a graphical webview interface.
 * 
 * @module Services
 * @category PostCreation
 */

import * as vscode from 'vscode';
import * as path from 'path';  // Add this import
import { PostCreatorBase } from './postCreatorBase';
import { WebviewContentGenerator } from '../ui/webviewContentGenerator';
import { ConfigurationManager } from '../utils/configurationManager';
import { PostMetadata } from '../types/postTypes';


/**
 * Manages blog post creation through a graphical webview interface.
 * 
 * @category Services
 * 
 * @remarks
 * This class provides a form-based interface for creating blog posts using VS Code's
 * webview API. It supports rich interactions including:
 * - Form-based input
 * - Image file selection
 * - Predefined author and category selection
 * - Real-time validation
 * 
 * @extends PostCreatorBase
 * 
 * @example
 * ```typescript
 * const creator = new WebviewPostCreator();
 * await creator.createPostPanel();
 * ```
 */
export class WebviewPostCreator extends PostCreatorBase {

    /** The VS Code webview panel instance */
    private panel: vscode.WebviewPanel | undefined;

    /** Configuration manager for extension settings */
    private configManager: ConfigurationManager;

    /** Generator for webview HTML content */
    private contentGenerator: WebviewContentGenerator;

    /**
     * Creates a new WebviewPostCreator instance.
     * 
     * @remarks
     * Initializes required services and generators.
     */
    constructor() {
        super();
        this.configManager = new ConfigurationManager();
        this.contentGenerator = new WebviewContentGenerator();
    }

    /**
     * Creates and displays the webview panel for post creation.
     * 
     * @remarks
     * This method:
     * 1. Loads extension configuration
     * 2. Creates a new webview panel
     * 3. Generates and sets the HTML content
     * 4. Sets up message handling
     * 
     * The panel is created in the first editor column and supports JavaScript.
     * 
     * @throws {@link Error}
     * Throws if configuration loading fails
     */
    public async createPostPanel(): Promise<void> {
        const config = await this.configManager.loadConfig();
        
        this.panel = vscode.window.createWebviewPanel(
            'quartize',
            'Create New Quarto Blog Post',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        this.panel.webview.html = this.contentGenerator.generate(config);
        this.setupMessageHandling();
    }

    /**
     * Sets up message handling between webview and extension.
     * 
     * @remarks
     * Handles two types of messages:
     * - createPost: Creates a new blog post from form data
     * - selectImage: Opens file picker for image selection
     * 
     * @private
     */
    private setupMessageHandling(): void {
        if (!this.panel) return;

        this.panel.webview.onDidReceiveMessage(async message => {
            switch (message.command) {
                case 'createPost':
                    await this.handleCreatePost(message.data);
                    break;
                case 'selectImage':
                    await this.handleImageSelection();
                    break;
            }
        });
    }

    /**
     * Handles post creation requests from the webview.
     * 
     * @param data - Post metadata from the webview form
     * 
     * @throws {@link Error}
     * Throws if post creation fails
     * 
     * @private
     */
    private async handleCreatePost(data: PostMetadata): Promise<void> {
        try {
            const postContent = this.generatePostContent(data);
            await this.writeAndOpenPost(data, postContent);
            this.panel?.dispose();
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to create blog post: ${error}`);
        }
    }

    /**
     * Handles image selection through VS Code's file picker.
     * 
     * @remarks
     * Opens a file picker dialog filtered to image files and sends
     * the selected path back to the webview.
     * 
     * Supports the following image formats:
     * - PNG
     * - JPEG/JPG
     * - GIF
     * - WebP
     * - SVG
     * 
     * @throws {@link Error}
     * Throws if file selection fails
     * 
     * @private
     */
    private async handleImageSelection(): Promise<void> {
        const fileUris = await vscode.window.showOpenDialog({
            canSelectFiles: true,
            canSelectFolders: false,
            canSelectMany: false,
            filters: {
                'Images': ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg']
            },
            title: 'Select Featured Image'
        });

        if (fileUris?.[0] && this.panel) {
            const imagePath = this.getRelativeImagePath(fileUris[0]);
            this.panel.webview.postMessage({
                command: 'imageSelected',
                path: imagePath
            });
        }
    }

    /**
     * Converts absolute file paths to workspace-relative paths when possible.
     * 
     * @param fileUri - The URI of the selected image
     * @returns Workspace-relative path or absolute path if outside workspace
     * 
     * @remarks
     * This helps maintain portable paths within the workspace.
     * If the selected file is outside the workspace, returns the absolute path.
     * 
     * @private
     */
    private getRelativeImagePath(fileUri: vscode.Uri): string {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) return fileUri.fsPath;

        const workspacePath = workspaceFolders[0].uri.fsPath;
        return fileUri.fsPath.startsWith(workspacePath)
            ? path.relative(workspacePath, fileUri.fsPath)
            : fileUri.fsPath;
    }
}
