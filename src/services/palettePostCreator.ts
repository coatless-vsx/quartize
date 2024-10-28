
/**
 * Implements post creation through VS Code's command palette interface.
 * 
 * @module Services
 * @category PostCreation
 */

import * as vscode from 'vscode';
import { PostCreatorBase } from './postCreatorBase';
import { PostMetadata } from '../types/postTypes';


/**
 * Handles blog post creation through VS Code's command palette interface.
 * 
 * @category Services
 * 
 * @remarks
 * This class implements a sequential input collection process through VS Code's
 * native input boxes. It provides a lightweight alternative to the webview interface
 * for users who prefer keyboard-driven workflows.
 * 
 * @extends PostCreatorBase
 * 
 * @example
 * ```typescript
 * const creator = new PalettePostCreator();
 * await creator.createPost();
 * ```
 */
export class PalettePostCreator extends PostCreatorBase {
    /**
     * Initiates the post creation process through command palette inputs.
     * 
     * @remarks
     * This method orchestrates the collection of post metadata through sequential
     * input boxes. It shows success/error messages through VS Code's notification
     * system.
     * 
     * The process can be cancelled at any input step by pressing Escape or closing
     * the input box.
     * 
     * @returns Promise that resolves when post creation is complete or cancelled
     * 
     * @throws {@link Error}
     * Throws if post creation fails due to file system errors or validation issues
     * 
     * @example
     * ```typescript
     * const creator = new PalettePostCreator();
     * try {
     *     await creator.createPost();
     * } catch (error) {
     *     console.error('Post creation failed:', error);
     * }
     * ```
     */
    public async createPost(): Promise<void> {
        try {
            const metadata = await this.collectMetadata();
            if (!metadata) return;  // User cancelled the operation

            const postContent = this.generatePostContent(metadata);
            await this.writeAndOpenPost(metadata, postContent);
            
            vscode.window.showInformationMessage(`Created new blog post: ${metadata.title}`);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to create post: ${error}`);  // Re-throw to allow caller to handle error
        }
    }

    /**
     * Collects post metadata through sequential input boxes.
     * 
     * @remarks
     * Presents a series of input boxes to collect post metadata:
     * 1. Title (required)
     * 2. Description (optional)
     * 3. Categories (optional, comma-separated)
     * 
     * The process can be cancelled at any step by:
     * - Pressing Escape
     * - Closing the input box
     * - Not providing a title (required field)
     * 
     * @returns Promise resolving to PostMetadata if successful, undefined if cancelled
     * 
     * @throws Never throws - returns undefined instead of throwing
     * 
     * @private
     */
    private async collectMetadata(): Promise<PostMetadata | undefined> {
        // Get post title - required field
        const title = await vscode.window.showInputBox({
            prompt: 'Enter the blog post title',
            placeHolder: 'My New Blog Post'
        });

        if (!title) return undefined;  // User cancelled

        // Get post description - optional
        const description = await vscode.window.showInputBox({
            prompt: 'Enter the blog post description',
            placeHolder: 'A brief description of the post'
        });

        // Get categories - optional
        const categories = await vscode.window.showInputBox({
            prompt: 'Enter categories (comma-separated)',
            placeHolder: 'tech, programming, quarto'
        });

        // Return collected metadata
        return {
            title,
            description: description || '',
            categories: categories || '',
            date: new Date().toISOString().split('T')[0],
            author: 'Your Name',
            image: '',
            imageAlt: ''
        };
    }
}
