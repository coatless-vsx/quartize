/**
 * Manages webview content generation and templating for the blog post creation interface.
 * 
 * @module UI
 * @category Webview
 */

import { ExtensionConfig } from '../types/configTypes';

/**
 * Generates HTML content for the webview panel.
 * Includes form elements and client-side JavaScript.
 */
export class WebviewContentGenerator {
    /**
     * Generates complete HTML content for the webview panel.
     * 
     * @param config - Extension configuration for populating form options
     * @returns Complete HTML content string
     */
    public generate(config: ExtensionConfig): string {
        const today = new Date().toISOString().split('T')[0];
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create New Blog Post</title>
    <style>
        body {
            padding: 20px;
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input, textarea, select {
            width: 100%;
            padding: 5px;
            background: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border);
        }
        .input-group {
            display: flex;
            gap: 10px;
            align-items: flex-start;
        }
        .input-group input {
            flex: 1;
        }
        .input-group button {
            white-space: nowrap;
        }
        button {
            background: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 8px 16px;
            cursor: pointer;
        }
        button:hover {
            background: var(--vscode-button-hoverBackground);
        }
        datalist {
            display: none;
        }
        .selected-image {
            margin-top: 5px;
            font-size: 0.9em;
            font-style: italic;
        }
    </style>
</head>
<body>
    <form id="blogPostForm">
        <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" id="title" required>
        </div>
        <div class="form-group">
            <label for="date">Date:</label>
            <input type="date" id="date" value="${today}" required>
        </div>
        <div class="form-group">
            <label for="author">Author:</label>
            <input type="text" id="author" list="authors" value="${config.defaultAuthor}">
            <datalist id="authors">
                ${config.authors.map((author: string) => `<option value="${author}">`).join('')}
            </datalist>
        </div>
        <div class="form-group">
            <label for="categories">Categories:</label>
            <input type="text" id="categories" list="categoryList" placeholder="Type or select categories (comma-separated)">
            <datalist id="categoryList">
                ${config.categories.map((category: string) => `<option value="${category}">`).join('')}
            </datalist>
        </div>
        <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" rows="3" required></textarea>
        </div>
        <div class="form-group">
            <label>Featured Image:</label>
            <div class="input-group">
                <input type="text" id="image" placeholder="Path to image" readonly>
                <button type="button" id="selectImage">Browse...</button>
            </div>
            <div id="selectedImage" class="selected-image"></div>
        </div>
        <div class="form-group">
            <label for="imageAlt">Image Alt Text:</label>
            <input type="text" id="imageAlt" placeholder="Alternative text for the image">
        </div>
        <button type="submit">Create Post</button>
    </form>
    <script>
        const vscode = acquireVsCodeApi();
        
        // Handle image selection
        document.getElementById('selectImage').addEventListener('click', () => {
            vscode.postMessage({
                command: 'selectImage'
            });
        });

        // Handle messages from the extension
        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.command) {
                case 'imageSelected':
                    document.getElementById('image').value = message.path;
                    document.getElementById('selectedImage').textContent = 
                        message.path.split('/').pop();
                    break;
            }
        });

        // Handle form submission
        document.getElementById('blogPostForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                title: document.getElementById('title').value,
                date: document.getElementById('date').value,
                author: document.getElementById('author').value,
                categories: document.getElementById('categories').value
                    .split(',')
                    .map(cat => cat.trim())
                    .filter(cat => cat.length > 0)
                    .map(cat => \`"\${cat}"\`)
                    .join(', '),
                description: document.getElementById('description').value,
                image: document.getElementById('image').value,
                imageAlt: document.getElementById('imageAlt').value
            };
            vscode.postMessage({
                command: 'createPost',
                data: data
            });
        });
    </script>
</body>
</html>`;
    }
}