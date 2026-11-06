import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { NavGroup, NavItem, NavMenu, NavPromo } from "@/data/nav";

const gridCols: Record<number, string> = {
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
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
      <p className="mb-3 border-b border-ink-100 pb-3 text-sm font-medium text-ink-950">
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
  return (
    <div className="mt-8 overflow-hidden rounded-card border border-ink-100 bg-white shadow-card">
      <div aria-hidden className="h-24 bg-linear-to-br from-brand-600 via-violet-500 to-coral-500" />
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
  const totalColumns = menu.columns.length + (menu.aside ? 1 : 0);

  return (
    <div
      id={`panel-${menu.id}`}
      data-open={open}
      className="invisible absolute inset-x-0 top-full -translate-y-1 border-t border-b border-ink-100 bg-white opacity-0 shadow-float transition-[opacity,transform,visibility] duration-150 data-[open=true]:visible data-[open=true]:translate-y-0 data-[open=true]:opacity-100"
    >
      <Container>
        <div className={clsx("grid gap-x-10 py-8", gridCols[totalColumns])}>
          {menu.columns.map((group) => (
            <Group key={group.title} group={group} onNavigate={onNavigate} />
          ))}
          {menu.aside && (
            <div className="-my-2 rounded-card bg-ink-50 p-5">
              <Group group={menu.aside} onNavigate={onNavigate} />
              {menu.aside.promo && <Promo promo={menu.aside.promo} onNavigate={onNavigate} />}
            </div>
          )}
        </div>
        {menu.footerLink && (
          <div className="border-t border-ink-100 py-4">
            <Link
              href={menu.footerLink.href}
              onClick={onNavigate}
              className="text-sm font-semibold text-brand-600 hover:text-brand-800"
            >
              {menu.footerLink.label}
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}