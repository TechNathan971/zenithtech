import { SnippetGallery } from "@/components/pages/SnippetGallery";

export default function SnippetsPage() {
  return (
    <SnippetGallery
      kind="snippet"
      title={["Snippets", "Extraits de code"]}
      description={[
        "Small pieces of code you can copy and adapt.",
        "De petits morceaux de code à copier et adapter.",
      ]}
      eyebrow={["Snippets", "Extraits de code"]}
      lead={["Small, useful, copyable.", "Petits, utiles, copiables."]}
      rest={[
        "Short pieces of code for jobs that come up again and again.",
        "De courts morceaux de code pour des tâches qui reviennent sans cesse.",
      ]}
    />
  );
}
