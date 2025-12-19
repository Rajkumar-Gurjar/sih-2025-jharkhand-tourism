import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import type { DashboardLayoutProps, SidebarItem } from './DashboardLayoutProps';

// Sidebar navigation items
const sidebarItems: SidebarItem[] = [
	{ label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
	{ label: 'My Listings', href: '/dashboard/listings', icon: 'list' },
	{ label: 'Bookings', href: '/dashboard/bookings', icon: 'calendar_month' },
	{ label: 'Analytics', href: '/dashboard/analytics', icon: 'bar_chart' },
	{ label: 'Reviews', href: '/dashboard/reviews', icon: 'star' },
	{ label: 'Settings', href: '/dashboard/settings', icon: 'settings' },
];

/**
 * DashboardLayout component for provider dashboard pages
 *
 * @param props - Component props
 * @returns DashboardLayout component
 */
export const DashboardLayout = ({
	children,
	user,
	onLogout,
	notificationCount = 0,
	className = ''
}: DashboardLayoutProps) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className={`min-h-screen flex flex-col bg-base-200 ${className}`.trim()}>
			{/* Header */}
			<header className="bg-base-100 shadow-sm sticky top-0 z-40">
				<div className="flex items-center justify-between px-4 py-3">
					{/* Left: Menu button + Logo */}
					<div className="flex items-center gap-3">
						{/* Mobile menu button */}
						<Button
							style="ghost"
							size="sm"
							className="lg:hidden"
							onClick={() => setSidebarOpen(!sidebarOpen)}
							aria-label="Toggle sidebar"
						>
							<Icon name="menu" size="md" />
						</Button>

						{/* Logo */}
						<Link to="/dashboard" className="flex items-center gap-2 text-primary">
							<Icon name="landscape" size="md" />
							<span className="font-heading font-bold hidden sm:inline">JharkhandYatra</span>
						</Link>

						{/* Dashboard label */}
						<span className="text-base-content/60 text-sm hidden md:inline">
							Provider Dashboard
						</span>
					</div>

					{/* Right: Notifications + User */}
					<div className="flex items-center gap-2">
						{/* Notifications */}
						<Button
							style="ghost"
							size="sm"
							className="btn-circle"
							aria-label="Notifications"
						>
							<div className="indicator">
								<Icon name="notifications" size="md" />
								{notificationCount > 0 && (
									<Badge variant="error" size="xs" className="indicator-item">
										{notificationCount > 9 ? '9+' : notificationCount}
									</Badge>
								)}
							</div>
						</Button>

						{/* User dropdown */}
						<div className="dropdown dropdown-end">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar"
							>
								<Avatar
									src={user.avatar}
									alt={user.name}
									placeholder={user.name.charAt(0).toUpperCase()}
									size="sm"
									shape="circle"
								/>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52"
							>
								<li className="menu-title">
									<span className="text-base-content font-semibold">{user.name}</span>
								</li>
								<div className="divider my-0"></div>
								<li>
									<Link to="/dashboard/profile">
										<Icon name="account_circle" size="sm" />
										Profile
									</Link>
								</li>
								<li>
									<Link to="/dashboard/settings">
										<Icon name="settings" size="sm" />
										Settings
									</Link>
								</li>
								<li>
									<Link to="/" target="_blank">
										<Icon name="open_in_new" size="sm" />
										View Site
									</Link>
								</li>
								<div className="divider my-0"></div>
								<li>
									<button onClick={onLogout} className="text-error">
										<Icon name="logout" size="sm" />
										Sign Out
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</header>

			{/* Body: Sidebar + Content */}
			<div className="flex flex-1">
				{/* Sidebar - Desktop (always visible) */}
				<aside className="hidden lg:flex lg:flex-col lg:w-64 bg-base-100 border-r border-base-200">
					<nav className="flex-1 p-4">
						<ul className="menu gap-1">
							{sidebarItems.map((item) => (
								<li key={item.href}>
									<NavLink
										to={item.href}
										end={item.href === '/dashboard'}
										className={({ isActive }) => isActive ? 'active' : ''}
									>
										<Icon name={item.icon} size="sm" />
										{item.label}
										{item.badge && item.badge > 0 && (
											<Badge variant="primary" size="sm">{item.badge}</Badge>
										)}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>

					{/* Help section */}
					<div className="p-4 border-t border-base-200">
						<Link to="/help" className="flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content">
							<Icon name="help" size="sm" />
							Need help?
						</Link>
					</div>
				</aside>

				{/* Sidebar - Mobile (drawer) */}
				{sidebarOpen && (
					<>
						{/* Backdrop */}
						<div
							className="fixed inset-0 bg-black/50 z-40 lg:hidden"
							onClick={() => setSidebarOpen(false)}
						/>

						{/* Drawer */}
						<aside className="fixed inset-y-0 left-0 w-64 bg-base-100 z-50 lg:hidden shadow-xl">
							{/* Drawer header */}
							<div className="flex items-center justify-between p-4 border-b border-base-200">
								<Link to="/dashboard" className="flex items-center gap-2 text-primary">
									<Icon name="landscape" size="md" />
									<span className="font-heading font-bold">JharkhandYatra</span>
								</Link>
								<Button
									style="ghost"
									size="sm"
									className="btn-circle"
									onClick={() => setSidebarOpen(false)}
								>
									<Icon name="close" size="md" />
								</Button>
							</div>

							{/* Drawer nav */}
							<nav className="p-4">
								<ul className="menu gap-1">
									{sidebarItems.map((item) => (
										<li key={item.href}>
											<NavLink
												to={item.href}
												end={item.href === '/dashboard'}
												className={({ isActive }) => isActive ? 'active' : ''}
												onClick={() => setSidebarOpen(false)}
											>
												<Icon name={item.icon} size="sm" />
												{item.label}
												{item.badge && item.badge > 0 && (
													<Badge variant="primary" size="sm">{item.badge}</Badge>
												)}
											</NavLink>
										</li>
									))}
								</ul>
							</nav>
						</aside>
					</>
				)}

				{/* Main Content */}
				<main className="flex-1 p-4 md:p-6 lg:p-8">
					{children ?? <Outlet />}
				</main>
			</div>
		</div>
	);
};
