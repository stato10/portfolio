/**
 * GSAP mobile overlay: full-height layout, one horizontal strip per nav link (+ CTA strip + footer).
 * Mirrors CodePen raMQBVQ staggered `.nav-panel` rows — avoids a single cramped scroll box.
 */
function NavbarMobileMenu({ overlayRef, menuOpen, onBackdropClose, linkPanels, middleExtras, bottomExtras }) {
    return (
        <div
            ref={overlayRef}
            id="portfolio-mobile-nav"
            role="dialog"
            aria-modal="true"
            className="nav fixed inset-0 z-[99] flex min-h-0 flex-col overflow-hidden [touch-action:manipulation] md:hidden"
            aria-hidden={!menuOpen}
        >
            {/* pointer-events toggled only by GSAP (inline) so iOS/Android don’t clash with Tailwind classes */}
            <button
                type="button"
                tabIndex={-1}
                className="nav-bg absolute inset-0 z-0 cursor-pointer border-0 bg-bg-primary/55 p-0 backdrop-blur-[2px]"
                onClick={onBackdropClose}
                aria-label="Close menu"
            />

            {/* Separate scroll surface: pan-y restores reliable touches on mobile while body is locked */}
            <div className="relative z-[1] mx-auto mt-[max(4.75rem,calc(env(safe-area-inset-top)+4rem))] flex min-h-0 w-full max-w-full flex-1 touch-pan-y flex-col gap-2 isolate overflow-y-auto overflow-x-hidden overscroll-y-contain px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] [scrollbar-gutter:stable] [-webkit-overflow-scrolling:touch]">
                {linkPanels}

                <section className="nav-panel nav-middle nav-border relative shrink-0 overflow-hidden rounded-[10px] border-2 border-primary/40 bg-gradient-to-br from-primary via-accent to-primary px-4 py-4 text-[#0e100f] sm:px-5 sm:py-5">
                    <p className="nav-middle-header mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-black/55">
                        Selected work & code
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <a
                            href="https://github.com/stato10"
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={-1}
                            className="rounded-full bg-[#0e100f] px-4 py-2 font-mono text-[11px] text-[#fffce1]"
                        >
                            GitHub
                        </a>
                        {middleExtras}
                    </div>
                </section>

                <section className="nav-panel nav-bottom nav-border relative flex min-h-[88px] shrink-0 items-center rounded-[10px] border-2 border-white/[0.12] bg-bg-primary px-4 py-4 text-zinc-500 sm:px-5 sm:py-5">
                    <ul className="nav-socials flex list-none flex-wrap gap-4 font-mono text-[12px]">{bottomExtras}</ul>
                </section>
            </div>
        </div>
    )
}

export default NavbarMobileMenu
