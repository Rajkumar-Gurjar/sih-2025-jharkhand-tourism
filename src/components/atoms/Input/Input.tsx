import type { InputProps } from './InputProps';

/**
 * Input component for form text entry
 *
 * @param props - Component props
 * @returns Input component
 */
export const Input = (props: InputProps) => {
	const {
		size = 'md',
		variant,
		style = 'default',
		className = '',
		bordered = false,
		...rest
	} = props;

	// Size mapping
	const sizeClasses: Record<string, string> = {
		xs: 'input-xs',
		sm: 'input-sm',
		md: 'input-md',
		lg: 'input-lg',
		xl: 'input-xl'
	};

	// Variant mapping
	const variantClasses: Record<string, string> = {
		neutral: 'input-neutral',
		primary: 'input-primary',
		secondary: 'input-secondary',
		accent: 'input-accent',
		info: 'input-info',
		success: 'input-success',
		warning: 'input-warning',
		error: 'input-error'
	};

	// Style mapping
	const styleClasses: Record<string, string> = {
		default: '',
		ghost: 'input-ghost'
	};

	// Build input classes
	const inputClasses = [
		'input',
		sizeClasses[size],
		variant && variantClasses[variant],
		styleClasses[style],
		bordered && 'input-bordered',
		className
	].filter(Boolean).join(' ');

	// Render input element
	return (
		<input {...rest} className={inputClasses} />
	);
};
