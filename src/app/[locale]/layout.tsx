import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import type { SiteContent } from "@/lib/types";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500"],
  variable: "--font-arabic",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const isArabic = locale === "ar";

  return {
    metadataBase: new URL("https://mohamed.work"),
    title: t("title"),
    description: t("description"),
    keywords: [
      "Frontend Developer",
      "React",
      "Vue",
      "Next.js",
      "TypeScript",
      "Performance",
      "Accessibility",
      "i18n",
      "RTL",
    ],
    authors: [{ name: "Mohamed Abdelazem" }],
    creator: "Mohamed Abdelazem",
    alternates: {
      canonical: isArabic ? "/ar" : "/",
      languages: {
        en: "/",
        ar: "/ar",
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_EG" : "en_US",
      url: isArabic ? "https://mohamed.work/ar" : "https://mohamed.work",
      title: t("title"),
      description: t("ogDescription"),
      siteName: "Mohamed Abdelazem",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const content = messages.Home as SiteContent;
  const t = await getTranslations({ locale, namespace: "Home.copy" });
  const isArabic = locale === "ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohamed Abdelazem",
    jobTitle: "Frontend Developer",
    url: isArabic ? "https://mohamed.work/ar" : "https://mohamed.work",
    email: "hello@mohamed.work",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Damietta",
      addressCountry: "EG",
    },
    sameAs: [
      "https://github.com/mo-abdelazem",
      "https://linkedin.com/in/mo-abdelazem",
    ],
  };

  return (
    <html
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className={`${inter.variable} ${notoSansArabic.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        {/* Set the theme before paint to avoid a flash of the wrong theme.
            color-scheme keeps the native canvas/scrollbars in sync from the
            first frame; theme-ready is flipped on after paint so the body's
            color transition never animates the initial dark→light→dark fade. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}d.setAttribute('data-theme',t);d.style.colorScheme=t;requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.add('theme-ready');});});}catch(e){}})();`,
          }}
        />
        <NextIntlClientProvider locale={locale} messages={{}}>
          <a href="#main" className="skip-link">
            {t("skipLink")}
          </a>
          <Nav
            locale={content.locale}
            navLinks={content.navLinks}
            copy={content.copy}
          />
          {children}
          <Footer content={content} />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
