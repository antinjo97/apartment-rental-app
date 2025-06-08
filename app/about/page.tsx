"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { Heart, Star, Award, Users, Clock, Shield, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const { t } = useLanguage()

  const teamMembers = [
    {
      name: "Ana Horvat",
      role: t("ceo", "CEO & Founder"),
      image: "/placeholder.svg?height=300&width=300",
      bio: t(
        "ana_bio",
        "Ana has over 10 years of experience in the hospitality industry and founded ApartRent with a vision to transform vacation rentals in Croatia.",
      ),
    },
    {
      name: "Marko Kovač",
      role: t("cto", "CTO"),
      image: "/placeholder.svg?height=300&width=300",
      bio: t(
        "marko_bio",
        "With a background in software engineering, Marko leads our technical team to create seamless booking experiences.",
      ),
    },
    {
      name: "Ivana Novak",
      role: t("customer_relations", "Head of Customer Relations"),
      image: "/placeholder.svg?height=300&width=300",
      bio: t("ivana_bio", "Ivana ensures that every guest has an exceptional experience from booking to checkout."),
    },
  ]

  const stats = [
    {
      value: "500+",
      label: t("happy_guests", "Happy Guests"),
      icon: Users,
    },
    {
      value: "50+",
      label: t("premium_apartments", "Premium Apartments"),
      icon: Home,
    },
    {
      value: "4.9",
      label: t("average_rating", "Average Rating"),
      icon: Star,
    },
    {
      value: "24/7",
      label: t("customer_support", "Customer Support"),
      icon: Clock,
    },
  ]

  const values = [
    {
      title: t("quality", "Quality"),
      description: t(
        "quality_desc",
        "We carefully select and verify all properties to ensure they meet our high standards.",
      ),
      icon: Award,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: t("trust", "Trust"),
      description: t(
        "trust_desc",
        "Transparent pricing and honest descriptions build trust with our guests and property owners.",
      ),
      icon: Shield,
      color: "bg-green-100 text-green-600",
    },
    {
      title: t("care", "Care"),
      description: t("care_desc", "We provide personalized support and care about every detail of your stay."),
      icon: Heart,
      color: "bg-red-100 text-red-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {t("about_us", "About Us")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
          >
            {t(
              "about_intro",
              "We're dedicated to providing exceptional vacation rentals and creating memorable experiences for our guests.",
            )}
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("our_story", "Our Story")}</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  {t(
                    "story_p1",
                    "Founded in 2020, ApartRent began with a simple mission: to make finding and booking vacation rentals in Croatia easy, transparent, and enjoyable.",
                  )}
                </p>
                <p>
                  {t(
                    "story_p2",
                    "What started as a small collection of handpicked apartments in Dubrovnik has grown into a curated selection of premium properties across the country, each meeting our strict standards for quality, comfort, and value.",
                  )}
                </p>
                <p>
                  {t(
                    "story_p3",
                    "Today, we're proud to have helped thousands of travelers create unforgettable memories in Croatia, and we continue to grow while maintaining our commitment to personalized service and exceptional guest experiences.",
                  )}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-xl overflow-hidden"
            >
              <Image src="/placeholder.svg?height=600&width=800" alt="Our story" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-xl shadow-lg"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("our_values", "Our Values")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                "values_intro",
                "These core principles guide everything we do and help us deliver exceptional experiences.",
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${value.color} rounded-full flex items-center justify-center mb-4`}>
                      <value.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("our_team", "Our Team")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                "team_intro",
                "Meet the passionate people behind ApartRent who work tirelessly to make your stay perfect.",
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 relative">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            {t("ready_to_book", "Ready to Book Your Perfect Stay?")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            {t("cta_text", "Browse our selection of premium apartments and find your ideal vacation rental today.")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
              <Link href="/apartments">{t("browse_apartments", "Browse Apartments")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
