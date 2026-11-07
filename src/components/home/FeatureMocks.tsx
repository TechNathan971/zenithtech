import clsx from "clsx";
import { Gauge, ShoppingBag, Wifi } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import type { FeatureId } from "@/data/features";

function Window({
  url,
  children,
  className,
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("overflow-hidden rounded-t-xl bg-white shadow-float", className)}>
      <div className="flex items-center gap-1.5 border-b border-ink-100 bg-ink-50 px-3 py-2">
        <span className="size-2 rounded-full bg-ink-200" />
        <span className="size-2 rounded-full bg-ink-200" />
        <span className="size-2 rounded-full bg-ink-200" />
        <span className="ml-2 truncate rounded-full bg-white px-3 py-0.5 text-[11px] text-ink-500">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-medium text-ink-500">{label}</p>
      <div className="rounded-md border border-ink-200 bg-white px-3 py-2 text-xs text-ink-900">
        {value}
      </div>
    </div>
  );
}

function PaymentsMock() {
  return (
    <div className="flex size-full items-end justify-center gap-5 px-5 pt-8 @lg:px-10">
      <div className="hidden w-44 shrink-0 rounded-t-[1.75rem] bg-ink-950 p-2 pb-0 shadow-float @lg:block">
        <div className="rounded-t-[1.35rem] bg-white px-4 pt-6 pb-10 text-center">
          <div className="relative mx-auto grid size-10 place-items-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-200 opacity-60" />
            <Wifi aria-hidden className="relative size-5 rotate-90 text-brand-600" />
          </div>
          <p className="mt-3 text-xs text-ink-500">Pay Brightloom</p>
          <p className="text-2xl font-semibold text-ink-950">$26.89</p>
          <p className="mt-2 text-[11px] text-ink-500">Tap, insert or swipe card</p>
        </div>
      </div>
      <Window url="brightloom.shop/checkout" className="w-full max-w-md">
        <div className="space-y-3 p-5">
          <p className="text-sm font-bold tracking-wide text-coral-500">BRIGHTLOOM</p>
          <Field label="Email" value="alex@example.com" />
          <Field label="Card number" value="•••• •••• •••• 4242" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Expiry" value="08 / 29" />
            <Field label="Security code" value="•••" />
          </div>
          <div className="grid h-10 place-items-center rounded-lg bg-brand-600 text-sm font-semibold text-white">
            Pay $26.89
          </div>
        </div>
      </Window>
    </div>
  );
}

function BillingMock() {
  return (
    <div className="flex size-full flex-col items-center justify-end gap-3 px-6 pt-8">
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-float">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-brand-50 text-brand-600">
            <Gauge aria-hidden className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink-950">Scale plan</p>
            <p className="text-xs text-ink-500">Billed monthly</p>
          </div>
        </div>
        <p className="mt-4 text-sm font-medium text-ink-950">API calls</p>
        <p className="text-xs text-ink-500">$0.004 per 1,000 calls</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-100">
          <div className="h-full origin-left animate-meter rounded-full bg-linear-to-r from-brand-500 to-pink-400" />
        </div>
      </div>
      <div className="w-full max-w-sm rounded-t-xl bg-white p-5 shadow-float">
        <p className="text-xs text-ink-500">Calls in the last 30 days</p>
        <p className="mt-1 text-2xl font-semibold text-ink-950 tabular-nums">1,284,906</p>
      </div>
    </div>
  );
}

const accounts = [
  {
    name: "Fieldnote Studio",
    country: "Canada",
    balance: "$6,120.00",
    volume: "$58,904.20",
    dot: "bg-brand-500",
  },
  {
    name: "Harbor & Pine",
    country: "United States",
    balance: "$2,480.50",
    volume: "$31,260.75",
    dot: "bg-coral-500",
  },
  {
    name: "Orbit Fitness",
    country: "United Kingdom",
    balance: "$940.00",
    volume: "$12,718.40",
    dot: "bg-violet-500",
  },
  {
    name: "Tallow Candle Co",
    country: "Australia",
    balance: "$1,732.10",
    volume: "$9,845.00",
    dot: "bg-pink-400",
  },
  {
    name: "Lumen Pottery",
    country: "Canada",
    balance: "$310.00",
    volume: "$4,260.90",
    dot: "bg-ink-700",
  },
  {
    name: "Kite & Thread",
    country: "United States",
    balance: "$4,005.00",
    volume: "$22,317.30",
    dot: "bg-brand-700",
  },
];

