import clsx from "clsx";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  FocusEvent as ReactFocusEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav } from "@/data/nav";
import { MegaMenuPanel } from "./MegaMenuPanel";
import { MobileMenu } from "./MobileMenu";

const OPEN_DELAY = 80;
const CLOSE_DELAY = 140;

const isMouse = (e: { pointerType: string }) => e.pointerType === "mouse";

export function Header() {
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeAll = useCallback(() => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    setOpenId(null);
    setMobileOpen(false);
  }, []);

  // Close everything when navigating to another page
  useEffect(() => {
    router.events.on("routeChangeStart", closeAll);
    return () => router.events.off("routeChangeStart", closeAll);
  }, [router.events, closeAll]);

  // Escape closes; clicking outside the header closes
  useEffect(() => {
    if (!openId && !mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) menuButtonRef.current?.focus();
      else lastTrigger.current?.focus();
      setOpenId(null);
      setMobileOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenId(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openId, mobileOpen]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the mobile menu if the window grows to desktop size
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Clear pending timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(openTimer.current);
      clearTimeout(closeTimer.current);
    };
  }, []);

  const handleHeaderEnter = (e: ReactPointerEvent<HTMLElement>) => {
    if (isMouse(e)) clearTimeout(closeTimer.current);
  };

  const handleHeaderLeave = (e: ReactPointerEvent<HTMLElement>) => {
    if (!isMouse(e)) return;
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY);
  };

  const handleTriggerEnter = (id: string, e: ReactPointerEvent<HTMLElement>) => {
    if (!isMouse(e)) return;
    clearTimeout(closeTimer.current);
    clearTimeout(openTimer.current);
    if (openId) setOpenId(id);
    else openTimer.current = setTimeout(() => setOpenId(id), OPEN_DELAY);
  };

  // Hovering the logo, Pricing or the buttons closes any open panel
  const handleOtherEnter = (e: ReactPointerEvent<HTMLElement>) => {
    if (!isMouse(e)) return;
    clearTimeout(openTimer.current);
    setOpenId(null);
  };

  const handleTriggerClick = (id: string, e: ReactMouseEvent<HTMLButtonElement>) => {
    lastTrigger.current = e.currentTarget;
    clearTimeout(openTimer.current);
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const fromKeyboard = e.detail === 0;
    // Mouse users already opened it by hovering, so a click should not close it.
    setOpenId((current) => (current === id && (fromKeyboard || !canHover) ? null : id));
  };

  const handleBlur = (e: ReactFocusEvent<HTMLElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && !e.currentTarget.contains(next)) setOpenId(null);
  };

  return (
    <header
      ref={headerRef}
      onPointerEnter={handleHeaderEnter}
      onPointerLeave={handleHeaderLeave}
      onBlur={handleBlur}
      className="sticky top-0 z-50 border-b border-ink-100 bg-white/90 backdrop-blur"
    >
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            aria-label="ZenithTech home"
            className="text-ink-950"
            onPointerEnter={handleOtherEnter}
            onFocus={() => setOpenId(null)}
          >
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {mainNav.map((entry) => {
              if (entry.type === "link") {
                return (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    onPointerEnter={handleOtherEnter}
                    onFocus={() => setOpenId(null)}
                    className="rounded-md px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:text-ink-950"
                  >
                    {entry.label}
                  </Link>
                );
              }

              const { menu } = entry;
              const isOpen = openId === menu.id;

              return (
                <div key={menu.id}>
                  <button
                    type="button"
                    id={`trigger-${menu.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${menu.id}`}
                    onPointerEnter={(e) => handleTriggerEnter(menu.id, e)}
                    onClick={(e) => handleTriggerClick(menu.id, e)}
                    onFocus={() => {
                      if (openId && openId !== menu.id) setOpenId(null);
                    }}
                    className={clsx(
                      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isOpen ? "text-ink-950" : "text-ink-600 hover:text-ink-950",
                    )}
                  >
                    {menu.label}
                    <ChevronDown
                      aria-hidden
                      className={clsx(
                        "size-4 transition-transform duration-150",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <MegaMenuPanel menu={menu} open={isOpen} onNavigate={closeAll} />
                </div>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2" onPointerEnter={handleOtherEnter}>
          <Button href="/sign-in" variant="secondary" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button href="/contact-sales" arrow className="hidden sm:inline-flex">
            Contact sales
          </Button>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center rounded-lg text-ink-800 hover:bg-ink-50 lg:hidden"
          >
            {mobileOpen ? (
              <X aria-hidden className="size-6" />
            ) : (
              <Menu aria-hidden className="size-6" />
            )}
          </button>
        </div>
      </Container>

      <MobileMenu id="mobile-menu" open={mobileOpen} onNavigate={closeAll} />
    </header>
  );
}
