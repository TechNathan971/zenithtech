import { SnippetGallery } from "@/components/pages/SnippetGallery";

export default function CodeSamplesPage() {
  return (
    <SnippetGallery
      kind="sample"
      title={["Code samples", "Exemples de code"]}
      description={[
        "Small working projects, file by file.",
        "De petits projets qui fonctionnent, fichier par fichier.",
      ]}
      eyebrow={["Code samples", "Exemples de code"]}
      lead={["Small projects that work.", "De petits projets qui fonctionnent."]}
      rest={[
        "Three complete examples with every file shown. Copy them into a folder and run them.",
        "Trois exemples complets avec tous les fichiers. Copiez-les dans un dossier et lancez-les.",
      ]}
    />
  );
}
