import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Input } from '../../atoms/Input';
import type { FooterProps } from './FooterProps';

/**
 * Footer organism component for site-wide footer
 *
 * @param props - Component props
 * @returns Footer component
 */
export const Footer = ({
	onNewsletterSubmit,
	className = ''
}: FooterProps) => {
	const [email, setEmail] = useState('');

	// Footer link sections
	const exploreLinks = [
		{ label: 'Homestays', href: '/homestays' },
		{ label: 'Local Guides', href: '/guides' },
		{ label: 'Marketplace', href: '/marketplace' },
		{ label: 'Destinations', href: '/destinations' },
		{ label: 'Experiences', href: '/experiences' },
	];

	const supportLinks = [
		{ label: 'Help Center', href: '/help' },
		{ label: 'Safety Information', href: '/safety' },
		{ label: 'Cancellation Policy', href: '/cancellation-policy' },
		{ label: 'Contact Us', href: '/contact' },
		{ label: 'FAQs', href: '/faqs' },
	];

	const legalLinks = [
		{ label: 'Terms of Service', href: '/terms' },
		{ label: 'Privacy Policy', href: '/privacy' },
		{ label: 'Cookie Policy', href: '/cookies' },
		{ label: 'Refund Policy', href: '/refunds' },
	];

	const socialLinks = [
		{ icon: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
		{ icon: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
		{ icon: 'twitter', href: 'https://twitter.com', label: 'Twitter' },
		{ icon: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
	];

	// Handle newsletter submit
	const handleNewsletterSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (email.trim()) {
			onNewsletterSubmit?.(email);
			setEmail('');
		}
	};

	// Scroll to top
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<footer className={`bg-neutral text-neutral-content ${className}`.trim()}>
			{/* Main Footer Content */}
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
					{/* Brand Section */}
					<div className="lg:col-span-2">
						<Link to="/" className="flex items-center gap-2 text-2xl font-heading font-bold mb-4">
							<Icon name="landscape" size="xl" />
							JharkhandYatra
						</Link>
						<p className="text-neutral-content/80 mb-4 max-w-sm">
							Discover the soul of Jharkhand through authentic homestays, expert local guides,
							and genuine tribal handicrafts. Connect with communities, explore hidden gems.
						</p>

						{/* Social Links */}
						<div className="flex gap-2">
							{socialLinks.map((social) => (
								<a
									key={social.icon}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="btn btn-ghost btn-circle btn-sm"
									aria-label={social.label}
								>
									<Icon name={social.icon} size="md" />
								</a>
							))}
						</div>
					</div>

					{/* Explore Links */}
					<div>
						<h3 className="font-heading font-semibold text-lg mb-4">Explore</h3>
						<ul className="space-y-2">
							{exploreLinks.map((link) => (
								<li key={link.href}>
									<Link
										to={link.href}
										className="text-neutral-content/70 hover:text-neutral-content transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Support Links */}
					<div>
						<h3 className="font-heading font-semibold text-lg mb-4">Support</h3>
						<ul className="space-y-2">
							{supportLinks.map((link) => (
								<li key={link.href}>
									<Link
										to={link.href}
										className="text-neutral-content/70 hover:text-neutral-content transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter */}
					<div>
						<h3 className="font-heading font-semibold text-lg mb-4">Stay Updated</h3>
						<p className="text-neutral-content/70 text-sm mb-4">
							Subscribe to get travel tips, exclusive deals, and updates.
						</p>
						<form onSubmit={handleNewsletterSubmit} className="space-y-2">
							<Input
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full bg-neutral-content/10 border-neutral-content/20 text-neutral-content placeholder:text-neutral-content/50"
								required
							/>
							<Button
								type="submit"
								variant="primary"
								className="w-full"
								size="sm"
							>
								<Icon name="mail" size="sm" />
								Subscribe
							</Button>
						</form>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-neutral-content/10">
				<div className="container mx-auto px-4 py-6">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						{/* Copyright */}
						<p className="text-neutral-content/60 text-sm text-center md:text-left">
							&copy; {new Date().getFullYear()} JharkhandYatra. All rights reserved.
						</p>

						{/* Legal Links */}
						<div className="flex flex-wrap justify-center gap-4">
							{legalLinks.map((link) => (
								<Link
									key={link.href}
									to={link.href}
									className="text-neutral-content/60 hover:text-neutral-content text-sm transition-colors"
								>
									{link.label}
								</Link>
							))}
						</div>

						{/* Back to Top */}
						<Button
							onClick={scrollToTop}
							style="ghost"
							size="sm"
							className="text-neutral-content/60 hover:text-neutral-content"
							aria-label="Back to top"
						>
							<Icon name="arrow_upward" size="sm" />
							Back to Top
						</Button>
					</div>
				</div>
			</div>
		</footer>
	);
};
