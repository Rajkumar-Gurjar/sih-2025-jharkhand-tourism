import api from './api';
import type { ApiResponse, Homestay, HomestayListParams, Review, ReviewListParams } from '../types/api.types';

/**
 * Raw homestay from API (may have different structure)
 */
interface RawHomestay {
	id: string | number;
	title: string;
	description: string;
	location: string;
	district: string;
	price: number;
	rating: number;
	reviewCount: number;
	images: string[] | Array<{ item: string }>;
	amenities: string[] | Array<{ item: string }>;
	hostId: string;
	hostName: string;
	hostAvatar?: string;
	capacity: {
		guests: number;
		bedrooms: number;
		beds: number;
		bathrooms: number;
	};
	propertyType: 'entire' | 'private' | 'shared' | string;
	minStay: number;
	maxStay: number;
	houseRules: string[] | Array<{ item: string }>;
	coordinates?: {
		lat: number;
		lng: number;
	};
}

/**
 * Curated placeholder images for homestays (nature, cottages, landscapes)
 */
const HOMESTAY_PLACEHOLDER_IMAGES = [
	'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop',
	'https://images.unsplash.com/photo-1505916349660-8d91a99c3e23?w=800&h=600&fit=crop',
];

/**
 * Check if an image URL is valid/usable
 */
function isValidImageUrl(url: string): boolean {
	if (!url || typeof url !== 'string') return false;
	// Accept Unsplash, Pexels, and other quality image sources
	const validDomains = ['unsplash.com', 'pexels.com', 'picsum.photos', 'placehold.co'];
	return validDomains.some(domain => url.includes(domain));
}

/**
 * Get a placeholder image based on index for consistency
 */
function getPlaceholderImage(index: number): string {
	return HOMESTAY_PLACEHOLDER_IMAGES[index % HOMESTAY_PLACEHOLDER_IMAGES.length];
}

/**
 * Normalize raw API data to expected Homestay format
 */
function normalizeHomestay(raw: RawHomestay, index: number = 0): Homestay {
	// Extract and validate images
	const rawImages = Array.isArray(raw.images)
		? raw.images.map(img => typeof img === 'string' ? img : img.item)
		: [];

	// Replace invalid images with placeholders
	const validImages = rawImages.filter(isValidImageUrl);
	const images = validImages.length > 0
		? validImages
		: [getPlaceholderImage(index), getPlaceholderImage(index + 1)];

	return {
		id: String(raw.id),
		title: raw.title,
		description: raw.description,
		location: raw.location,
		district: raw.district,
		price: raw.price,
		rating: raw.rating,
		reviewCount: raw.reviewCount,
		images,
		// Handle amenities as either string[] or {item: string}[]
		amenities: Array.isArray(raw.amenities)
			? raw.amenities.map(a => typeof a === 'string' ? a : a.item).filter(a => !a.includes('error:'))
			: [],
		hostId: raw.hostId,
		hostName: raw.hostName,
		hostAvatar: raw.hostAvatar,
		capacity: raw.capacity,
		propertyType: ['entire', 'private', 'shared'].includes(raw.propertyType)
			? raw.propertyType as 'entire' | 'private' | 'shared'
			: 'entire',
		minStay: raw.minStay,
		maxStay: raw.maxStay,
		// Handle houseRules as either string[] or {item: string}[]
		houseRules: Array.isArray(raw.houseRules)
			? raw.houseRules.map(r => typeof r === 'string' ? r : r.item).filter(r => !r.includes('error:'))
			: [],
		coordinates: raw.coordinates,
	};
}

/**
 * Homestay service for API operations
 */
export const homestaysService = {
	/**
	 * Get all homestays with optional filters
	 */
	async getAll(params?: HomestayListParams): Promise<ApiResponse<Homestay[]>> {
		const response = await api.get<RawHomestay[] | ApiResponse<RawHomestay[]>>(
			'/homestays',
			{ params }
		);

		// Handle both array response and wrapped response formats
		const rawData = Array.isArray(response.data)
			? response.data
			: response.data.data;

		const normalizedData = rawData.map((item, index) => normalizeHomestay(item, index));

		// Return in ApiResponse format
		return {
			data: normalizedData,
			meta: Array.isArray(response.data)
				? { total: normalizedData.length, page: 1, limit: normalizedData.length, totalPages: 1 }
				: response.data.meta,
		};
	},

	/**
	 * Get a single homestay by ID
	 */
	async getById(id: string): Promise<Homestay> {
		const response = await api.get<RawHomestay | { data: RawHomestay }>(`/homestays/${id}`);

		// Handle both direct object and wrapped response formats
		const rawData = 'data' in response.data && response.data.data
			? response.data.data
			: response.data as RawHomestay;

		return normalizeHomestay(rawData);
	},

	/**
	 * Get reviews for a homestay
	 */
	async getReviews(params: ReviewListParams): Promise<ApiResponse<Review[]>> {
		const response = await api.get<ApiResponse<Review[]> | Review[]>(
			`/homestays/${params.listingId}/reviews`,
			{ params: { page: params.page, limit: params.limit } }
		);

		// Handle both array response and wrapped response formats
		if (Array.isArray(response.data)) {
			return {
				data: response.data,
				meta: { total: response.data.length, page: 1, limit: response.data.length, totalPages: 1 }
			};
		}
		return response.data;
	},

	/**
	 * Get featured homestays for homepage
	 */
	async getFeatured(): Promise<Homestay[]> {
		const response = await api.get<RawHomestay[] | ApiResponse<RawHomestay[]>>('/homestays', {
			params: { featured: true, limit: 4 }
		});

		// Handle both array response and wrapped response formats
		const rawData = Array.isArray(response.data)
			? response.data
			: response.data.data;

		return rawData.map((item, index) => normalizeHomestay(item, index));
	},
};
