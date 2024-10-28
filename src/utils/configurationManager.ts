/**
 * @fileoverview Manages access to extension configuration settings.
 */

import * as vscode from 'vscode';
import { ExtensionConfig } from '../types/configTypes';

/**
 * Manages access to extension configuration settings.
 * Provides type-safe access to extension settings.
 */
export class ConfigurationManager {
    /**
     * Loads current extension configuration settings.
     * 
     * @returns Promise resolving to current configuration
     */
    public async loadConfig(): Promise<ExtensionConfig> {
        const config = vscode.workspace.getConfiguration('quartize');
        return {
            authors: config.get<string[]>('authors', []),
            categories: config.get<string[]>('categories', []),
            defaultAuthor: config.get<string>('defaultAuthor', '')
        };
    }
}
