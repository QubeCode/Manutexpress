import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface LegalPageLayoutProps {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}

export function LegalPageLayout({
  title,
  updatedAt,
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pb-20 pt-24 lg:pb-0">
        <div className="container-max max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-blue transition-colors hover:text-brand-orange"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>

          <h1 className="mb-2 text-3xl font-bold text-brand-blue sm:text-4xl">
            {title}
          </h1>
          <p className="mb-10 text-sm text-muted-foreground">
            Dernière mise à jour : {updatedAt}
          </p>

          <article className="space-y-6 rounded-2xl bg-white p-6 shadow-sm sm:p-10 [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-brand-blue [&_h2:first-child]:mt-0 [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_ul]:space-y-2">
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
