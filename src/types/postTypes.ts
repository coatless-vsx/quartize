
/**
 * Type definitions for blog post metadata.
 * 
 * @module Types
 */

/**
 * Represents metadata for a blog post.
 * 
 * @category Types
 * 
 * @interface PostMetadata
 */
export interface PostMetadata {
    /** 
     * Post title
     * @remarks Must be non-empty
     */
    title: string;

    /**
     * Post description
     * @optional
     */
    description: string;

    /** 
     * Post author 
     * @default "Anonymous"
     */
    author: string;

    /** 
     * Publication date in YYYY-MM-DD format 
     * @format date
     */
    date: string;

    /** 
     * Comma-separated list of categories 
     * @pattern ^[a-zA-Z]+(,[a-zA-Z]+)*$
     */
    categories: string;

    /** 
     * Path to featured image 
     * @optional
     */
    image: string;

    /** 
     * Alt text for featured image 
     * @optional
     */
    imageAlt: string;
}