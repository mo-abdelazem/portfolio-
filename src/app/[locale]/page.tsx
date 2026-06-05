import { getMessages, setRequestLocale } from "next-intl/server";
import { HomePage } from "@/components/home-page";
import type { SiteContent } from "@/lib/types";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function IndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const content = messages.Home as SiteContent;

  return <HomePage content={content} />;
}
