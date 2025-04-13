import { notFound } from "next/navigation";
import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from "./navigation"; // Import known locales and default
import messages from '../messages'; // Import our combined messages

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const finalLocale = locales.includes(locale as any) ? locale : defaultLocale;

  if (!finalLocale) notFound(); // Should ideally not happen if defaultLocale is set

  return {
    locale: finalLocale, // Return the validated/default locale
    messages: messages[finalLocale as keyof typeof messages] || messages[defaultLocale]
  };
});