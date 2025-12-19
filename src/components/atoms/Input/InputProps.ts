import type { InputHTMLAttributes } from 'react';

/**
 * Input component based on DaisyUI
 *
 * @component
 * @example
 * // Basic input
 * <Input type="text" placeholder="Type here" />
 *
 * @example
 * // Input with color
 * <Input type="text" variant="primary" placeholder="Primary input" />
 *
 * @example
 * // Input with size
 * <Input type="email" size="lg" placeholder="Large input" />
 *
 * @example
 * // Input with ghost style
 * <Input type="text" inputStyle="ghost" placeholder="Ghost input" />
 *
 * @example
 * // Disabled input
 * <Input type="text" disabled placeholder="Disabled" />
 *
 * @example
 * // Input with bordered style
 * <Input type="text" bordered placeholder="Bordered input" />
 */

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type InputVariant = 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
export type InputStyle = 'default' | 'ghost';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	/** Predefined size of the input */
	size?: InputSize;
	/** Color variant */
	variant?: InputVariant;
	/** Style variant (use inputStyle to avoid conflict with HTML style attribute) */
	inputStyle?: InputStyle;
	/** Additional CSS classes */
	className?: string;
	/** Adds border to the input */
	bordered?: boolean;
}
