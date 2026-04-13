'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
const Facebook = (LucideIcons as any).Facebook || ((props: any) => <span {...props}>FB</span>);
const Instagram = (LucideIcons as any).Instagram || ((props: any) => <span {...props}>IG</span>);
const Linkedin = (LucideIcons as any).Linkedin || ((props: any) => <span {...props}>LI</span>);
const Youtube = (LucideIcons as any).Youtube || ((props: any) => <span {...props}>YT</span>);

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
		label: 'Vehículos',
		links: [
			{ title: 'Catálogo de Ocasión', href: '/vehiculos-ocasion' },
			{ title: 'Audi Premium', href: '/vehiculos-ocasion?marca=Audi' },
			{ title: 'Mecánica Peugeot', href: '/vehiculos-ocasion?marca=Peugeot' },
			{ title: 'Modelos SEAT', href: '/vehiculos-ocasion?marca=Seat' },
		],
	},
	{
		label: 'Servicios',
		links: [
			{ title: 'Compramos tu Coche', href: '/compramos-tu-coche' },
			{ title: 'Financiación a Medida', href: '/financiacion' },
			{ title: 'Garantía 12 Meses', href: '/garantia' },
			{ title: 'Entrega a Domicilio', href: '/contacto' },
		],
	},
	{
		label: 'Legal',
		links: [
			{ title: 'Aviso Legal', href: '/aviso-legal' },
			{ title: 'Política de Privacidad', href: '/privacidad' },
			{ title: 'Política de Cookies', href: '/cookies' },
			{ title: 'Términos del Servicio', href: '/terminos' },
		],
	},
	{
		label: 'Redes Sociales',
		links: [
			{ title: 'Facebook', href: '#', icon: Facebook },
			{ title: 'Instagram', href: '#', icon: Instagram },
			{ title: 'Youtube', href: '#', icon: Youtube },
			{ title: 'LinkedIn', href: '#', icon: Linkedin },
		],
	},
];

export function Footer() {
	return (
		<footer className="md:rounded-t-6xl relative z-20 w-full flex flex-col items-center justify-center rounded-t-4xl border-t border-zinc-800 bg-zinc-950 shadow-2xl px-6 py-12 lg:py-16 mt-24">
			<div className="absolute inset-0 rounded-t-4xl bg-[radial-gradient(35%_128px_at_50%_0%,rgba(34,197,94,0.08),transparent)] pointer-events-none"></div>

			<div className="bg-brand/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full max-w-7xl mx-auto gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
                    <a href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 text-zinc-100">
						<span className="text-brand">Autos</span>Velacruz
					</a>
					<p className="text-zinc-400 mt-8 text-sm md:mt-2 max-w-xs">
						Concesionario multimarca en Valdemoro. Calidad, garantía y trato premium desde nuestra primera tasación.
					</p>
					<p className="text-zinc-500 mt-8 text-xs md:mt-4">
						© {new Date().getFullYear()} Autos Velacruz. Todos los derechos reservados.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">{section.label}</h3>
								<ul className="text-zinc-400 mt-4 space-y-2 text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												className="hover:text-brand inline-flex items-center transition-all duration-300"
											>
												{link.icon && <link.icon className="me-2 size-4" />}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
};

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
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
};