function PlatformMock() {
  return (
    <div className="relative size-full px-5 pt-8 @2xl:px-10">
      <Window url="app.fieldwork.example" className="h-full">
        <div className="p-5">
          <p className="text-sm font-semibold text-ink-950">Connected accounts</p>
          <table className="mt-4 w-full text-left text-xs">
            <thead className="text-ink-500">
              <tr>
                <th className="pb-2 font-medium">Account</th>
                <th className="hidden pb-2 font-medium @lg:table-cell">Country</th>
                <th className="hidden pb-2 font-medium @xl:table-cell">Balance</th>
                <th className="pb-2 text-right font-medium">Volume</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, i) => (
                <tr
                  key={account.name}
                  className="animate-fade-up border-t border-ink-100"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <td className="py-2.5 font-medium text-ink-900">
                    <span
                      className={clsx(
                        "mr-2 inline-grid size-5 place-items-center rounded-full text-[10px] text-white",
                        account.dot,
                      )}
                    >
                      {account.name[0]}
                    </span>
                    {account.name}
                  </td>
                  <td className="hidden py-2.5 text-ink-600 @lg:table-cell">{account.country}</td>
                  <td className="hidden py-2.5 text-ink-600 tabular-nums @xl:table-cell">
                    {account.balance}
                  </td>
                  <td className="py-2.5 text-right text-ink-900 tabular-nums">{account.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Window>
      <div className="absolute bottom-6 left-5 hidden w-64 rounded-lg bg-white p-3 shadow-float @lg:block @2xl:left-10">
        <p className="text-xs font-semibold text-ink-950">Payouts</p>
        <p className="mt-0.5 text-[11px] text-ink-500">
          Show balances and let accounts withdraw funds.
        </p>
        <code className="mt-2 block rounded bg-ink-50 px-2 py-1 font-mono text-[10px] text-ink-700">
          {'<ZenithEmbed component="payouts" />'}
        </code>
      </div>
    </div>
  );
}

const products = [
  { name: "Trail Shell", detail: "Moss · Medium", price: "$98.00" },
  { name: "Ridge Fleece", detail: "Slate · Medium", price: "$84.00" },
];

function AssistantsMock() {
  return (
    <div className="flex size-full flex-col justify-end gap-3 px-5 pt-6 pb-5">
      <p className="max-w-[85%] animate-loop-in self-start rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-sm text-ink-900 shadow-card">
        Looking for a warm jacket for autumn hikes, under $120?
      </p>
      <p
        className="max-w-[92%] animate-loop-in self-end rounded-2xl rounded-br-sm bg-ink-950 px-4 py-2.5 text-sm text-white shadow-card"
        style={{ animationDelay: "1.2s" }}
      >
        Here are two great fits:
      </p>
      <div
        className="grid animate-loop-in grid-cols-2 gap-2 rounded-xl bg-white p-3 shadow-float"
        style={{ animationDelay: "2.4s" }}
      >
        {products.map((product) => (
          <div key={product.name} className="rounded-lg border border-ink-100 p-2">
            <div className="grid h-14 place-items-center rounded-md bg-ink-50 text-ink-400">
              <ShoppingBag aria-hidden className="size-6" />
            </div>
            <p className="mt-2 text-xs font-semibold text-ink-950">{product.name}</p>
            <p className="text-[11px] text-ink-500">{product.detail}</p>
            <p className="mt-1 text-xs font-medium text-ink-900">{product.price}</p>
          </div>
        ))}
        <div className="col-span-2 grid h-9 place-items-center rounded-lg bg-brand-600 text-sm font-semibold text-white">
          Buy now
        </div>
      </div>
    </div>
  );
}

function CardsMock() {
  return (
    <div className="grid size-full place-items-center px-6">
      <div className="relative aspect-[1.586/1] w-full max-w-xs animate-float overflow-hidden rounded-2xl bg-linear-to-br from-ink-900 via-brand-800 to-violet-600 p-5 text-white shadow-float">
        <div className="flex items-start justify-between">
          <span className="text-sm font-bold tracking-wide">ZENITH</span>
          <Wifi aria-hidden className="size-5 rotate-90 opacity-80" />
        </div>
        <div className="mt-6 h-7 w-9 rounded-md bg-linear-to-br from-amber-200 to-amber-400" />
        <p className="mt-5 font-mono text-sm tracking-widest">•••• •••• •••• 7305</p>
        <div className="mt-3 flex items-end justify-between text-[11px] text-white/80">
          <span>ALEX MORGAN</span>
          <span>09/29</span>
        </div>
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-linear-to-r from-transparent via-white/25 to-transparent"
        />
      </div>
    </div>
  );
}

// A sphere made of dots, generated once with plain arithmetic so server and browser agree.
const GLOBE_DOTS = (() => {
  const dots: { x: number; y: number; o: number }[] = [];
  const n = 24;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const x = ((i + 0.5) / n) * 200;
      const y = ((j + 0.5) / n) * 200;
      if ((x - 100) ** 2 + (y - 100) ** 2 > 94 ** 2) continue;
      if ((i * 31 + j * 17 + ((i * j) % 7)) % 4 === 0) continue;
      dots.push({
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
        o: 0.3 + ((i * 7 + j * 13) % 5) * 0.12,
      });
    }
  }
  return dots;
})();

