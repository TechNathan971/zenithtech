import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { NavGroup, NavItem, NavMenu, NavPromo } from "@/data/nav";

// Add a picture at public/images/nav-promo.jpg and it shows on the menu card.
const PROMO_IMAGE = "/images/nav-promo.jpg";

const gridCols: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

function MenuLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <Link href={item.href} onClick={onNavigate} className="group block rounded-md py-1.5">
      <span className="text-[15px] font-medium text-brand-600 group-hover:text-brand-800">
        {item.label}
      </span>
      {item.description && (
        <span className="mt-0.5 block text-sm text-ink-500">{item.description}</span>
      )}
    </Link>
  );
}

function Group({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const detailed = group.items.some((item) => item.description);
  return (
    <div>
      <p className="mb-3 border-b border-ink-200 pb-3 text-sm font-medium text-ink-950">
        {group.title}
      </p>
      <ul className={detailed ? "space-y-2" : "space-y-1"}>
        {group.items.map((item) => (
          <li key={item.href}>
            <MenuLink item={item} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Promo({ promo, onNavigate }: { promo: NavPromo; onNavigate: () => void }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="mt-auto overflow-hidden rounded-card border border-ink-100 bg-white shadow-card">
      <div className="relative h-28 bg-linear-to-br from-brand-600 via-violet-500 to-coral-500">
        {!failed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={(img) => {
              if (img && img.complete && img.naturalWidth === 0) setFailed(true);
            }}
            src={PROMO_IMAGE}
            alt=""
            onError={() => setFailed(true)}
            className="absolute inset-0 size-full object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold text-ink-950">{promo.title}</p>
        <p className="mt-1 text-sm text-ink-500">{promo.text}</p>
        <Link
          href={promo.cta.href}
          onClick={onNavigate}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-800"
        >
          {promo.cta.label}
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    </div>
  );
}

type MegaMenuPanelProps = { menu: NavMenu; open: boolean; onNavigate: () => void };

export function MegaMenuPanel({ menu, open, onNavigate }: MegaMenuPanelProps) {
  return (
    <div
      id={`panel-${menu.id}`}
      data-open={open}
      className="invisible absolute inset-x-0 top-full -translate-y-1 border-y border-ink-100 bg-white opacity-0 shadow-float transition-[opacity,transform,visibility] duration-150 data-[open=true]:visible data-[open=true]:translate-y-0 data-[open=true]:opacity-100"
    >
      {/* Taller than the window? The menu scrolls inside itself. */}
      <div className="mx-auto max-h-[calc(100dvh-4rem)] max-w-[1320px] [scrollbar-width:thin] overflow-y-auto overscroll-contain">
        <div className={clsx("grid", menu.aside && "lg:grid-cols-[1fr_17rem]")}>
          <div className="flex min-w-0 flex-col">
            <div
              className={clsx(
                "grid gap-x-10 px-6 py-8 lg:px-12",
                gridCols[menu.columns.length] ?? "grid-cols-3",
              )}
            >
              {menu.columns.map((group) => (
                <Group key={group.title} group={group} onNavigate={onNavigate} />
              ))}
            </div>
            {menu.footerLink && (
              <div className="mt-auto border-t border-ink-200 px-6 py-4 lg:px-12">
                <Link
                  href={menu.footerLink.href}
                  onClick={onNavigate}
                  className="text-sm font-semibold text-brand-600 hover:text-brand-800"
                >
                  {menu.footerLink.label}
                </Link>
              </div>
            )}
          </div>
          {menu.aside && (
            <div className="flex flex-col gap-8 border-l border-ink-200 bg-ink-50 p-6">
              <Group group={menu.aside} onNavigate={onNavigate} />
              {menu.aside.promo && <Promo promo={menu.aside.promo} onNavigate={onNavigate} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
