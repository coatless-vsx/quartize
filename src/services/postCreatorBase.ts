/**
 * Provides base functionality for blog post creation.
 * 
 * @module Services
 */

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { PostMetadata } from '../types/postTypes';
import { WorkspaceValidator } from '../utils/workspaceValidator';

/**
 * Abstract base class providing common functionality for post creation.
 * 
 * @abstract
 * @category Services
 * 
 * @remarks
 * Implements shared methods for file operations and content generation.
 * This class should be extended by specific post creator implementations.
 */
export abstract class PostCreatorBase {
    
    /**
     * Creates the post file and opens it in the editor.
     * 
     * @param metadata - Post metadata
     * @param content - Generated post content
     * 
     * @returns Promise that resolves when the post is created and opened
     * 
     * @throws {@link Error}
     * Throws if workspace validation fails or file operations fail
     * 
     * @protected
     */
    protected async writeAndOpenPost(metadata: PostMetadata, content: string): Promise<void> {
        const validator = new WorkspaceValidator();
        const workspaceFolder = await validator.validateWorkspace();

        const slug = this.generateSlug(metadata.title);
        const postsDir = path.join(workspaceFolder.uri.fsPath, 'posts', slug);
        
        fs.mkdirSync(postsDir, { recursive: true });
        const filePath = path.join(postsDir, 'index.qmd');
        
        fs.writeFileSync(filePath, content);
        
        const document = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(document);
    }

    /**
     * Generates post content with YAML frontmatter.
     * 
     * @param metadata - Post metadata
     * @returns Formatted post content string with frontmatter
     * 
     * @protected
     */
    protected generatePostContent(metadata: PostMetadata): string {
        return `---
title: "${metadata.title}"
description: "${metadata.description}"
author: "${metadata.author}"
date: "${metadata.date}"
categories: [${metadata.categories}]
image: "${metadata.image}"
image-alt: "${metadata.imageAlt}"
---

## Introduction

Write your blog post content here.

## Main Content

Your main content goes here.

## Conclusion

Wrap up your post here.
`;
    }

    /**
     * Generates URL-friendly slug from post title.
     * 
     * @param title - Post title
     * @returns URL-friendly slug string
     * 
     * @example
     * ```typescript
     * const slug = generateSlug("My Blog Post");
     * console.log(slug); // "my-blog-post"
     * ```
     * 
     * @protected
     */
    protected generateSlug(title: string): string {
        return title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
}