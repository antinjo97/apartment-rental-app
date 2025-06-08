"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, User, LogOut, Settings, Calendar, Globe, Menu, X, Shield } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const { user, isAdmin, signOut } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white/90 backdrop-blur-sm"
      } border-b border-gray-200`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Home className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              {t("app_name", "Hrvatski Apartmani")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                className={isActive("/") ? "bg-gradient-to-r from-blue-600 to-teal-600" : ""}
              >
                {t("home", "Početna")}
              </Button>
            </Link>
            <Link href="/apartments">
              <Button
                variant={isActive("/apartments") ? "default" : "ghost"}
                className={isActive("/apartments") ? "bg-gradient-to-r from-blue-600 to-teal-600" : ""}
              >
                {t("apartments", "Apartmani")}
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant={isActive("/about") ? "default" : "ghost"}
                className={isActive("/about") ? "bg-gradient-to-r from-blue-600 to-teal-600" : ""}
              >
                {t("about", "O nama")}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant={isActive("/contact") ? "default" : "ghost"}
                className={isActive("/contact") ? "bg-gradient-to-r from-blue-600 to-teal-600" : ""}
              >
                {t("contact", "Kontakt")}
              </Button>
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">{language.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
                  🇬🇧 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("hr")} className={language === "hr" ? "bg-accent" : ""}>
                  🇭🇷 Hrvatski
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm">{user.email}</p>
                      {isAdmin && (
                        <p className="text-xs text-blue-600 flex items-center">
                          <Shield className="w-3 h-3 mr-1" />
                          {t("administrator", "Administrator")}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      {t("profile", "Profil")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/reservations" className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      {t("my_reservations", "Moje rezervacije")}
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center text-blue-600">
                          <Settings className="mr-2 h-4 w-4" />
                          {t("admin_panel", "Admin panel")}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("sign_out", "Odjava")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="ghost">{t("sign_in", "Prijava")}</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                    {t("sign_up", "Registracija")}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <div className="flex flex-col space-y-2">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    {t("home", "Početna")}
                  </Button>
                </Link>
                <Link href="/apartments" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    {t("apartments", "Apartmani")}
                  </Button>
                </Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    {t("about", "O nama")}
                  </Button>
                </Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    {t("contact", "Kontakt")}
                  </Button>
                </Link>

                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm text-gray-600">{t("language", "Jezik")}:</span>
                    <div className="flex space-x-1">
                      <Button
                        variant={language === "en" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setLanguage("en")}
                      >
                        EN
                      </Button>
                      <Button
                        variant={language === "hr" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setLanguage("hr")}
                      >
                        HR
                      </Button>
                    </div>
                  </div>
                </div>

                {user ? (
                  <div className="border-t border-gray-200 pt-2 mt-2 space-y-2">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium">{user.email}</p>
                      {isAdmin && (
                        <p className="text-xs text-blue-600 flex items-center mt-1">
                          <Shield className="w-3 h-3 mr-1" />
                          {t("administrator", "Administrator")}
                        </p>
                      )}
                    </div>
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        {t("profile", "Profil")}
                      </Button>
                    </Link>
                    <Link href="/reservations" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        {t("my_reservations", "Moje rezervacije")}
                      </Button>
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-blue-600">
                          <Settings className="mr-2 h-4 w-4" />
                          {t("admin_panel", "Admin panel")}
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleSignOut()
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full justify-start text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("sign_out", "Odjava")}
                    </Button>
                  </div>
                ) : (
                  <div className="border-t border-gray-200 pt-2 mt-2 space-y-2">
                    <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        {t("sign_in", "Prijava")}
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600">
                        {t("sign_up", "Registracija")}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
