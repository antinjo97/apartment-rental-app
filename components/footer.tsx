"use client"

import { useLanguage } from "@/components/language-provider"
import { Facebook, Instagram, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("About Us")}</h3>
            <p className="text-gray-600">{t("We offer the best apartments for your vacation in Croatia.")}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("Quick Links")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  {t("Home")}
                </Link>
              </li>
              <li>
                <Link href="/apartments" className="text-gray-600 hover:text-blue-600">
                  {t("Apartments")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                  {t("Contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("Connect With Us")}</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a href="mailto:info@apartments.com" className="text-gray-600 hover:text-blue-600" aria-label="Email">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {t("Apartment Rentals")}. {t("All rights reserved.")}
          </p>
        </div>
      </div>
    </footer>
  )
}
