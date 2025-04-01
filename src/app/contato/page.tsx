import { getPageBySlug } from "@utils/wordpress";
import { notFound } from "next/navigation";

export default async function ContactPage() {
  const page = await getPageBySlug("contato");

  if (!page) {
    notFound();
  }

  return (
    <div>
      {/* Conteúdo Principal */}
      <main>
        <div>
          <div>
            {/* Cabeçalho da Página */}
            <div>
              <h1>{page.title.rendered}</h1>
              <p>Entre em contato conosco</p>
            </div>

            {/* Conteúdo da Página */}
            <div>
              <div
                dangerouslySetInnerHTML={{ __html: page.content.rendered }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
