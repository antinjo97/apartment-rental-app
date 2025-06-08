"use client"

import { Shield, Clock, Heart, Award } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

export function WhyChooseUs() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Shield,
      title: t("secure_booking", "Secure Booking"),
      description: t("secure_booking_desc", "Your payments and personal information are always protected"),
    },
    {
      icon: Clock,
      title: t("instant_confirmation", "Instant Confirmation"),
      description: t("instant_confirmation_desc", "Get immediate booking confirmation and peace of mind"),
    },
    {
      icon: Heart,
      title: t("customer_support", "24/7 Customer Support"),
      description: t("customer_support_desc", "Our team is always here to help you with any questions"),
    },
    {
      icon: Award,
      title: t("best_prices", "Best Price Guarantee"),
      description: t("best_prices_desc", "We offer competitive prices and the best value for your money"),
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {t("why_choose_us", "Why Choose Us")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            {t("why_choose_us_desc", "We're committed to providing you with the best vacation rental experience")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
