# quartize

Quartize is a Visual Studio Code extension that streamlines the process of creating blog posts for Quarto-based websites. 
It provides an intuitive interface for generating new blog posts with proper frontmatter, directory structure, and basic templates.

- 🎨 Two ways to create posts:
  - Quick create through Command Palette
  - Web View interface
- 🏷️ Category and author management
- 📸 Featured image support
- 🎯 SEO-friendly slug generation
- 🎨 Integrated with VS Code themes

## Installation

- Open VS Code.
- Go to the Extensions view (`Ctrl`+`Shift`+`X` or `Cmd`+`Shift`+`X`)
- Search for "Quartize"
- Click Install

### Requirements

- Visual Studio Code 1.94.0 or higher
- A Quarto blog project
- Quarto CLI installed

## Usage

The extension provides two main features: quick create and viewer interface. 
You can use the quick create feature to create a new post with minimal input, or use the viewer interface to fill out a form with more detailed information.

### Quick Create (Command Palette)

1. Press `Ctrl`+`Shift`+`P` (Windows/Linux) or `Cmd`+`Shift`+`P` (macOS)
1. Search for "Quartize: New Blog Post (Palette)"
1. Follow the prompts to enter:
  - Post title
  - Description
  - Categories

Voilà! Your new post is created with the proper frontmatter and directory structure.

### Viewer Interface

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
1. Search for "Quartize: New Blog Post (Open Plugin)"
1. Fill out the form with:
   - Title
   - Date
   - Author
   - Categories
   - Description
   - Featured image
   - Image alt text
1. Click "Create Post"

## Configuration

You can configure the extension by setting the following options in your `settings.json` file:

| Setting | Type | Description |
|---------|------|-------------|
| `quartize.authors` | array | List of predefined authors |
| `quartize.categories` | array | List of predefined categories |
| `quartize.defaultAuthor` | string | Default author for new posts |

> [!TIP]
> You can access the `settings.json` file by pressing `Ctrl+,` (Windows/Linux) or `Cmd+,` (macOS) to open the Settings view, 
> then clicking the "Edit in settings.json" link.
> 
> Or you can open the file directly by going to `File > Preferences > Settings` (Windows/Linux) or `Code > Preferences > Settings` (macOS) and clicking the "Open Settings (JSON)" button.

For example, to set up authors, categories, and a default author, add the following to your `settings.json` file: 

```json
{
  "quartize.authors": [
    "John Doe",
    "Jane Smith"
  ],
  "quartize.categories": [
    "tech",
    "programming",
    "data-science"
  ],
  "quartize.defaultAuthor": "John Doe"
}
```

## License

Copyright (c) 2024 HJJB, LLC. All rights reserved.

This software is provided under a custom license that allows usage but prohibits modification.
See the LICENSE file for full terms and conditions.