const ROUTE_A = "M52 128 Q 88 40 150 78";
const ROUTE_B = "M150 78 Q 172 124 118 160";

function StablecoinsMock() {
  return (
    <div className="relative size-full p-4">
      <svg viewBox="0 0 200 200" aria-hidden className="size-full">
        {GLOBE_DOTS.map((dot) => (
          <circle
            key={`${dot.x}-${dot.y}`}
            cx={dot.x}
            cy={dot.y}
            r="1.7"
            className="fill-brand-600"
            opacity={dot.o}
          />
        ))}
        <path
          d={ROUTE_A}
          fill="none"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          className="stroke-violet-500"
        />
        <path
          d={ROUTE_B}
          fill="none"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          className="stroke-pink-500"
        />
        {[
          [52, 128],
          [150, 78],
          [118, 160],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="4.5"
            strokeWidth="1.6"
            className="fill-white stroke-brand-600"
          />
        ))}
        <circle r="3.2" className="fill-violet-600 motion-reduce:hidden">
          <animateMotion dur="3.6s" repeatCount="indefinite" path={ROUTE_A} />
        </circle>
        <circle r="3.2" className="fill-pink-500 motion-reduce:hidden">
          <animateMotion dur="3.6s" begin="1.2s" repeatCount="indefinite" path={ROUTE_B} />
        </circle>
      </svg>
      <div className="absolute bottom-5 left-5 animate-fade-up rounded-lg bg-white px-3 py-2 shadow-float">
        <p className="text-[11px] text-ink-500">Sent · settled in 3 seconds</p>
        <p className="text-sm font-semibold text-ink-950 tabular-nums">$8,240.00</p>
      </div>
    </div>
  );
}

const mocks: Record<FeatureId, ComponentType> = {
  payments: PaymentsMock,
  billing: BillingMock,
  platform: PlatformMock,
  assistants: AssistantsMock,
  cards: CardsMock,
  stablecoins: StablecoinsMock,
};

export function FeatureMock({ id }: { id: FeatureId }) {
  const Mock = mocks[id];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Mock />
    </div>
  );
}
