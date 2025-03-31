import { getPageBySlug } from "@/utils/wordpress";
import { notFound } from "next/navigation";

export default async function AboutPage() {
  const page = await getPageBySlug("sobre");

  if (!page) {
    notFound();
  }

  return (
    <article>
      <div>
        <h1>{page.title.rendered}</h1>

        <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </div>
    </article>
  );
}
