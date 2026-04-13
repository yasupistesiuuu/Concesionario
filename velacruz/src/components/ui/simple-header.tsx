import React from 'react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';

export function SimpleHeader() {
	const [open, setOpen] = React.useState(false);

	const links = [
		{ label: 'Inicio', href: '/' },
		{ label: 'Vehículos de Ocasión', href: '/vehiculos-ocasion' },
		{ label: 'Compramos tu Coche', href: '/compramos-tu-coche' },
		{ label: 'Contacto', href: '/contacto' },
	];

	return (
		<header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950 shadow-sm">
			<nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-2">
					<a href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 text-zinc-100">
						<span className="text-brand">Autos</span>Velacruz
					</a>
				</div>
				<div className="hidden items-center gap-2 lg:flex">
					{links.map((link) => (
						<a
                            key={link.label}
							className={buttonVariants({ variant: 'ghost' })}
							href={link.href}
						>
							<span className="text-sm font-medium text-zinc-300 hover:text-brand transition-colors">{link.label}</span>
						</a>
					))}
					<a href="/compramos-tu-coche" className={buttonVariants({ variant: 'default', className: "ml-4 bg-brand text-black hover:bg-brand/90 hover:scale-[1.02] shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all font-bold" })}>
						Tasación Gratuita
					</a>
				</div>
				<Sheet open={open} onOpenChange={setOpen}>
					<Button size="icon" variant="ghost" className="lg:hidden text-zinc-100 hover:text-brand" asChild>
						<MenuToggle
							strokeWidth={2.5}
							open={open}
							onOpenChange={setOpen}
							className="size-6 text-zinc-300"
						/>
					</Button>
					<SheetContent
						className="bg-zinc-950/95 supports-[backdrop-filter]:bg-zinc-950/80 gap-0 backdrop-blur-xl border-zinc-800"
						showClose={true}
						side="left"
					>
                        <div className="flex items-center gap-2 px-4 pt-6 pb-2">
                            <a href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 text-zinc-100">
                                <span className="text-brand">Autos</span>Velacruz
                            </a>
                        </div>
						<div className="flex flex-col gap-y-4 overflow-y-auto px-4 pt-10 pb-5">
							{links.map((link) => (
								<a
                                    key={link.label}
									className="text-lg font-semibold text-zinc-300 hover:text-brand transition-colors"
									href={link.href}
                                    onClick={() => setOpen(false)}
								>
									{link.label}
								</a>
							))}
						</div>
						<SheetFooter className="mt-auto border-t border-zinc-800 px-4 py-6 bg-transparent">
							<a href="/compramos-tu-coche" className={buttonVariants({ variant: 'default', className: "w-full bg-brand text-black hover:bg-brand/90 py-6 text-lg shadow-[0_0_15px_rgba(34,197,94,0.3)] font-bold" })}>
                                Tasación Gratuita
                            </a>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}
