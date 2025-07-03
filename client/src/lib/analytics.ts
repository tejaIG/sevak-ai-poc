// Analytics utility for tracking events and conversions

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = (trackingId: string) => {
  if (typeof window === 'undefined') return;

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', trackingId);
};

// Track page views
export const trackPageView = (page_title: string, page_location: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_title,
      page_location,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (form_name: string, conversion_value?: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'generate_lead', {
      currency: 'INR',
      value: conversion_value || 1,
      form_name,
    });
  }
};

// Track button clicks
export const trackButtonClick = (button_name: string, section: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'click', {
      event_category: 'engagement',
      event_label: button_name,
      section,
    });
  }
};

// Track WhatsApp clicks
export const trackWhatsAppClick = () => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'click', {
      event_category: 'contact',
      event_label: 'whatsapp_click',
      transport_type: 'beacon',
    });
  }
};

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'scroll', {
      event_category: 'engagement',
      event_label: `${depth}%`,
      value: depth,
    });
  }
};

// Track section views (intersection observer)
export const trackSectionView = (section_name: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'view_item', {
      event_category: 'engagement',
      event_label: `section_${section_name}`,
    });
  }
};

// Initialize scroll depth tracking
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  const thresholds = [25, 50, 75, 90];

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      // Track when user reaches certain thresholds
      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && maxScroll >= threshold) {
          trackScrollDepth(threshold);
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Meta Pixel tracking
export const initMetaPixel = (pixelId: string) => {
  if (typeof window === 'undefined') return;

  // Meta Pixel code
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  (window as any).fbq('init', pixelId);
  (window as any).fbq('track', 'PageView');
};

// Track Meta Pixel events
export const trackMetaEvent = (eventName: string, parameters?: object) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, parameters);
  }
}; 