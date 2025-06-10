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

[Watch a demo of this MCP server in action](https://www.epicai.pro/use-ai-to-create-presentations-with-mcp-tsb4j)

[![Split-screen video showing a chat interface generating slides from an article and a presenter explaining the process on camera.](https://github.com/epicweb-dev/slides-mcp/blob/main/other/video.png)](https://www.epicai.pro/use-ai-to-create-presentations-with-mcp-tsb4j)

This could be MUCH cooler if slides.com offered a full featured API. I would
love to be able to show templates for the LLM to choose from and have a way to
upload assets as well.
