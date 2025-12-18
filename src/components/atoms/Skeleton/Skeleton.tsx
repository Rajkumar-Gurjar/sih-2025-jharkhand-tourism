import type { SkeletonProps } from './SkeletonProps';

/**
 * Skeleton component for showing loading state
 *
 * @param props - Component props
 * @returns Skeleton component
 */
export const Skeleton = ({
	variant = 'default',
	shape = 'rectangle',
	width,
	height,
	className = '',
	children,
	...rest
}: SkeletonProps) => {
	// Shape mapping
	const shapeClasses: Record<string, string> = {
		rectangle: '',
		circle: 'rounded-full',
		custom: ''
	};

	// Build skeleton classes
	const skeletonClasses = [
		'skeleton',
		variant === 'text' && 'skeleton-text',
		shape !== 'custom' && shapeClasses[shape],
		width,
		height,
		className
	].filter(Boolean).join(' ');

	// Render as span for text variant
	if (variant === 'text') {
		return (
			<span className={skeletonClasses} {...rest}>
				{children}
			</span>
		);
	}

	// Render as div for default variant
	return <div className={skeletonClasses} {...rest} />;
};
