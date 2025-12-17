import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from './Badge';

const meta = {
	title: 'Atoms/Badge',
	component: Badge,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			description: 'Size of the badge',
		},
		variant: {
			control: 'select',
			options: ['neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
			description: 'Color variant of the badge',
		},
		style: {
			control: 'select',
			options: ['default', 'outline', 'dash', 'soft', 'ghost'],
			description: 'Style variant of the badge',
		},
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Badge
export const Default: Story = {
	args: {
		children: 'Badge',
	},
};

// Sizes
export const Sizes: Story = {
	args: {},
	render: () => (
		<div className="flex items-center gap-2">
			<Badge size="xs">Extra Small</Badge>
			<Badge size="sm">Small</Badge>
			<Badge size="md">Medium</Badge>
			<Badge size="lg">Large</Badge>
			<Badge size="xl">Extra Large</Badge>
		</div>
	),
};

// Colors
export const Colors: Story = {
	args: {},
	render: () => (
		<div className="flex flex-wrap gap-2">
			<Badge variant="primary">Primary</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="accent">Accent</Badge>
			<Badge variant="neutral">Neutral</Badge>
			<Badge variant="info">Info</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="error">Error</Badge>
		</div>
	),
};

// Soft Style
export const SoftStyle: Story = {
	args: {},
	render: () => (
		<div className="flex flex-wrap gap-2">
			<Badge style="soft" variant="primary">Primary</Badge>
			<Badge style="soft" variant="secondary">Secondary</Badge>
			<Badge style="soft" variant="accent">Accent</Badge>
			<Badge style="soft" variant="info">Info</Badge>
			<Badge style="soft" variant="success">Success</Badge>
			<Badge style="soft" variant="warning">Warning</Badge>
			<Badge style="soft" variant="error">Error</Badge>
		</div>
	),
};

// Outline Style
export const OutlineStyle: Story = {
	args: {},
	render: () => (
		<div className="flex flex-wrap gap-2">
			<Badge style="outline" variant="primary">Primary</Badge>
			<Badge style="outline" variant="secondary">Secondary</Badge>
			<Badge style="outline" variant="accent">Accent</Badge>
			<Badge style="outline" variant="info">Info</Badge>
			<Badge style="outline" variant="success">Success</Badge>
			<Badge style="outline" variant="warning">Warning</Badge>
			<Badge style="outline" variant="error">Error</Badge>
		</div>
	),
};

// Dash Style
export const DashStyle: Story = {
	args: {},
	render: () => (
		<div className="flex flex-wrap gap-2">
			<Badge style="dash" variant="primary">Primary</Badge>
			<Badge style="dash" variant="secondary">Secondary</Badge>
			<Badge style="dash" variant="accent">Accent</Badge>
			<Badge style="dash" variant="info">Info</Badge>
			<Badge style="dash" variant="success">Success</Badge>
			<Badge style="dash" variant="warning">Warning</Badge>
			<Badge style="dash" variant="error">Error</Badge>
		</div>
	),
};

// Ghost Style
export const GhostStyle: Story = {
	args: {
		children: 'Ghost',
		style: 'ghost',
	},
};

// Empty Badge
export const EmptyBadge: Story = {
	args: {},
	render: () => (
		<div className="flex items-center gap-2">
			<Badge variant="primary" size="lg" />
			<Badge variant="primary" size="md" />
			<Badge variant="primary" size="sm" />
			<Badge variant="primary" size="xs" />
		</div>
	),
};

// Badge with Icon
export const WithIcon: Story = {
	args: {},
	render: () => (
		<div className="flex flex-wrap gap-2">
			<Badge variant="info">
				<svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
						<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></circle>
						<path d="m12,17v-5.5c0-.276-.224-.5-.5-.5h-1.5" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></path>
						<circle cx="12" cy="7.25" r="1.25" fill="currentColor" strokeWidth="2"></circle>
					</g>
				</svg>
				{' '}Info
			</Badge>
			<Badge variant="success">
				<svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
						<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></circle>
						<polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></polyline>
					</g>
				</svg>
				{' '}Success
			</Badge>
			<Badge variant="warning">
				<svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
					<g fill="currentColor">
						<path d="M7.638,3.495L2.213,12.891c-.605,1.048,.151,2.359,1.362,2.359H14.425c1.211,0,1.967-1.31,1.362-2.359L10.362,3.495c-.605-1.048-2.119-1.048-2.724,0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
						<line x1="9" y1="6.5" x2="9" y2="10" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></line>
						<path d="M9,13.569c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" fill="currentColor" stroke="none"></path>
					</g>
				</svg>
				{' '}Warning
			</Badge>
			<Badge variant="error">
				<svg className="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<g fill="currentColor">
						<rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" strokeWidth="0"></rect>
						<path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" strokeWidth="0" fill="currentColor"></path>
					</g>
				</svg>
				{' '}Error
			</Badge>
		</div>
	),
};

// Badge in Text
export const InText: Story = {
	args: {},
	render: () => (
		<div className="grid gap-2">
			<span className="text-xl font-semibold">
				Heading 1 <Badge size="xl">Badge</Badge>
			</span>
			<span className="text-lg font-semibold">
				Heading 2 <Badge size="lg">Badge</Badge>
			</span>
			<span className="text-base font-semibold">
				Heading 3 <Badge size="md">Badge</Badge>
			</span>
			<span className="text-sm font-semibold">
				Heading 4 <Badge size="sm">Badge</Badge>
			</span>
			<span className="text-xs font-semibold">
				Heading 5 <Badge size="xs">Badge</Badge>
			</span>
			<p className="text-xs">
				Paragraph <Badge size="xs">Badge</Badge>
			</p>
		</div>
	),
};

// Badge in Button
export const InButton: Story = {
	args: {},
	render: () => (
		<div className="flex gap-2">
			<button className="btn">
				Inbox <Badge size="sm">+99</Badge>
			</button>
			<button className="btn">
				Inbox <Badge size="sm" variant="secondary">+99</Badge>
			</button>
		</div>
	),
};