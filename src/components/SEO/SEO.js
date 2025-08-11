import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({
  meta_title,
  meta_description,
  meta_keywords,
  canonical_tag,
  og_type,
  og_title,
  og_description,
  og_url,
  og_site_name,
  og_image,
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ABDKS Solution Pvt. Ltd.",
    "url": "https://www.abdks.com/",
    "logo": "https://www.abdks.com/logo/abdkslogo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "01414511098",
      "contactType": "technical support",
      "contactOption": "TollFree",
      "areaServed": "IN"
    },
    "sameAs": [
      "https://www.instagram.com/abdks_7/",
      "https://x.com/ABDKS_01",
      "https://www.facebook.com/profile.php?id=61577777347946",
      "https://www.linkedin.com/company/108247246/admin/dashboard/",
      "https://www.abdks.com/"
    ]
  };

  return (
    <Helmet>
      <title>
        {meta_title ||
          "India's Trusted Bharat Bill Payment System (BBPS) Platform | Recharge & Bill Pay"}
      </title>
      <meta
        name="description"
        content={
          meta_description ||
          "Start your digital business with India’s most reliable Bharat Bill Payment System (BBPS) platform. Offer mobile recharge, electricity, gas & DTH bill payments. Enjoy instant settlements, 24/7 support & zero maintenance fees."
        }
      />
      <meta
        name="keywords"
        content={
          meta_keywords || "bbps, bbps services, bill pay, digital payment."
        }
      />

      <meta property="og:title" content={og_title || meta_title} />
      <meta
        property="og:description"
        content={og_description || meta_description}
      />
      <meta property="og:type" content={og_type || "website"} />
      <meta property="og:url" content={og_url || ""} />
      <meta property="og:image" content={og_image || ""} />
      <meta property="og:site_name" content={og_site_name || "ABDKS"} />

      {/* Canonical */}
      <link rel="canonical" href={canonical_tag || og_url} />

      {/* ✅ JSON-LD Schema properly inserted */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
