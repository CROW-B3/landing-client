'use client'

import Image from 'next/image'
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="relative w-full bg-black px-8 py-12 overflow-hidden">
      {/* Spreading light effect from bottom */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          bottom: '-70%',
          width: '130%',
          height: '50vh',
          background: 'radial-gradient(circle at center, rgba(60, 40, 100, 0.9), rgba(50, 30, 80, 0.7) 25%, rgba(40, 20, 70, 0.6) 45%, rgba(30, 15, 50, 0.4) 65%, transparent 80%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Logo Section */}
          <div className="flex items-start">
            <Image
              src="/favicon.webp"
              alt="CROW Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-white/60 hover:text-white transition-colors text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#features" className="text-white/60 hover:text-white transition-colors text-sm">
                  Features
                </a>
              </li>
              <li>
                <a href="#documentation" className="text-white/60 hover:text-white transition-colors text-sm">
                  Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  Developer Docs
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  SDKs & Libraries
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  Auth & Security
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <a href="mailto:CROW.B3@Gmail.com" className="text-white/60 hover:text-white transition-colors text-sm">
              Email: CROW.B3@Gmail.com
            </a>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white/40 text-sm">
            © 2025 CROW Inc. | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
