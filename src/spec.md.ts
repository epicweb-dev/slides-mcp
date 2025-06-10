export const spec = `
# Slides.com Define API

Below is the specification for the Slides.com Define API. You will be
responsible for creating a JSON object that represents a deck based on the
user's request.

## Deck JSON Structure

A deck is described by a JSON object with the following properties:

| Property              | Type    | Required | Description                                                     |
| --------------------- | ------- | -------- | --------------------------------------------------------------- |
| \`title\`               | string  | Yes      | The title of the presentation.                                  |
| \`description\`         | string  | No       | Short description of the presentation.                          |
| \`width\`               | integer | No       | Presentation width in pixels (default: 960).                    |
| \`height\`              | integer | No       | Presentation height in pixels (default: 700).                   |
| \`visibility\`          | string  | No       | Who can see the deck: \`all\`, \`self\`, \`team\`.                    |
| \`auto-slide-interval\` | integer | No       | Auto-slide interval in ms (default: 0 = no autosliding).        |
| \`slide-number\`        | boolean | No       | Show slide numbers (default: false).                            |
| \`loop\`                | boolean | No       | Loop from last to first slide (default: false).                 |
| \`css\`                 | string  | No       | Additional CSS (Pro/Team only).                                 |
| \`theme-id\`            | string  | No       | ID of a custom theme (Team only).                               |
| \`theme-color\`         | string  | No       | Presentation color: \`white-blue\`, \`black-blue\`.                 |
| \`theme-font\`          | string  | No       | Presentation font (see below for options).                      |
| \`transition\`          | string  | No       | Slide transition: \`slide\`, \`none\`, \`fade\`, \`concave\`, \`convex\`. |
| \`slides\`              | array   | Yes      | Array of slide objects or nested arrays for vertical stacks.    |

### Font Options

- \`montserrat\` (default), \`asul\`, \`helvetica\`, \`josefine\`, \`league\`,
  \`merriweather\`, \`news\`, \`opensans\`, \`overpass\`, \`palatino\`, \`quicksand\`,
  \`sketch\`

### Theme Color Options

- \`white-blue\` (default), \`black-blue\`

### Transition Options

- \`slide\` (default), \`none\`, \`fade\`, \`concave\`, \`convex\`

### Visibility Options

- \`all\` (public), \`self\` (private, paid), \`team\` (team only, team account)

---

## Slides Array

Each entry in the \`slides\` array can be:

- A slide object (see below)
- A nested array of slide objects (for vertical stacks)

### Slide Object Properties

| Property           | Type   | Required | Description                                                          |
| ------------------ | ------ | -------- | -------------------------------------------------------------------- |
| \`id\`               | string | No       | Unique identifier for the slide (alphanumeric, dashes, underscores). |
| \`background-color\` | string | No       | CSS color value for background.                                      |
| \`background-image\` | string | No       | URL to background image (JPG, PNG, GIF, SVG).                        |
| \`background-size\`  | string | No       | \`cover\` (default), \`contain\`.                                        |
| \`notes\`            | string | No       | Speaker notes (max 10,000 chars).                                    |
| \`html\`             | string | No       | Custom HTML content for the slide.                                   |
| \`markdown\`         | string | No       | Markdown content for the slide.                                      |
| \`blocks\`           | array  | No       | Array of content blocks (see below).                                 |

---

## Content Blocks

Blocks are used for more granular, editor-friendly content. Each block is an
object with a \`type\` and additional properties depending on the type.

### Common Block Properties

| Property             | Type    | Required | Description                                                                                            |
| -------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------ |
| \`type\`               | string  | Yes      | \`text\`, \`image\`, \`iframe\`, \`code\`, \`table\`                                                             |
| \`x\`                  | integer | No       | Horizontal position in px.                                                                             |
| \`y\`                  | integer | No       | Vertical position in px.                                                                               |
| \`width\`              | integer | No       | Width in px.                                                                                           |
| \`height\`             | integer | No       | Height in px.                                                                                          |
| \`class\`              | string  | No       | CSS class name.                                                                                        |
| \`data\`               | object  | No       | Key-value pairs for data attributes.                                                                   |
| \`animation-type\`     | string  | No       | \`fade-in\`, \`fade-out\`, \`slide-up\`, \`slide-down\`, \`slide-right\`, \`slide-left\`, \`scale-up\`, \`scale-down\` |
| \`animation-trigger\`  | string  | No       | \`auto\`, \`click\`, \`hover\`                                                                               |
| \`animation-duration\` | number  | No       | Animation duration in seconds.                                                                         |
| \`animation-delay\`    | number  | No       | Animation delay in seconds.                                                                            |

#### Block Types

##### Text Block

| Property    | Type    | Required | Description                          |
| ----------- | ------- | -------- | ------------------------------------ |
| \`value\`     | string  | Yes      | Text content.                        |
| \`format\`    | string  | No       | \`h1\`, \`h2\`, \`h3\`, \`p\`, \`pre\`         |
| \`align\`     | string  | No       | \`left\`, \`center\`, \`right\`, \`justify\` |
| \`padding\`   | integer | No       | Padding in px.                       |
| \`color\`     | string  | No       | Text color (CSS format).             |
| \`font-size\` | string  | No       | Font size as percent, e.g., \`150%\`.  |

##### Image Block

| Property | Type   | Required | Description                    |
| -------- | ------ | -------- | ------------------------------ |
| \`value\`  | string | Yes      | Image URL (JPG, PNG, GIF, SVG) |

##### Iframe Block

| Property | Type   | Required | Description        |
| -------- | ------ | -------- | ------------------ |
| \`value\`  | string | Yes      | HTTPS URL to embed |

##### Code Block

| Property       | Type           | Required | Description                              |
| -------------- | -------------- | -------- | ---------------------------------------- |
| \`value\`        | string         | Yes      | Code to highlight                        |
| \`language\`     | string         | No       | Language for syntax highlighting         |
| \`word-wrap\`    | boolean        | No       | Wrap code lines (default: false)         |
| \`line-numbers\` | boolean/string | No       | true/false or string for highlight lines |
| \`theme\`        | string         | No       | Code theme (see below for options)       |

###### Code Theme Options

- \`monokai\` (default), \`a11y-dark\`, \`a11y-light\`, \`ascetic\`, \`darcula\`, \`far\`,
  \`github-gist\`, \`ir-black\`, \`obsidian\`, \`seti\`, \`solarized-dark\`,
  \`solarized-light\`, \`sunburst\`, \`tomorrow\`, \`xcode\`, \`zenburn\`

##### Table Block

| Property       | Type    | Required | Description                               |
| -------------- | ------- | -------- | ----------------------------------------- |
| \`data\`         | array   | No       | 2D array of table data                    |
| \`html\`         | string  | No       | Table HTML (takes precedence over \`data\`) |
| \`padding\`      | integer | No       | Cell padding in px                        |
| \`text-color\`   | string  | No       | Text color (CSS format)                   |
| \`border-width\` | integer | No       | Border width in px                        |
| \`border-color\` | string  | No       | Border color (CSS format)                 |

---

## Examples

### Minimal Deck

\`\`\`json
{
	"title": "My Deck",
	"slides": [{ "html": "<h1>Slide 1</h1>" }, { "html": "<h1>Slide 2</h1>" }]
}
\`\`\`

### Vertical Stack Example

\`\`\`json
{
	"title": "My Deck",
	"slides": [
		{ "markdown": "# Slide 1" },
		[
			{ "markdown": "# Vertical Slide 2.1" },
			{ "markdown": "# Vertical Slide 2.2" }
		],
		{ "markdown": "# Slide 3" }
	]
}
\`\`\`

### Full Feature Example

\`\`\`json
{
	"title": "My Deck",
	"description": "Description of My Deck.",
	"width": 1024,
	"height": 576,
	"auto-slide-interval": 0,
	"slide-number": false,
	"loop": false,
	"theme-color": "white-blue",
	"theme-font": "overpass",
	"transition": "slide",
	"slides": [
		{
			"id": "an-optional-slide-id",
			"background-color": "#cccccc",
			"background-image": "https://static.slid.es/images/screenshots/v1/slides-homepage-1440x900.png",
			"background-size": "cover",
			"notes": "My speaker notes",
			"blocks": [
				{ "type": "text", "value": "Hello world!", "format": "h2" },
				{
					"type": "image",
					"value": "https://static.slid.es/images/screenshots/v1/slides-homepage-1440x900.png"
				},
				{
					"type": "iframe",
					"value": "https://slides.com/news/make-better-presentations/embed"
				},
				{
					"type": "table",
					"data": [
						["A", "B", "C"],
						[1, 2, 3]
					]
				}
			]
		},
		{
			"background-image": "https://static.slid.es/images/screenshots/v1/slides-homepage-1440x900.png"
		},
		{ "html": "<h1>HTML Slide</h1>" },
		{
			"markdown": "Markdown slide! <https://daringfireball.net/projects/markdown/syntax>"
		}
	]
}
\`\`\`
`.trim()
