import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
	title: 'Atoms/Input',
	component: Input,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			description: 'Size of the input',
		},
		variant: {
			control: 'select',
			options: ['neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
			description: 'Color variant of the input',
		},
		inputStyle: {
			control: 'select',
			options: ['default', 'ghost'],
			description: 'Style variant of the input',
		},
		bordered: {
			control: 'boolean',
			description: 'Adds border to the input',
		},
		disabled: {
			control: 'boolean',
			description: 'Disables the input',
		},
		type: {
			control: 'select',
			options: ['text', 'email', 'password', 'number', 'date', 'tel', 'url', 'search', 'time'],
			description: 'HTML input type',
		},
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Input
export const Default: Story = {
	args: {
		type: 'text',
		placeholder: 'Type here',
	},
};

// Bordered Input
export const Bordered: Story = {
	args: {
		type: 'text',
		placeholder: 'Type here',
		bordered: true,
	},
};

// Input Sizes
export const Sizes: Story = {
	args: {},
	render: () => (
		<div className="flex flex-col items-center gap-2 w-80">
			<Input type="text" size="xs" placeholder="Extra Small" bordered />
			<Input type="text" size="sm" placeholder="Small" bordered />
			<Input type="text" placeholder="Medium (default)" bordered />
			<Input type="text" size="lg" placeholder="Large" bordered />
			<Input type="text" size="xl" placeholder="Extra Large" bordered />
		</div>
	),
};

// Responsive Input
export const Responsive: Story = {
	args: {
		type: 'text',
		placeholder: 'Responsive',
		bordered: true,
		className: 'input-xs sm:input-sm md:input-md lg:input-lg xl:input-xl w-full max-w-xs'
	},
};

// Input Colors
export const Colors: Story = {
	args: {},
	render: () => (
		<div className="flex flex-col gap-2 w-80">
			<Input type="text" variant="neutral" placeholder="Neutral" bordered />
			<Input type="text" variant="primary" placeholder="Primary" bordered />
			<Input type="text" variant="secondary" placeholder="Secondary" bordered />
			<Input type="text" variant="accent" placeholder="Accent" bordered />
			<Input type="text" variant="info" placeholder="Info" bordered />
			<Input type="text" variant="success" placeholder="Success" bordered />
			<Input type="text" variant="warning" placeholder="Warning" bordered />
			<Input type="text" variant="error" placeholder="Error" bordered />
		</div>
	),
};

// Ghost Input
export const Ghost: Story = {
	args: {
		type: 'text',
		inputStyle: 'ghost',
		placeholder: 'Ghost input',
	},
};

// Disabled Input
export const Disabled: Story = {
	args: {
		type: 'text',
		placeholder: 'You cannot type here',
		disabled: true,
		bordered: true,
	},
};

// Input Types
export const InputTypes: Story = {
	args: {},
	render: () => (
		<div className="flex flex-col gap-2 w-80">
			<Input type="text" placeholder="Text" bordered />
			<Input type="email" placeholder="Email" bordered />
			<Input type="password" placeholder="Password" bordered />
			<Input type="number" placeholder="Number" bordered />
			<Input type="date" bordered />
			<Input type="time" bordered />
			<Input type="tel" placeholder="Telephone" bordered />
			<Input type="url" placeholder="URL" bordered />
			<Input type="search" placeholder="Search" bordered />
		</div>
	),
};

// Input with Form Labels
export const WithFormLabels: Story = {
	args: {},
	render: () => (
		<div className="flex flex-col gap-4 w-80">
			<div className="form-control w-full">
				<label className="label">
					<span className="label-text">What is your name?</span>
				</label>
				<Input type="text" placeholder="Type here" bordered />
			</div>

			<div className="form-control w-full">
				<label className="label">
					<span className="label-text">Email address</span>
				</label>
				<Input type="email" placeholder="your@email.com" variant="primary" bordered />
				<label className="label">
					<span className="label-text-alt">We'll never share your email</span>
				</label>
			</div>

			<div className="form-control w-full">
				<label className="label">
					<span className="label-text">Username</span>
					<span className="label-text-alt">Required</span>
				</label>
				<Input type="text" placeholder="Enter username" variant="success" bordered />
			</div>

			<div className="form-control w-full">
				<label className="label">
					<span className="label-text">Password</span>
				</label>
				<Input type="password" placeholder="Enter password" variant="error" bordered />
				<label className="label">
					<span className="label-text-alt text-error">Password is too weak</span>
				</label>
			</div>
		</div>
	),
};

// Input States
export const States: Story = {
	args: {},
	render: () => (
		<div className="flex flex-col gap-2 w-80">
			<Input type="text" placeholder="Normal" bordered />
			<Input type="text" placeholder="Success" variant="success" bordered />
			<Input type="text" placeholder="Warning" variant="warning" bordered />
			<Input type="text" placeholder="Error" variant="error" bordered />
			<Input type="text" placeholder="Disabled" disabled bordered />
		</div>
	),
};
