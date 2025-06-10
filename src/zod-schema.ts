import { z } from 'zod'

const textBlockSchema = z.object({
	type: z.literal('text'),
	value: z.string(),
	format: z.enum(['h1', 'h2', 'h3', 'p', 'pre']).optional(),
	align: z.enum(['left', 'center', 'right', 'justify']).optional(),
	padding: z.number().int().optional(),
	color: z.string().optional(),
	'font-size': z.string().optional(),
})

const imageBlockSchema = z.object({
	type: z.literal('image'),
	value: z.string(),
})

const iframeBlockSchema = z.object({
	type: z.literal('iframe'),
	value: z.string(),
})

const codeBlockSchema = z.object({
	type: z.literal('code'),
	value: z.string(),
	language: z.string().optional(),
	'word-wrap': z.boolean().optional(),
	'line-numbers': z.union([z.boolean(), z.string()]).optional(),
	theme: z
		.enum([
			'monokai',
			'a11y-dark',
			'a11y-light',
			'ascetic',
			'darcula',
			'far',
			'github-gist',
			'ir-black',
			'obsidian',
			'seti',
			'solarized-dark',
			'solarized-light',
			'sunburst',
			'tomorrow',
			'xcode',
			'zenburn',
		])
		.optional(),
})

const tableBlockSchema = z.object({
	type: z.literal('table'),
	data: z.array(z.array(z.any())).optional(),
	html: z.string().optional(),
	padding: z.number().int().optional(),
	'text-color': z.string().optional(),
	'border-width': z.number().int().optional(),
	'border-color': z.string().optional(),
})

const baseBlockSchema = z.object({
	x: z.number().int().optional(),
	y: z.number().int().optional(),
	width: z.number().int().optional(),
	height: z.number().int().optional(),
	class: z.string().optional(),
	data: z.record(z.any()).optional(),
	'animation-type': z
		.enum([
			'fade-in',
			'fade-out',
			'slide-up',
			'slide-down',
			'slide-right',
			'slide-left',
			'scale-up',
			'scale-down',
		])
		.optional(),
	'animation-trigger': z.enum(['auto', 'click', 'hover']).optional(),
	'animation-duration': z.number().optional(),
	'animation-delay': z.number().optional(),
})

const blockSchema = z.intersection(
	baseBlockSchema,
	z.union([
		textBlockSchema,
		imageBlockSchema,
		iframeBlockSchema,
		codeBlockSchema,
		tableBlockSchema,
	]),
)

const slideSchema = z.object({
	id: z.string().optional(),
	'background-color': z.string().optional(),
	'background-image': z.string().optional(),
	'background-size': z.enum(['cover', 'contain']).optional(),
	notes: z.string().optional(),
	html: z.string().optional(),
	markdown: z.string().optional(),
	blocks: z.array(blockSchema).optional(),
})

const slidesSchema: z.ZodType<any> = z.lazy(() =>
	z.array(
		z.union([
			slideSchema,
			z.array(slideSchema), // vertical stack
		]),
	),
)

export const deckSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	width: z.number().int().optional(),
	height: z.number().int().optional(),
	visibility: z.enum(['all', 'self', 'team']).optional(),
	'auto-slide-interval': z.number().int().optional(),
	'slide-number': z.boolean().optional(),
	loop: z.boolean().optional(),
	css: z.string().optional(),
	'theme-id': z.string().optional(),
	'theme-color': z.enum(['white-blue', 'black-blue']).optional(),
	'theme-font': z
		.enum([
			'montserrat',
			'asul',
			'helvetica',
			'josefine',
			'league',
			'merriweather',
			'news',
			'opensans',
			'overpass',
			'palatino',
			'quicksand',
			'sketch',
		])
		.optional(),
	transition: z.enum(['slide', 'none', 'fade', 'concave', 'convex']).optional(),
	slides: slidesSchema,
})
