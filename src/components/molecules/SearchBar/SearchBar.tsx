import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import type { SearchBarProps } from './SearchBarProps';

/**
 * SearchBar component for search interfaces with optional filter button
 *
 * @param props - Component props
 * @returns SearchBar component
 */
export const SearchBar = ({
	value,
	defaultValue = '',
	placeholder = 'Search...',
	onSearch,
	onChange,
	onFilterClick,
	showFilterButton = false,
	size = 'md',
	className = ''
}: SearchBarProps) => {
	// Internal state for uncontrolled mode
	const [internalValue, setInternalValue] = useState(defaultValue);

	// Use controlled or uncontrolled value
	const searchValue = value !== undefined ? value : internalValue;

	// Size mapping for input and buttons
	const sizeClasses: Record<string, { input: string; button: string; icon: 'sm' | 'md' | 'lg' }> = {
		sm: { input: 'input-sm', button: 'btn-sm', icon: 'sm' },
		md: { input: 'input-md', button: 'btn-md', icon: 'md' },
		lg: { input: 'input-lg', button: 'btn-lg', icon: 'lg' }
	};

	// Handle input change
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		if (value === undefined) {
			setInternalValue(newValue);
		}
		onChange?.(newValue);
	};

	// Handle form submit
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSearch?.(searchValue);
	};

	// Handle Enter key press
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSearch?.(searchValue);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={`join w-full ${className}`.trim()}>
			{/* Search input with icon */}
			<div className="relative flex-1 join-item">
				<Icon
					name="search"
					size={sizeClasses[size].icon}
					className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
				/>
				<input
					type="search"
					value={searchValue}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					className={`input input-bordered w-full pl-10 join-item ${sizeClasses[size].input}`}
					aria-label="Search"
				/>
			</div>

			{/* Filter button (optional) */}
			{showFilterButton && (
				<Button
					type="button"
					style="ghost"
					size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
					className="join-item border border-base-300"
					onClick={onFilterClick}
					aria-label="Open filters"
				>
					<Icon name="filter_list" size={sizeClasses[size].icon} />
					<span className="hidden sm:inline">Filters</span>
				</Button>
			)}

			{/* Search button */}
			<Button
				type="submit"
				variant="primary"
				size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
				className="join-item"
				aria-label="Search"
			>
				<Icon name="search" size={sizeClasses[size].icon} className="sm:hidden" />
				<span className="hidden sm:inline">Search</span>
			</Button>
		</form>
	);
};
