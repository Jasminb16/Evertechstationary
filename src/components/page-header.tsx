import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div
        aria-hidden
        className="ruled pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <Container size="wide" className="relative py-14 sm:py-16 lg:py-20">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-3 text-navy-600">{eyebrow}</p>
          <h1 className="text-4xl leading-[1.1] font-semibold text-ink sm:text-5xl">
            {title}
          </h1>
          {lead ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
              {lead}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
