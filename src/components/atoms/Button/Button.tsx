import type { ButtonProps } from './ButtonProps';

/**
 * Button component for user actions and choices
 *
 * @param props - Component props
 * @returns Button component
 */
export const Button = (props: ButtonProps) => {
	const {
		children,
		size = 'md',
		variant,
		style = 'default',
		className = '',
		active = false,
		wide = false,
		block = false,
		square = false,
		circle = false,
		loading = false,
		as = 'button',
		...rest
	} = props;
	// Size mapping
	const sizeClasses: Record<string, string> = {
		xs: 'btn-xs',
		sm: 'btn-sm',
		md: 'btn-md',
		lg: 'btn-lg',
		xl: 'btn-xl'
	};

	// Variant mapping
	const variantClasses: Record<string, string> = {
		neutral: 'btn-neutral',
		primary: 'btn-primary',
		secondary: 'btn-secondary',
		accent: 'btn-accent',
		info: 'btn-info',
		success: 'btn-success',
		warning: 'btn-warning',
		error: 'btn-error'
	};

	// Style mapping
	const styleClasses: Record<string, string> = {
		default: '',
		outline: 'btn-outline',
		dash: 'btn-dash',
		soft: 'btn-soft',
		ghost: 'btn-ghost',
		link: 'btn-link'
	};

	// Build button classes
	const buttonClasses = [
		'btn',
		sizeClasses[size],
		variant && variantClasses[variant],
		styleClasses[style],
		active && 'btn-active',
		wide && 'btn-wide',
		block && 'btn-block',
		square && 'btn-square',
		circle && 'btn-circle',
		className
	].filter(Boolean).join(' ');

	// Loading spinner
	const loadingSpinner = loading && (
		<span className="loading loading-spinner"></span>
	);

	// Render as anchor tag
	if (as === 'a') {
		return (
			<a {...(rest as any)} className={buttonClasses} role="button">
				{loadingSpinner}
				{children}
			</a>
		);
	}

	// Render as button tag (default)
	return (
		<button {...(rest as any)} className={buttonClasses}>
			{loadingSpinner}
			{children}
		</button>
	);
};
