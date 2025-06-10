import { invariant } from '@epic-web/invariant'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { McpAgent } from 'agents/mcp'
import {
	compressToEncodedURIComponent,
	decompressFromEncodedURIComponent,
} from 'lz-string'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { spec } from './spec.md.js'
import { deckSchema } from './zod-schema.js'

// just used to generate the URL for the create-presentation page (so we don't have to hardcode it)
let localUrl: URL | null = null

// Define our MCP agent with tools
export class SlidesMCP extends McpAgent {
	server = new McpServer(
		{
			name: 'SlidesMCP',
			version: '1.0.0',
		},
		{
			instructions: `
You are an expert presentation designer. Use this tool to manage presentations with slides.com.

Typically when the user asks you to create a presentation, you will first want to get the spec document to understand the deck definition. Then you can use the create_slides_presentation tool to create the presentation.
		`.trim(),
		},
	)

	async init() {
		this.server.tool(
			'get_slides_specification',
			'Retrieve the spec document and JSON schema for creating slides with slides.com',
			async () => {
				return {
					content: [
						{ type: 'text', text: spec },
						{ type: 'text', text: JSON.stringify(zodToJsonSchema(deckSchema)) },
					],
				}
			},
		)

		this.server.tool(
			'create_slides_presentation',
			`
Create a new presentation with slides.com providing the deck definition (see the spec document and schema from get_slides_specification before calling this tool). If the deck is valid, a URL will be returned which can be used to actually perform the slides creation for the user.

- Take special care to make certain the colors used are accessible (dark text for light backgrounds, light text for dark backgrounds, shadows where appropriate, etc.).
- Create an attractive theme and color palette and be consistent with it throughout the presentation.
- Take advantage of vertical stacks for subtopics.
- Prefer using \`markdown\` over \`blocks\` or \`html\`.
- Take advantage of speaker notes. Limit the amount of text on a slide.
			`.trim(),
			{
				deck: z
					.object({})
					.passthrough()
					.describe(
						'The deck definition that matches the spec document. This will be validated and any errors will be returned.',
					),
			},
			async ({ deck }) => {
				invariant(
					localUrl,
					`localUrl is not set. This is my problem and you can't do anything about it.`,
				)

				const parsedDeck = deckSchema.parse(deck)

				const encodedDeck = compressToEncodedURIComponent(
					JSON.stringify(parsedDeck),
				)

				const url = new URL('/create-presentation', localUrl)
				url.searchParams.set('deck', encodedDeck)
				return {
					content: [
						{
							type: 'text',
							text: `
Upon opening the URL below, the user will be presented with a form that will allow them to create a new presentation with the deck definition you have provided. Submitting this form will open slides.com and if the user is happy, they can save the presentation to their account.
							`,
						},
						{
							type: 'text',
							text: url.toString(),
						},
					] as const,
				}
			},
		)
	}
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		localUrl = new URL(request.url)
		const url = new URL(request.url)

		if (url.pathname === '/create-presentation' && request.method === 'GET') {
			const deck = url.searchParams.get('deck')
			if (!deck) {
				return new Response('No deck provided', { status: 400 })
			}

			const decodedDeck = decompressFromEncodedURIComponent(deck)
			const html = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Creating Slides.com Presentation</title>
	<style>
		body { font-family: system-ui; max-width: 600px; margin: 2rem auto; text-align: center; }
		textarea[name="definition"] { display: none; }
		button { padding: 1rem 2rem; font-size: 1.1rem; }
	</style>
</head>
<body>
	<h1 id="title">Create Slides.com Presentation</h1>
	<form id="deck-form" action="https://slides.com/decks/define" method="POST" target="_blank">
		<textarea name="definition">${decodedDeck}</textarea>
		<button id="submit-button" type="submit">Create New Deck</button>
	</form>
	<script>
		window.onload = () => {
			const form = document.getElementById('deck-form')
			if (form) {
				form.addEventListener('submit', (e) => {
					document.getElementById('title')?.textContent = 'Creating Slides.com Presentation...'
					document.getElementById('submit-button')?.textContent = 'Creating...'
					document.getElementById('submit-button')?.disabled = true
				})
				form.submit()
			}
		}
	</script>
</body>
</html>
				`.trim()
			return new Response(html, {
				headers: {
					'Content-Type': 'text/html',
				},
			})
		}

		if (url.pathname === '/sse' || url.pathname === '/sse/message') {
			return SlidesMCP.serveSSE('/sse', {
				binding: 'SlidesMCPInstance',
			}).fetch(request, env, ctx)
		}

		if (url.pathname === '/mcp') {
			return SlidesMCP.serve('/mcp', {
				binding: 'SlidesMCPInstance',
			}).fetch(request, env, ctx)
		}

		return new Response('Not found', { status: 404 })
	},
}
