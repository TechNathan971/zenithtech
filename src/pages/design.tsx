import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

function Swatches({ name }: { name: "brand" | "ink" }) {
  return (
    <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
      {shades.map((shade) => (
        <div key={shade}>
          <div
            className="h-14 rounded-md border border-ink-100"
            style={{ backgroundColor: `var(--color-${name}-${shade})` }}
          />
          <p className="mt-1 text-xs text-ink-500">{shade}</p>
        </div>
      ))}
    </div>
  );
}

export default function DesignSystem() {
  return (
    <Layout title="Design system" description="ZenithTech colors, type and components.">
      <Container className="space-y-16 py-16">
        <header>
          <h1 className="text-4xl font-semibold">Design system</h1>
          <p className="mt-3 max-w-2xl text-ink-600">
            Tokens and components in one place. Every new component gets added here.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Brand</h2>
          <Swatches name="brand" />
          <h2 className="pt-4 text-2xl font-semibold">Ink</h2>
          <Swatches name="ink" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Type scale</h2>
          <p className="text-5xl font-semibold">Display 48</p>
          <p className="text-3xl font-semibold">Heading 30</p>
          <p className="text-xl">Lead paragraph 20</p>
          <p className="text-base">Body 16: the quick brown fox jumps over the lazy dog.</p>
          <p className="text-sm text-ink-500">Small 14, for captions and fine print.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Buttons</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="#">Primary</Button>
            <Button href="#" arrow>
              With arrow
            </Button>
            <Button href="#" variant="secondary">
              Secondary
            </Button>
            <Button href="#" variant="ghost" arrow>
              Ghost
            </Button>
            <Button href="#" size="lg">
              Large
            </Button>
          </div>
          <div className="rounded-card bg-ink-950 p-6">
            <Button href="#" variant="inverse" arrow>
              Inverse, for dark sections
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Surfaces</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-card bg-white p-6 shadow-card">
              <h3 className="text-lg font-semibold">Card</h3>
              <p className="mt-2 text-ink-600">White surface with the card shadow.</p>
            </div>
            <div className="rounded-card bg-linear-to-br from-brand-500 via-violet-500 to-coral-500 p-6 text-white shadow-float">
              <h3 className="text-lg font-semibold text-white">Gradient</h3>
              <p className="mt-2 text-white/85">The brand gradient we would use in the hero.</p>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
