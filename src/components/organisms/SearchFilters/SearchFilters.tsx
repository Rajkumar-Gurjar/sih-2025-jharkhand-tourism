import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Rating } from '../../atoms/Rating';
import { FilterChip } from '../../molecules/FilterChip';
import type { FilterState, ListingTypeFilter, SearchFiltersProps } from './SearchFiltersProps';
import {
	amenities,
	defaultFilterState,
	districts,
	languages,
	productCategories,
} from './SearchFiltersProps';

/**
 * SearchFilters organism component for filtering search results
 *
 * @param props - Component props
 * @returns SearchFilters component
 */
export const SearchFilters = ({
	filters,
	onChange,
	onClear,
	onApply,
	listingType = 'all',
	showListingTypeSelector = true,
	isMobileDrawer = false,
	className = ''
}: SearchFiltersProps) => {
	// Helper to update a specific filter
	const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
		onChange({ ...filters, [key]: value });
	};

	// Toggle array item
	const toggleArrayItem = (key: 'amenities' | 'languages' | 'categories', item: string) => {
		const current = filters[key];
		const updated = current.includes(item)
			? current.filter((i) => i !== item)
			: [...current, item];
		updateFilter(key, updated);
	};

	// Get active filter count
	const getActiveFilterCount = (): number => {
		let count = 0;
		if (filters.listingType !== 'all') count++;
		if (filters.priceRange.min > 0 || filters.priceRange.max < 10000) count++;
		if (filters.minRating > 0) count++;
		if (filters.district && filters.district !== 'All Districts') count++;
		count += filters.amenities.length;
		count += filters.languages.length;
		count += filters.categories.length;
		return count;
	};

	// Get active chips for display
	const getActiveChips = () => {
		const chips: Array<{ label: string; onRemove: () => void }> = [];

		if (filters.priceRange.min > 0 || filters.priceRange.max < 10000) {
			chips.push({
				label: `₹${filters.priceRange.min} - ₹${filters.priceRange.max}`,
				onRemove: () => updateFilter('priceRange', defaultFilterState.priceRange),
			});
		}

		if (filters.minRating > 0) {
			chips.push({
				label: `${filters.minRating}+ stars`,
				onRemove: () => updateFilter('minRating', 0),
			});
		}

		if (filters.district && filters.district !== 'All Districts') {
			chips.push({
				label: filters.district,
				onRemove: () => updateFilter('district', ''),
			});
		}

		filters.amenities.forEach((id) => {
			const amenity = amenities.find((a) => a.id === id);
			if (amenity) {
				chips.push({
					label: amenity.label,
					onRemove: () => toggleArrayItem('amenities', id),
				});
			}
		});

		filters.languages.forEach((id) => {
			const lang = languages.find((l) => l.id === id);
			if (lang) {
				chips.push({
					label: lang.label,
					onRemove: () => toggleArrayItem('languages', id),
				});
			}
		});

		filters.categories.forEach((id) => {
			const cat = productCategories.find((c) => c.id === id);
			if (cat) {
				chips.push({
					label: cat.label,
					onRemove: () => toggleArrayItem('categories', id),
				});
			}
		});

		return chips;
	};

	const activeCount = getActiveFilterCount();
	const activeChips = getActiveChips();
	const effectiveListingType = filters.listingType !== 'all' ? filters.listingType : listingType;

	return (
		<div className={`bg-base-100 ${isMobileDrawer ? '' : 'rounded-lg border border-base-200 p-4'} ${className}`.trim()}>
			{/* Header */}
			<div className={`flex items-center justify-between ${isMobileDrawer ? 'p-4 border-b border-base-200' : 'mb-4'}`}>
				<h3 className="font-heading font-semibold text-lg flex items-center gap-2">
					<Icon name="filter_list" size="md" />
					Filters
					{activeCount > 0 && (
						<span className="badge badge-primary badge-sm">{activeCount}</span>
					)}
				</h3>
				{activeCount > 0 && (
					<Button
						style="ghost"
						size="sm"
						onClick={onClear}
						className="text-error"
					>
						Clear All
					</Button>
				)}
			</div>

			{/* Active Filter Chips */}
			{activeChips.length > 0 && (
				<div className={`flex flex-wrap gap-2 ${isMobileDrawer ? 'px-4 pb-4' : 'mb-4'}`}>
					{activeChips.map((chip, index) => (
						<FilterChip
							key={index}
							label={chip.label}
							onRemove={chip.onRemove}
							size="sm"
						/>
					))}
				</div>
			)}

			{/* Filter Sections */}
			<div className={isMobileDrawer ? 'p-4 space-y-6 overflow-y-auto max-h-[60vh]' : 'space-y-6'}>
				{/* Listing Type Selector */}
				{showListingTypeSelector && (
					<div className="collapse collapse-arrow bg-base-200/50">
						<input type="checkbox" defaultChecked />
						<div className="collapse-title font-medium">
							Listing Type
						</div>
						<div className="collapse-content">
							<div className="flex flex-wrap gap-2 pt-2">
								{(['all', 'homestay', 'guide', 'product'] as ListingTypeFilter[]).map((type) => (
									<button
										key={type}
										onClick={() => updateFilter('listingType', type)}
										className={`btn btn-sm ${
											filters.listingType === type ? 'btn-primary' : 'btn-ghost'
										}`}
									>
										{type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1) + 's'}
									</button>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Price Range */}
				<div className="collapse collapse-arrow bg-base-200/50">
					<input type="checkbox" defaultChecked />
					<div className="collapse-title font-medium">
						Price Range
					</div>
					<div className="collapse-content">
						<div className="pt-2 space-y-4">
							<div className="flex items-center gap-4">
								<div className="flex-1">
									<label className="text-sm text-base-content/60">Min</label>
									<input
										type="number"
										value={filters.priceRange.min}
										onChange={(e) => updateFilter('priceRange', {
											...filters.priceRange,
											min: Number(e.target.value),
										})}
										className="input input-bordered input-sm w-full"
										min={0}
									/>
								</div>
								<span className="text-base-content/40 mt-5">—</span>
								<div className="flex-1">
									<label className="text-sm text-base-content/60">Max</label>
									<input
										type="number"
										value={filters.priceRange.max}
										onChange={(e) => updateFilter('priceRange', {
											...filters.priceRange,
											max: Number(e.target.value),
										})}
										className="input input-bordered input-sm w-full"
										min={0}
									/>
								</div>
							</div>
							<input
								type="range"
								min={0}
								max={10000}
								value={filters.priceRange.max}
								onChange={(e) => updateFilter('priceRange', {
									...filters.priceRange,
									max: Number(e.target.value),
								})}
								className="range range-primary range-sm"
							/>
						</div>
					</div>
				</div>

				{/* Rating Filter */}
				<div className="collapse collapse-arrow bg-base-200/50">
					<input type="checkbox" defaultChecked />
					<div className="collapse-title font-medium">
						Minimum Rating
					</div>
					<div className="collapse-content">
						<div className="pt-2 space-y-2">
							{[0, 3, 3.5, 4, 4.5].map((rating) => (
								<label
									key={rating}
									className="flex items-center gap-2 cursor-pointer hover:bg-base-200 p-2 rounded"
								>
									<input
										type="radio"
										name="rating"
										className="radio radio-primary radio-sm"
										checked={filters.minRating === rating}
										onChange={() => updateFilter('minRating', rating)}
									/>
									{rating === 0 ? (
										<span>Any rating</span>
									) : (
										<span className="flex items-center gap-2">
											<Rating name={`rating-filter-${rating}`} value={rating} size="sm" readOnly />
											<span className="text-sm text-base-content/60">& up</span>
										</span>
									)}
								</label>
							))}
						</div>
					</div>
				</div>

				{/* District/Location */}
				<div className="collapse collapse-arrow bg-base-200/50">
					<input type="checkbox" defaultChecked />
					<div className="collapse-title font-medium">
						Location
					</div>
					<div className="collapse-content">
						<div className="pt-2">
							<select
								className="select select-bordered select-sm w-full"
								value={filters.district}
								onChange={(e) => updateFilter('district', e.target.value)}
							>
								{districts.map((district) => (
									<option key={district} value={district === 'All Districts' ? '' : district}>
										{district}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* Amenities (Homestays) */}
				{(effectiveListingType === 'all' || effectiveListingType === 'homestay') && (
					<div className="collapse collapse-arrow bg-base-200/50">
						<input type="checkbox" />
						<div className="collapse-title font-medium">
							Amenities
						</div>
						<div className="collapse-content">
							<div className="pt-2 space-y-2">
								{amenities.map((amenity) => (
									<label
										key={amenity.id}
										className="flex items-center gap-2 cursor-pointer hover:bg-base-200 p-2 rounded"
									>
										<input
											type="checkbox"
											className="checkbox checkbox-primary checkbox-sm"
											checked={filters.amenities.includes(amenity.id)}
											onChange={() => toggleArrayItem('amenities', amenity.id)}
										/>
										<Icon name={amenity.icon} size="sm" />
										<span>{amenity.label}</span>
									</label>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Languages (Guides) */}
				{(effectiveListingType === 'all' || effectiveListingType === 'guide') && (
					<div className="collapse collapse-arrow bg-base-200/50">
						<input type="checkbox" />
						<div className="collapse-title font-medium">
							Languages
						</div>
						<div className="collapse-content">
							<div className="pt-2 space-y-2">
								{languages.map((lang) => (
									<label
										key={lang.id}
										className="flex items-center gap-2 cursor-pointer hover:bg-base-200 p-2 rounded"
									>
										<input
											type="checkbox"
											className="checkbox checkbox-primary checkbox-sm"
											checked={filters.languages.includes(lang.id)}
											onChange={() => toggleArrayItem('languages', lang.id)}
										/>
										<span>{lang.label}</span>
									</label>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Categories (Products) */}
				{(effectiveListingType === 'all' || effectiveListingType === 'product') && (
					<div className="collapse collapse-arrow bg-base-200/50">
						<input type="checkbox" />
						<div className="collapse-title font-medium">
							Categories
						</div>
						<div className="collapse-content">
							<div className="pt-2 space-y-2">
								{productCategories.map((cat) => (
									<label
										key={cat.id}
										className="flex items-center gap-2 cursor-pointer hover:bg-base-200 p-2 rounded"
									>
										<input
											type="checkbox"
											className="checkbox checkbox-primary checkbox-sm"
											checked={filters.categories.includes(cat.id)}
											onChange={() => toggleArrayItem('categories', cat.id)}
										/>
										<span>{cat.label}</span>
									</label>
								))}
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Mobile Apply Button */}
			{isMobileDrawer && (
				<div className="p-4 border-t border-base-200">
					<Button
						variant="primary"
						className="w-full"
						onClick={onApply}
					>
						Apply Filters
						{activeCount > 0 && ` (${activeCount})`}
					</Button>
				</div>
			)}
		</div>
	);
};
