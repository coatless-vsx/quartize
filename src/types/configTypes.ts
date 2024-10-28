/**
 * Type definitions for extension configuration.
 * 
 * @module Types
 */

/**
 * Represents extension configuration settings.
 * 
 * @category Types
 * 
 * @interface ExtensionConfig
 */
export interface ExtensionConfig {
    /** 
     * List of predefined authors
     * @default []
     */
    authors: string[];

    /** 
     * List of predefined categories 
     * @default []
     */
    categories: string[];
    
    /** 
     * Default author name
     * @default ""
     */
    defaultAuthor: string;
}