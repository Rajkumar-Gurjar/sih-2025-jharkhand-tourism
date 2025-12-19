import { useState } from 'react';
import { Link } from 'react-router';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import type { RegisterProps, RegisterFormData, UserRole } from './RegisterProps';

/**
 * Register page component
 */
export const Register = ({
	onSubmit,
	onGoogleLogin,
	onFacebookLogin,
	isLoading = false,
	error,
	defaultRole = 'tourist',
	className = '',
}: RegisterProps) => {
	const [formData, setFormData] = useState<RegisterFormData>({
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: defaultRole,
		acceptTerms: false,
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Basic validation
		const errors: Partial<Record<keyof RegisterFormData, string>> = {};

		if (formData.password.length < 8) {
			errors.password = 'Password must be at least 8 characters';
		}

		if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}

		if (!formData.acceptTerms) {
			errors.acceptTerms = 'You must accept the terms and conditions';
		}

		if (Object.keys(errors).length > 0) {
			setValidationErrors(errors);
			return;
		}

		setValidationErrors({});
		onSubmit?.(formData);
	};

	const handleChange = (field: keyof RegisterFormData, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear validation error when user types
		if (validationErrors[field]) {
			setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	const roles: { value: UserRole; label: string; description: string; icon: string }[] = [
		{
			value: 'tourist',
			label: 'Tourist',
			description: 'I want to explore and book experiences',
			icon: 'explore',
		},
		{
			value: 'provider',
			label: 'Provider',
			description: 'I want to host or sell products',
			icon: 'storefront',
		},
	];

	return (
		<div className={className}>
			{/* Title */}
			<h2 className="card-title text-2xl font-heading font-bold justify-center">
				Create Account
			</h2>
			<p className="text-center text-base-content/60 mb-4">
				Join JharkhandYatra today
			</p>

			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Error Alert */}
				{error && (
					<div className="alert alert-error">
						<Icon name="error" size="sm" />
						<span>{error}</span>
					</div>
				)}

				{/* Role Selection */}
				<div className="form-control">
					<label className="label">
						<span className="label-text font-medium">I am a</span>
					</label>
					<div className="grid grid-cols-2 gap-3">
						{roles.map((role) => (
							<button
								key={role.value}
								type="button"
								onClick={() => handleChange('role', role.value)}
								className={`p-3 rounded-lg border-2 text-left transition-colors ${
									formData.role === role.value
										? 'border-primary bg-primary/5'
										: 'border-base-300 hover:border-base-content/20'
								}`}
								disabled={isLoading}
							>
								<div className="flex items-center gap-2 mb-1">
									<Icon
										name={role.icon}
										size="sm"
										className={formData.role === role.value ? 'text-primary' : ''}
									/>
									<span className="font-medium text-sm">{role.label}</span>
								</div>
								<p className="text-xs text-base-content/60">{role.description}</p>
							</button>
						))}
					</div>
				</div>

				{/* Full Name Field */}
				<div className="form-control">
					<label className="label">
						<span className="label-text font-medium">Full Name</span>
					</label>
					<div className="relative">
						<Input
							type="text"
							placeholder="Enter your full name"
							value={formData.fullName}
							onChange={(e) => handleChange('fullName', e.target.value)}
							className="w-full pl-10"
							bordered
							required
							disabled={isLoading}
						/>
						<Icon
							name="person"
							size="sm"
							className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
						/>
					</div>
				</div>

				{/* Email Field */}
				<div className="form-control">
					<label className="label">
						<span className="label-text font-medium">Email</span>
					</label>
					<div className="relative">
						<Input
							type="email"
							placeholder="Enter your email"
							value={formData.email}
							onChange={(e) => handleChange('email', e.target.value)}
							className="w-full pl-10"
							bordered
							required
							disabled={isLoading}
						/>
						<Icon
							name="mail"
							size="sm"
							className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
						/>
					</div>
				</div>

				{/* Password Field */}
				<div className="form-control">
					<label className="label">
						<span className="label-text font-medium">Password</span>
					</label>
					<div className="relative">
						<Input
							type={showPassword ? 'text' : 'password'}
							placeholder="Create a password"
							value={formData.password}
							onChange={(e) => handleChange('password', e.target.value)}
							className={`w-full pl-10 pr-10 ${validationErrors.password ? 'input-error' : ''}`}
							bordered
							required
							disabled={isLoading}
							minLength={8}
						/>
						<Icon
							name="lock"
							size="sm"
							className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
						>
							<Icon name={showPassword ? 'visibility_off' : 'visibility'} size="sm" />
						</button>
					</div>
					{validationErrors.password && (
						<label className="label">
							<span className="label-text-alt text-error">{validationErrors.password}</span>
						</label>
					)}
					<label className="label">
						<span className="label-text-alt text-base-content/60">
							Must be at least 8 characters
						</span>
					</label>
				</div>

				{/* Confirm Password Field */}
				<div className="form-control">
					<label className="label">
						<span className="label-text font-medium">Confirm Password</span>
					</label>
					<div className="relative">
						<Input
							type={showConfirmPassword ? 'text' : 'password'}
							placeholder="Confirm your password"
							value={formData.confirmPassword}
							onChange={(e) => handleChange('confirmPassword', e.target.value)}
							className={`w-full pl-10 pr-10 ${validationErrors.confirmPassword ? 'input-error' : ''}`}
							bordered
							required
							disabled={isLoading}
						/>
						<Icon
							name="lock"
							size="sm"
							className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
						/>
						<button
							type="button"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
						>
							<Icon name={showConfirmPassword ? 'visibility_off' : 'visibility'} size="sm" />
						</button>
					</div>
					{validationErrors.confirmPassword && (
						<label className="label">
							<span className="label-text-alt text-error">{validationErrors.confirmPassword}</span>
						</label>
					)}
				</div>

				{/* Terms Checkbox */}
				<div className="form-control">
					<label className="label cursor-pointer justify-start gap-2">
						<input
							type="checkbox"
							checked={formData.acceptTerms}
							onChange={(e) => handleChange('acceptTerms', e.target.checked)}
							className={`checkbox checkbox-primary checkbox-sm ${validationErrors.acceptTerms ? 'checkbox-error' : ''}`}
							disabled={isLoading}
						/>
						<span className="label-text">
							I agree to the{' '}
							<Link to="/terms" className="link link-primary">
								Terms of Service
							</Link>{' '}
							and{' '}
							<Link to="/privacy" className="link link-primary">
								Privacy Policy
							</Link>
						</span>
					</label>
					{validationErrors.acceptTerms && (
						<label className="label pt-0">
							<span className="label-text-alt text-error">{validationErrors.acceptTerms}</span>
						</label>
					)}
				</div>

				{/* Submit Button */}
				<Button
					type="submit"
					variant="primary"
					className="w-full"
					disabled={isLoading}
				>
					{isLoading ? (
						<>
							<span className="loading loading-spinner loading-sm" />
							Creating account...
						</>
					) : (
						<>
							Create Account
							<Icon name="arrow_forward" size="sm" />
						</>
					)}
				</Button>

				{/* Divider */}
				<div className="divider text-base-content/40">or sign up with</div>

				{/* Social Signup */}
				<div className="grid grid-cols-2 gap-3">
					<Button
						type="button"
						style="outline"
						onClick={onGoogleLogin}
						disabled={isLoading}
						className="gap-2"
					>
						<svg className="w-5 h-5" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								fill="currentColor"
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								fill="currentColor"
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							/>
							<path
								fill="currentColor"
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							/>
						</svg>
						Google
					</Button>
					<Button
						type="button"
						style="outline"
						onClick={onFacebookLogin}
						disabled={isLoading}
						className="gap-2"
					>
						<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
						</svg>
						Facebook
					</Button>
				</div>

				{/* Sign In Link */}
				<p className="text-center text-sm text-base-content/60 mt-6">
					Already have an account?{' '}
					<Link to="/login" className="link link-primary font-medium">
						Sign in
					</Link>
				</p>
			</form>
		</div>
	);
};
