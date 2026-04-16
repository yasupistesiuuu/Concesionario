'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageSquare, Camera, Music, Mail, Phone, MapPin } from 'lucide-react';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Navegación',
		links: [
			{ title: 'Inicio', href: '/' },
			{ title: 'Catálogo', href: '/catalogo' },
			{ title: 'Servicios', href: '/servicios' },
			{ title: 'Contacto', href: '/contacto' },
		],
	},
	{
		label: 'Empresa',
		links: [
			{ title: 'Sobre Nosotros', href: '/sobre-nosotros' },
			{ title: 'Compramos Tu Coche', href: '/compramos-tu-coche' },
			{ title: 'Vehículos por Encargo', href: '/vehiculos-por-encargo' },
			{ title: 'Distinitivo Ambiental', href: '/etiqueta/C' },
		],
	},
	{
		label: 'Contacto',
		links: [
			{ title: 'Llamar', href: 'tel:+34916330044', icon: Phone },
			{ title: 'Email', href: 'mailto:autosvelacruz@gmail.com', icon: Mail },
			{ title: 'Ubicación', href: '#', icon: MapPin },
		],
	},
	{
		label: 'Síguenos',
		links: [
			{ title: 'Facebook', href: 'https://www.facebook.com/autosvelacruz', icon: MessageSquare },
			{ title: 'Instagram', href: 'https://www.instagram.com/autosvelacruz/', icon: Camera },
			{ title: 'TikTok', href: 'https://www.tiktok.com/@autosvelacruz', icon: Music },
		],
	},
];

export function Footer() {
	return (
		<footer className="w-full bg-slate-950 border-t border-slate-800 px-6 py-12 lg:py-16">
			<div className="mx-auto max-w-6xl">

				<div className="grid w-full gap-8 md:gap-12">
					<AnimatedContainer className="space-y-4">
						<div>
							<h2 className="text-2xl font-bold text-yellow-400">AUTOS VELACRUZ</h2>
							<p className="text-slate-400 mt-4 text-sm">
								Concesionario de lujo en Valdemoro. Amplia selección de vehículos de segunda mano y ocasión.
								Financiación personalizada, entrega a domicilio, máxima tasación.
							</p>
						</div>
					</AnimatedContainer>

					<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
						{footerLinks.map((section, index) => (
							<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
								<div>
									<h3 className="text-sm font-semibold text-yellow-400">{section.label}</h3>
									<ul className="text-slate-400 mt-4 space-y-3 text-sm">
										{section.links.map((link) => (
											<li key={link.title}>
												<a
													href={link.href}
													target={link.href.startsWith('http') ? '_blank' : undefined}
													rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
													className="text-slate-400 hover:text-yellow-400 inline-flex items-center gap-2 transition-colors duration-300"
												>
													{link.icon && <link.icon className="size-4" />}
													{link.title}
												</a>
											</li>
										))}
									</ul>
								</div>
							</AnimatedContainer>
						))}
					</div>

					<AnimatedContainer delay={0.5}>
						<div className="border-t border-slate-800 pt-8 mt-8">
							<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
								<p className="text-slate-400 text-sm">
									© {new Date().getFullYear()} AUTOS VELACRUZ. Todos los derechos reservados.
								</p>
								<div className="flex gap-4">
									<a
										href="https://www.facebook.com/autosvelacruz"
										target="_blank"
										rel="noopener noreferrer"
										className="text-slate-400 hover:text-yellow-400 transition-colors"
									>
										<MessageSquare className="size-5" />
									</a>
									<a
										href="https://www.instagram.com/autosvelacruz/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-slate-400 hover:text-yellow-400 transition-colors"
									>
										<Camera className="size-5" />
									</a>
									<a
										href="https://www.tiktok.com/@autosvelacruz"
										target="_blank"
										rel="noopener noreferrer"
										className="text-slate-400 hover:text-yellow-400 transition-colors"
									>
										<Music className="size-5" />
									</a>
								</div>
							</div>
						</div>
					</AnimatedContainer>
				</div>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
