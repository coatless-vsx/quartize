/**
 * @fileoverview Provides workspace validation functionality.
 */
import * as vscode from 'vscode';

/**
 * Validates workspace conditions for post creation.
 */
export class WorkspaceValidator {
    /**
     * Ensures a valid workspace exists.
     * 
     * @returns Promise resolving to workspace folder
     * @throws Error if no workspace is open
     */
    public async validateWorkspace(): Promise<vscode.WorkspaceFolder> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            throw new Error('Please open a workspace first');
        }
        return workspaceFolders[0];
    }
}
