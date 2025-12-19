import { Outlet } from 'react-router';
import { Footer } from '../../organisms/Footer';
import { MobileNav } from '../../organisms/MobileNav';
import { Navbar } from '../../organisms/Navbar';
import type { ContainerWidth, MainLayoutProps } from './MainLayoutProps';

/**
 * Get container classes based on width variant
 */
const getContainerClasses = (width: ContainerWidth): string => {
	switch (width) {
		case 'full':
			return 'w-full';
		case 'narrow':
			return 'container mx-auto px-4 max-w-3xl';
		case 'default':
		default:
			return 'container mx-auto px-4';
	}
};

/**
 * MainLayout component for standard page wrapper
 *
 * Provides consistent structure with Navbar, Footer, and MobileNav
 *
 * @param props - Component props
 * @returns MainLayout component
 */
export const MainLayout = ({
	children,
	containerWidth = 'default',
	showFooter = true,
	showMobileNav = true,
	user,
	cartItemCount = 0,
	activeMobileNavItem = 'home',
	onLogout,
	onSearch,
	onNewsletterSubmit,
	className = ''
}: MainLayoutProps) => {
	const containerClasses = getContainerClasses(containerWidth);

	return (
		<div className={`flex flex-col min-h-screen ${className}`.trim()}>
			{/* Skip to main content link for accessibility */}
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-content focus:px-4 focus:py-2 focus:rounded"
			>
				Skip to main content
			</a>

			{/* Navbar */}
			<Navbar
				user={user}
				cartItemCount={cartItemCount}
				onLogout={onLogout}
				onSearch={onSearch}
			/>

			{/* Main Content */}
			<main
				id="main-content"
				role="main"
				className={`flex-1 ${containerClasses} py-6 md:py-8 ${showMobileNav ? 'pb-20 md:pb-8' : ''}`}
			>
				{children ?? <Outlet />}
			</main>

			{/* Footer */}
			{showFooter && (
				<Footer onNewsletterSubmit={onNewsletterSubmit} />
			)}

			{/* Mobile Navigation */}
			{showMobileNav && (
				<MobileNav
					activeItem={activeMobileNavItem}
					cartItemCount={cartItemCount}
				/>
			)}
		</div>
	);
};
