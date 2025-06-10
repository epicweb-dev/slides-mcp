# slides-mcp

This uses the [Slides Define API](https://slides.com/developers#define-api) to
allow you to create slides.com presentations from an LLM prompt.

## Usage

Configure your MCP client to use this MCP server.

```json
{
	"slides": {
		"url": "https://slides-mcp.kentcdodds.workers.dev/mcp"
	}
}
```

This also supports `/sse` so you can use it in old clients.

This could be MUCH cooler if slides.com offered a full featured API. I would
love to be able to show templates for the LLM to choose from and have a way to
upload assets as well.
