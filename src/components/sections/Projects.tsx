"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/effects/ScrollReveal";

type Project = {
  title: string;
  summary: string;
  tags: string[];
  link: string;
  region: string;
  type: string;
  platform: "Web" | "Android" | "IOS";
  company: string;
  metric: string;
  thumbnail: {
    src: string;
    alt: string;
    accent: string;
    previewUrl: string;
    fit?: "cover" | "contain";
    source: "Website" | "Google Play" | "App Store";
    appIcon?: string;
    developer?: string;
    rating?: string;
    downloads?: string;
    screenshots?: string[];
  };
};

const projects: Project[] = [
  {
    title: "Opus Virtual Offices",
    summary:
      "A premium business platform for addresses, live answering, and operational trust across hundreds of US locations.",
    tags: ["Platform", "Business services", "Web"],
    link: "https://www.opusvirtualoffices.com/",
    region: "United States",
    type: "Web Platform",
    platform: "Web",
    company: "Espirits Technologies Pvt Ltd.",
    metric: "650+ locations",
    thumbnail: {
      src: "https://www.opusvirtualoffices.com/affiliate-program-opus-landing.webp",
      alt: "Opus Virtual Offices website displayed on desktop and mobile devices",
      accent: "#8fc7ff",
      previewUrl: "opusvirtualoffices.com",
      fit: "cover",
      source: "Website",
    },
  },
  {
    title: "Finecart",
    summary:
      "A local marketplace app connecting neighborhood stores and customers with practical delivery flows.",
    tags: ["Marketplace", "React Native", "Mobile"],
    link: "https://play.google.com/store/apps/details?id=com.retail.center.io",
    region: "India",
    type: "Mobile App",
    platform: "Android",
    company: "Mufeed Products and Services Pvt Ltd.",
    metric: "10K+ downloads",
    thumbnail: {
      src: "https://play-lh.googleusercontent.com/E6TXN3xEHMIgeqCxp7pAU1oc6pb0cu_90T28qH_JrkUyMUnKfhORyyBBILpI21MOPL9LDr3h_IMZCA933izq=w526-h296",
      alt: "Finecart app preview screenshot from Google Play",
      accent: "#7fe0c3",
      previewUrl: "play.google.com/store/apps/details?id=com.retail.center.io",
      fit: "cover",
      source: "Google Play",
      appIcon:
        "https://play-lh.googleusercontent.com/ruyna5mOB07VZLWc2PTtQpzB8p5Jx_eFsD1wFZZduGt5pnxLnKDfA1UkFUgf2XpiEAUnMiAkZNAkC73t_cdIqw=s0-br30",
      developer: "Finecart",
      rating: "4.2",
      downloads: "10K+",
      screenshots: [
        "https://play-lh.googleusercontent.com/E6TXN3xEHMIgeqCxp7pAU1oc6pb0cu_90T28qH_JrkUyMUnKfhORyyBBILpI21MOPL9LDr3h_IMZCA933izq=w526-h296",
        "https://play-lh.googleusercontent.com/GY-iMtnxp7fD92l-3hwSvrxE24AVbR9AGBFC0FSzY1sq_UYgqP2zRrfbniVhitdgO6rsebRwfyexkXTve_8ycw=w526-h296",
        "https://play-lh.googleusercontent.com/z7oVDCTPUwDMZl9RtZTUJTE1LYmeCvZZfVBGzwZcbgqmaOtRvHxFSMtZg8f7IcWrIBZ66LDPsNA2lyvm_tFRUYQ=w526-h296",
        "https://play-lh.googleusercontent.com/k-filSuRM-VZfzu3eB9-uz_KmzqWJW3gPfoDfNvA9xriCs8pPxyh5_lrM8iYNwC5rF481pSUL-6JwyytjKcY=w526-h296",
      ],
    },
  },
  {
    title: "Finecart",
    summary:
      "An iOS shopping app for pincode-based ecommerce with easy checkout and payment options.",
    tags: ["Shopping", "Ecommerce", "IOS"],
    link: "https://apps.apple.com/in/app/finecart/id6462674750",
    region: "India",
    type: "Shopping App",
    platform: "IOS",
    company: "Mufeed Products and Services Pvt Ltd.",
    metric: "3.7 rating",
    thumbnail: {
      src: "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/5a/28/f8/5a28f80a-3279-9227-5100-c95ba654e812/3068028c-8ffe-4401-949c-346382aceb4a_Simulator_Screenshot_-_iPhone_8_Plus_-_2023-08-18_at_16.44.16.png/392x696bb.png",
      alt: "Finecart iOS app preview screenshot from the App Store",
      accent: "#7fe0c3",
      previewUrl: "apps.apple.com/in/app/finecart/id6462674750",
      source: "App Store",
      appIcon:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/45/3b/67/453b67ad-b856-70f6-5ec7-3a8449b12b4e/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/512x512bb.jpg",
      developer: "Mohammad Mufeez Ahmed",
      rating: "3.7",
      downloads: "9 ratings",
      screenshots: [
        "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/5a/28/f8/5a28f80a-3279-9227-5100-c95ba654e812/3068028c-8ffe-4401-949c-346382aceb4a_Simulator_Screenshot_-_iPhone_8_Plus_-_2023-08-18_at_16.44.16.png/392x696bb.png",
        "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/f2/62/47/f2624714-c315-27ef-e702-d6175e50109e/105e5bef-8003-480b-8b15-66967b32b543_Simulator_Screenshot_-_iPhone_8_Plus_-_2023-08-18_at_16.44.37.png/392x696bb.png",
        "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/58/97/12/58971201-4e07-80a0-8484-56b331613823/c5407fe1-850d-4060-b583-1b4887ff427b_Simulator_Screenshot_-_iPhone_8_Plus_-_2023-08-18_at_16.45.16.png/392x696bb.png",
        "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/69/16/a1/6916a108-1367-f55c-a29c-7ea9b79d1f09/a7a63c0d-8127-4874-b2b3-1ff811080830_Simulator_Screenshot_-_iPhone_8_Plus_-_2023-08-18_at_16.45.58.png/392x696bb.png",
      ],
    },
  },
  {
    title: "HOPP COMPANY",
    summary:
      "An on-demand driver booking app for hourly personal chauffeurs, round trips, one-way trips, airport pickups, shopping, events, and night-out travel.",
    tags: ["On-demand drivers", "Travel & Local", "Customer app"],
    link: "https://play.google.com/store/apps/details?id=com.Revalsys.warantech.HoppCustomer",
    region: "Hyderabad, India",
    type: "Customer Booking App",
    platform: "Android",
    company: "Revalsys Technologies Pvt Ltd.",
    metric: "10K+ downloads",
    thumbnail: {
      src: "https://play-lh.googleusercontent.com/xyskAwNunUCiHz4iht1QJI7zYN4ZWk-aP6wZ5V4AFN7MT1VE4i221V8-jv0bx2wIT4Ml9lXBkNMAOQ6k9Z7XkA",
      alt: "HOPP COMPANY customer app preview screenshot from Google Play",
      accent: "#f7b267",
      previewUrl: "play.google.com/store/apps/details?id=com.Revalsys.warantech.HoppCustomer",
      fit: "cover",
      source: "Google Play",
      appIcon:
        "https://play-lh.googleusercontent.com/nBOZKLvXYbvxGQO4i43LeHp9PSyZOfTuHH0l7FRG76TJrzZ9CCcODqloRrT4NSokwpcS64KKsjpNp7q6dFv8",
      developer: "Disrupt Transportation Services Pvt Ltd",
      rating: "4.1",
      downloads: "10K+",
      screenshots: [
        "https://play-lh.googleusercontent.com/xyskAwNunUCiHz4iht1QJI7zYN4ZWk-aP6wZ5V4AFN7MT1VE4i221V8-jv0bx2wIT4Ml9lXBkNMAOQ6k9Z7XkA",
        "https://play-lh.googleusercontent.com/SU2uVe-AJM4GwEYB5lM48nuJL9_pTNnKXUPMps8-XtaioChcLPMKPhW5cg_1jlCfG7IlObG75etGslDWxqte",
        "https://play-lh.googleusercontent.com/FClW9cmH0ubzQGqd2yfDd6c4K1-hShlcRCH6_cR_xrBeGG51AID6Md4xlN_GWHrphfSsLXDIphTRuRRtNzSCTkM",
        "https://play-lh.googleusercontent.com/BQQHpb961fE-B7VsKOhYvnB51yV0cawCCNRog28A-rlKePdthravE3jrwE5kfN8dZ-yBi6kiFCQS-MdjcEhP",
      ],
    },
  },
  {
    title: "HOPP COMPANY",
    summary:
      "The iOS HOPP customer app for on-demand driver booking, hourly chauffeurs, round trips, one-way trips, and doorstep driver access.",
    tags: ["On-demand drivers", "Travel", "IOS"],
    link: "https://apps.apple.com/in/app/hopp-company/id1527763771",
    region: "Hyderabad, India",
    type: "Customer Booking App",
    platform: "IOS",
    company: "Revalsys Technologies Pvt Ltd.",
    metric: "4.6 rating",
    thumbnail: {
      src: "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/d7/03/59/d7035919-a6df-7339-cf84-75955eeb7941/4d179d47-975d-477f-9b87-27b9865e944c_1.jpg/392x696bb.jpg",
      alt: "HOPP COMPANY iOS app preview screenshot from the App Store",
      accent: "#f7b267",
      previewUrl: "apps.apple.com/in/app/hopp-company/id1527763771",
      source: "App Store",
      appIcon:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/3f/b4/d6/3fb4d6f4-7130-0849-b8e9-9e84838de4a2/AppIcon-0-0-1x_U007epad-0-10-0-85-220.png/512x512bb.jpg",
      developer: "Disrupt Transportation Services Pvt Ltd",
      rating: "4.6",
      downloads: "33 ratings",
      screenshots: [
        "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/d7/03/59/d7035919-a6df-7339-cf84-75955eeb7941/4d179d47-975d-477f-9b87-27b9865e944c_1.jpg/392x696bb.jpg",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/21/ad/0e/21ad0e8a-0fbc-d112-8011-ffeac43372b5/efd2201d-eb93-41c0-8149-03d234b99d7a_1242x2208-2.png/392x696bb.png",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/d0/92/47/d092477a-843f-c6c6-e1be-0e173bcbd39c/bd0ef3c2-66b8-40c6-bf0e-ec49dfea7b90_1242x2208-3.png/392x696bb.png",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/e3/c7/a3/e3c7a391-25f7-a256-d9b2-5615dee27cf0/e2d82abb-23fe-4718-a2ce-768d896e6339_1242x2208-1.png/392x696bb.png",
      ],
    },
  },
  {
    title: "HOPP Partner",
    summary:
      "A driver partner app for full-time or part-time earning, GPS-tracked trips, transparent daily, weekly, and monthly earnings, and weekly settlements.",
    tags: ["Driver partner", "GPS tracking", "Weekly payouts"],
    link: "https://play.google.com/store/apps/details?id=com.Revalsys.warantech.HOPPDriver",
    region: "India",
    type: "Driver Partner App",
    platform: "Android",
    company: "Revalsys Technologies Pvt Ltd.",
    metric: "5K+ downloads",
    thumbnail: {
      src: "https://play-lh.googleusercontent.com/U7GfWeX-gKBQtDNXrTPn3lL-XS7KRDBuJ6z06Q-rJUlOmXSUJc-6bBJX1bhZC_yiSj04Jpp3gXgZQZFZtUUWa8Y",
      alt: "HOPP Partner driver app preview screenshot from Google Play",
      accent: "#f7b267",
      previewUrl: "play.google.com/store/apps/details?id=com.Revalsys.warantech.HOPPDriver",
      fit: "cover",
      source: "Google Play",
      appIcon:
        "https://play-lh.googleusercontent.com/ArTVlz9DN2Hbw5M7ilJgfzw1qpHyZAMIKT1VO80FM7E5NoID2xssR5ClEPN9xWx9sQDAA0JcVL59bFrVstOeIg",
      developer: "Disrupt Transportation Services Pvt Ltd",
      rating: "3.8",
      downloads: "5K+",
      screenshots: [
        "https://play-lh.googleusercontent.com/U7GfWeX-gKBQtDNXrTPn3lL-XS7KRDBuJ6z06Q-rJUlOmXSUJc-6bBJX1bhZC_yiSj04Jpp3gXgZQZFZtUUWa8Y",
        "https://play-lh.googleusercontent.com/Ozi9OVDkm5sMZovdRMU-hK68iKuPVcnkdorfnpw21JeurtSJlFoGoxT0M8gNzcK1mDmxPKZHUg57yxj7HZQ_sA",
        "https://play-lh.googleusercontent.com/nClr0w9OOKRM0nMFFOZoKj026O6QuDPbudK_jcTh0fsXSqqLNPoHipoyHbHod_6s4gnW-AxOugEbF-tGQRiz",
        "https://play-lh.googleusercontent.com/R7lUCXH0PtRtsJBuDLxIov1mW0t1QtT7B-pgiJbUSyUktBMYEJB1Py-Qgi-x-BBvd7yh0TvAtOBj5z8gZ02o7A",
      ],
    },
  },
  {
    title: "HOPP - Partner",
    summary:
      "The iOS HOPP partner app for driver workflows, trip handling, account visibility, and performance updates.",
    tags: ["Driver partner", "Travel", "IOS"],
    link: "https://apps.apple.com/in/app/hopp-partner/id1527779025",
    region: "India",
    type: "Driver Partner App",
    platform: "IOS",
    company: "Revalsys Technologies Pvt Ltd.",
    metric: "4.8 rating",
    thumbnail: {
      src: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/2b/99/64/2b996460-c3e3-f620-ae09-d893a25bc213/be4f6f29-3612-48a5-a12a-4faf1821542b_1.jpg/392x696bb.jpg",
      alt: "HOPP Partner iOS app preview screenshot from the App Store",
      accent: "#f7b267",
      previewUrl: "apps.apple.com/in/app/hopp-partner/id1527779025",
      source: "App Store",
      appIcon:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/2d/9e/51/2d9e519e-933c-91b9-ca68-f831fdb354ea/AppIcon-0-0-1x_U007epad-0-10-0-85-220.png/512x512bb.jpg",
      developer: "Disrupt Transportation Services Pvt Ltd",
      rating: "4.8",
      downloads: "6 ratings",
      screenshots: [
        "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/2b/99/64/2b996460-c3e3-f620-ae09-d893a25bc213/be4f6f29-3612-48a5-a12a-4faf1821542b_1.jpg/392x696bb.jpg",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/0a/93/7d/0a937ded-12d7-262f-027b-0bebf8e25b36/25077654-36e5-412b-a371-2accb7564240_1242x2208-menu.png/392x696bb.png",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/dc/83/6e/dc836edb-e216-3859-5af0-07aca6bc4f6a/b2a97750-f3f0-499b-bac7-fd8de95c2696_1242x2208-onduty.png/392x696bb.png",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/4e/da/58/4eda589d-9e91-dd83-5133-021336d9782e/fc2f762f-3929-42ad-b2f0-6640588cc568_1242x2208-confirmride.png/392x696bb.png",
      ],
    },
  },
  {
    title: "HOPP COMPANY - Admin",
    summary:
      "A partner administration platform for organizations collaborating with HOPP COMPANY, supporting operational access for partner workflows.",
    tags: ["Admin app", "Partner platform", "Operations"],
    link: "https://play.google.com/store/apps/details?id=com.hoppadmin",
    region: "India",
    type: "Admin Operations App",
    platform: "Android",
    company: "Revalsys Technologies Pvt Ltd.",
    metric: "50+ downloads",
    thumbnail: {
      src: "https://play-lh.googleusercontent.com/Vc695YWsbcXaN3B9jFtbG477XysLjp1QJKDwfnOrF5D9cKUK2q_gnzUWr2P8dvxdCIHMaE5EY-Zq26bqyHIhaw",
      alt: "HOPP COMPANY Admin app preview screenshot from Google Play",
      accent: "#8fc7ff",
      previewUrl: "play.google.com/store/apps/details?id=com.hoppadmin",
      fit: "cover",
      source: "Google Play",
      appIcon:
        "https://play-lh.googleusercontent.com/PLDgGrdtrZEFBnOHP-dF7wWJt-JOI0X6lEMob-omerVYEnbH3aFUAtvHFRW6FMj7HqOJmzfsHfCWgC8b3Tyxcro",
      developer: "Disrupt Transportation Services Pvt Ltd",
      rating: "New",
      downloads: "50+",
      screenshots: [
        "https://play-lh.googleusercontent.com/Vc695YWsbcXaN3B9jFtbG477XysLjp1QJKDwfnOrF5D9cKUK2q_gnzUWr2P8dvxdCIHMaE5EY-Zq26bqyHIhaw",
        "https://play-lh.googleusercontent.com/1etpluYUZkdN5fqNd2c4V-n3mp7Tv8MqXu_1Wc5t7mOIYcxdjvN-EeO3TsVEC8yALoPYSLctznvj9ll6EzDfKQ",
        "https://play-lh.googleusercontent.com/Tke3Yw12G4BvS7KXXXtEUs6y4JRIb6RkmqS-fZiXat2XMpDvCSKeQvKhf_FhEeN2MCm6ebVLCbkbKXU2VH-ong",
        "https://play-lh.googleusercontent.com/u5rDng4hYdRSM14Tfv5ANRkDk4-F3PJkGwkFRFdqr-VVHNgxvuum70qu9PwCDfX-P6EJsrtBuJBspS5jfacJ",
      ],
    },
  },
  {
    title: "RevalOmni Dashboard",
    summary:
      "A business monitoring interface for sales, inventory, and operating visibility across retail workflows.",
    tags: ["Dashboard", "Analytics", "Operations"],
    link: "https://play.google.com/store/apps/details?id=com.masterwsi",
    region: "India",
    type: "Operations UI",
    platform: "Android",
    company: "Revalsys Technologies Pvt Ltd.",
    metric: "Retail visibility",
    thumbnail: {
      src: "https://play-lh.googleusercontent.com/2JLmGumfsvm5gDfKHmRS1A3j75jQ4prQDckID9pC-BRaLQVIwahGY84TdBHVm8lrKX093Uml9ReFqzQEElHG=w526-h296",
      alt: "RevalOmni Dashboard app preview screenshot from Google Play",
      accent: "#c4a7ff",
      previewUrl: "play.google.com/store/apps/details?id=com.masterwsi",
      fit: "cover",
      source: "Google Play",
      appIcon:
        "https://play-lh.googleusercontent.com/rRWTjV9aG9i1ztMB0AAyJOM4uhrz1Ij3WI6_8_M5T1QoCfI1AMPEIZzc1Qxiv2UIVq-pyqkWvXq4qrxpKuYF4w=s0-br30",
      developer: "Revalsys Technologies",
      rating: "4.0",
      downloads: "Retail",
      screenshots: [
        "https://play-lh.googleusercontent.com/2JLmGumfsvm5gDfKHmRS1A3j75jQ4prQDckID9pC-BRaLQVIwahGY84TdBHVm8lrKX093Uml9ReFqzQEElHG=w526-h296",
        "https://play-lh.googleusercontent.com/SH_09FSQDt8V3busd4rmEDQ-_RuifhhURRhxNgff6r_WKOY_Jpr-WwMgUupwkKR00QvsFQH6994ukdmz3I6H=w526-h296",
        "https://play-lh.googleusercontent.com/pwM4R5mbbsqjZG6GoDv7qCQRdUD3d-8ACO6S38u-jYD5bridaVNCzVLxyIhGlIRTjtKrNQWacarJtuKVVl_d=w526-h296",
      ],
    },
  },
  {
    title: "Revalsys Authenticator",
    summary:
      "A security-focused utility for two-factor authentication and secure notifications in internal systems.",
    tags: ["Security", "2FA", "Biometrics"],
    link: "https://play.google.com/store/apps/details?id=com.revalnotification",
    region: "India",
    type: "Security Utility",
    platform: "Android",
    company: "Revalsys Technologies Pvt Ltd.",
    metric: "100+ downloads",
    thumbnail: {
      src: "https://play-lh.googleusercontent.com/MQJhsMZ1kxxRQiF3uqfZjyvTwn4Afa-XY5qoAfJydl9aS15oNXOb51YaoU8CNjaArQHDa3J6bIeEXXmI88HJ=w526-h296",
      alt: "Revalsys Authenticator app preview screenshot from Google Play",
      accent: "#ff9f6e",
      previewUrl: "play.google.com/store/apps/details?id=com.revalnotification",
      fit: "cover",
      source: "Google Play",
      appIcon:
        "https://play-lh.googleusercontent.com/F7Vjy8Yclap8UW0W-r8-n3sXDAa8BCs4YMRH-39IJ8eUccA6jhF6yj1N7275h3UKmRFcGX-aPnZXCN0gmq2L=s0-br30",
      developer: "Revalsys Technologies",
      rating: "4.0",
      downloads: "100+",
      screenshots: [
        "https://play-lh.googleusercontent.com/MQJhsMZ1kxxRQiF3uqfZjyvTwn4Afa-XY5qoAfJydl9aS15oNXOb51YaoU8CNjaArQHDa3J6bIeEXXmI88HJ=w526-h296",
        "https://play-lh.googleusercontent.com/__2Kgrizh5CXkBtNGo9ENSWrMTLljgy5cDXcN-9yFJz_K2y9MMCHCCW4yOv2fIvRmos_E1u63MPeJg39s3e6Yw=w526-h296",
        "https://play-lh.googleusercontent.com/mEwunu-aQIPqkUnYzkxXA4N1U_TP2z_E_zZeFhqE2nroXF9UCp9r-N1AY5c0EYn_9HxXuhUpdd0qx2e58tsqCA=w526-h296",
      ],
    },
  },
  {
    title: "Reval ESS",
    summary:
      "An Android employee self-service app for daily attendance, work task sheets, onboarding, HRMS workflows, leave planning, and project tracking.",
    tags: ["HRMS", "Attendance", "Android"],
    link: "https://play.google.com/store/apps/details?id=com.revaless",
    region: "India",
    type: "HRMS Utility",
    platform: "Android",
    company: "Revalsys Technologies Pvt Ltd.",
    metric: "500+ downloads",
    thumbnail: {
      src: "https://play-lh.googleusercontent.com/kY9PiqF9d224lRkHlS42GNBXBTcfpKhXE4-F3AfndohIVNdHmPaHoa-Q9rN9RzIypjNwEJydlYf_TliSKMwyiA=w526-h296",
      alt: "Reval ESS Android app preview screenshot from Google Play",
      accent: "#c4a7ff",
      previewUrl: "play.google.com/store/apps/details?id=com.revaless",
      fit: "cover",
      source: "Google Play",
      appIcon:
        "https://play-lh.googleusercontent.com/7QlbFI0SA7iU0o0OwPD3905nSpYWK0bNmEWBIgaGWbcdE8PDdxCdTYxsM4-HP9WMb9JxBAoz1GzgbDVCzvU0y18=s0-br30",
      developer: "Revalsys Technologies India Private Limited",
      rating: "4.2",
      downloads: "500+",
      screenshots: [
        "https://play-lh.googleusercontent.com/kY9PiqF9d224lRkHlS42GNBXBTcfpKhXE4-F3AfndohIVNdHmPaHoa-Q9rN9RzIypjNwEJydlYf_TliSKMwyiA=w526-h296",
        "https://play-lh.googleusercontent.com/sKTLXEjj4xhOX8Z432BarkpoNf6oql0OjshduePdwzylmFg_s_dNpMN5eG22a-ZskhW5_IlrCAg1-ufLtJgGJA=w526-h296",
        "https://play-lh.googleusercontent.com/I-aWcGcMLaIkxPEKK2nvTGG-L6PsdECCHEidtLN3gnq5PF5ci7kdWC5kkqax4ycNKdTvxOMvKbydzLg3VIZKow=w526-h296",
        "https://play-lh.googleusercontent.com/IQk2DkWDlkft0Nrja4MFrCd85IwLPRV1Foy4OSDYIslrijlrhlnS1SKNKe17ajM4fVWXBkMr6yJEJ8i-KcKKjQ=w526-h296",
      ],
    },
  },
  {
    title: "Revalsys-Authenticator",
    summary:
      "An iOS productivity utility for secure logins with time-based one-time passwords delivered through the Revalsys Authenticator app.",
    tags: ["Security", "TOTP", "IOS"],
    link: "https://apps.apple.com/in/app/revalsys-authenticator/id6737756995",
    region: "India",
    type: "Security Utility",
    platform: "IOS",
    company: "Revalsys Technologies Pvt Ltd.",
    metric: "Productivity",
    thumbnail: {
      src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/b2/a0/99/b2a0997a-9959-9d62-a7e7-de859543d4eb/6.7a_U0302_U0080_U009d_Display_-page-1.jpg/320x480bb.jpg",
      alt: "Revalsys Authenticator iOS app preview screenshot from the App Store",
      accent: "#ff9f6e",
      previewUrl: "apps.apple.com/in/app/revalsys-authenticator/id6737756995",
      source: "App Store",
      appIcon:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/eb/06/92/eb0692a2-84f6-0d48-96d2-a969c26406b7/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg",
      developer: "REVALSYS TECHNOLOGIES (INDIA) PRIVATE LIMITED",
      rating: "New",
      downloads: "Productivity",
      screenshots: [
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/b2/a0/99/b2a0997a-9959-9d62-a7e7-de859543d4eb/6.7a_U0302_U0080_U009d_Display_-page-1.jpg/320x480bb.jpg",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/c8/17/a4/c817a4ae-4276-f6a4-c394-696948935844/6.7a_U0302_U0080_U009d_Display_-page-3.jpg/320x480bb.jpg",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/ad/db/06/addb06e1-38b3-687d-d8b5-fb67ffc978b5/6.7a_U0302_U0080_U009d_Display_-page-4.jpg/320x480bb.jpg",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/f9/c1/2e/f9c12ecf-b80b-6027-9f5b-33601a7547ab/6.7a_U0302_U0080_U009d_Display_-page-2.jpg/320x480bb.jpg",
      ],
    },
  },
  {
    title: "RevalESS",
    summary:
      "An iOS employee self-service utility for location capture, grievance management, insurance tracking, overtime, performance review, and activity workflows.",
    tags: ["HRMS", "Utilities", "IOS"],
    link: "https://apps.apple.com/in/app/revaless/id6739558255",
    region: "India",
    type: "HRMS Utility",
    platform: "IOS",
    company: "Revalsys Technologies Pvt Ltd.",
    metric: "Utilities",
    thumbnail: {
      src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/3e/25/90/3e259080-18d1-50b8-32f5-88228a6abda4/shared_image__U00282_U0029.png/320x480bb.jpg",
      alt: "RevalESS iOS app preview screenshot from the App Store",
      accent: "#c4a7ff",
      previewUrl: "apps.apple.com/in/app/revaless/id6739558255",
      source: "App Store",
      appIcon:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2d/cc/b6/2dccb640-0a3f-9d1d-0048-b1757a185c3c/AppIcon-0-0-1x_U007emarketing-0-7-0-sRGB-85-220.png/512x512bb.jpg",
      developer: "REVALSYS TECHNOLOGIES (INDIA) PRIVATE LIMITED",
      rating: "New",
      downloads: "Utilities",
      screenshots: [
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/3e/25/90/3e259080-18d1-50b8-32f5-88228a6abda4/shared_image__U00282_U0029.png/320x480bb.jpg",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/1f/26/79/1f2679c8-cb5a-5a04-3013-bd12ef58f6f3/shared_image__U00281_U0029.png/320x480bb.jpg",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/13/c4/91/13c491bd-860c-2018-06e6-90b188714294/shared_image__U00286_U0029.png/320x480bb.jpg",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/a5/a1/bc/a5a1bc98-8b77-06a4-ab80-314d36aecdd4/shared_image__U00285_U0029.png/320x480bb.jpg",
      ],
    },
  },
  {
    title: "Trusterra-Partner",
    summary:
      "An iOS field operations app for EV dealer partners to onboard dealerships, verify documents, book FOS visits, inspect vehicles, and manage dealer inventory.",
    tags: ["EV operations", "Business", "IOS"],
    link: "https://apps.apple.com/in/app/trusterra-partner/id6748809106",
    region: "India",
    type: "Field Operations App",
    platform: "IOS",
    company: "Revalsys Technologies Pvt Ltd.",
    metric: "Business",
    thumbnail: {
      src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/93/3c/27/933c27d7-f0dd-cb8f-b226-8f7d62f9ed2c/image__U00283_U0029.png/392x696bb.png",
      alt: "Trusterra Partner iOS app preview screenshot from the App Store",
      accent: "#7fe0c3",
      previewUrl: "apps.apple.com/in/app/trusterra-partner/id6748809106",
      source: "App Store",
      appIcon:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/8e/d2/3e/8ed23e90-e901-7a8b-2b5e-15ae2d21254c/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
      developer: "REVALSYS TECHNOLOGIES (INDIA) PRIVATE LIMITED",
      rating: "New",
      downloads: "Business",
      screenshots: [
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/93/3c/27/933c27d7-f0dd-cb8f-b226-8f7d62f9ed2c/image__U00283_U0029.png/392x696bb.png",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/eb/ae/aa/ebaeaaf2-177e-9f30-14c6-1947cabd912e/IMG_4502_1242x2208.png/392x696bb.png",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/93/0b/98/930b9834-4c8c-cda6-1bc6-cef9219ab80c/IMG_4504_1242x2208.png/392x696bb.png",
      ],
    },
  },
  {
    title: "Pro 5 Networking",
    summary:
      "A professional networking product designed for events, attendee discovery, and structured engagement.",
    tags: ["Networking", "Events", "Mobile"],
    link: "https://play.google.com/store/apps/details?id=com.pro_v_networking",
    region: "United Kingdom",
    type: "Event App",
    platform: "Android",
    company: "Espirits Technologies Pvt Ltd.",
    metric: "People discovery",
    thumbnail: {
      src: "https://play-lh.googleusercontent.com/jd_hrq2Shq_IO2_Fq610-qdhbvNfTtN_xoUojTtKFb8yeOnkJdVcfpyO0t5Xk2mjZs0eAaKTMMkph3pnI6JpIw=w526-h296",
      alt: "Pro 5 Networking app preview screenshot from Google Play",
      accent: "#8fc7ff",
      previewUrl: "play.google.com/store/apps/details?id=com.pro_v_networking",
      fit: "cover",
      source: "Google Play",
      appIcon:
        "https://play-lh.googleusercontent.com/P1Mzwk2GwKYy99eLRSP_JZTSS9xJpdi3Ad0jraytb39owFr3-zfogY4cL4RED-wzWX9GGQnFTxsumoKOj-UT-_4=s0-br30",
      developer: "Espirits Technologies Pvt Ltd.",
      rating: "4.0",
      downloads: "Events",
      screenshots: [
        "https://play-lh.googleusercontent.com/jd_hrq2Shq_IO2_Fq610-qdhbvNfTtN_xoUojTtKFb8yeOnkJdVcfpyO0t5Xk2mjZs0eAaKTMMkph3pnI6JpIw=w526-h296",
        "https://play-lh.googleusercontent.com/_4_j_ukV4qbT5o2YeLybLCc556O06IGM9HPh0y3A7I9OPutiInBhpqU2CguaTvQEErAFbWV7JNU7OjlKX5DGBrI=w526-h296",
        "https://play-lh.googleusercontent.com/cLu3nobktlAUlxETkhP8v4elMMtvnk2LJoihpgsffbbgGZPFuqIstq0GNydSv0O9kerDdFkEzZZUSd4kUhrY=w526-h296",
      ],
    },
  },
  {
    title: "Pro 5 Networking",
    summary:
      "An iOS business app for golf groups, membership access, group chat, private messaging, guest invitations, and event participation.",
    tags: ["Networking", "Golf groups", "IOS"],
    link: "https://apps.apple.com/in/app/pro-5-networking/id6745877588",
    region: "United Kingdom",
    type: "Event App",
    platform: "IOS",
    company: "Espirits Technologies Pvt Ltd.",
    metric: "4.0 rating",
    thumbnail: {
      src: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/5f/a1/0e/5fa10efd-b16d-572e-8ab8-f73be306ac79/image-blue.png/320x480bb.jpg",
      alt: "Pro 5 Networking iOS app preview screenshot from the App Store",
      accent: "#8fc7ff",
      previewUrl: "apps.apple.com/in/app/pro-5-networking/id6745877588",
      source: "App Store",
      appIcon:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/fb/4c/3c/fb4c3c24-1691-3ab9-4294-8d89cd9ab610/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg",
      developer: "Espirits Technologies Pvt Ltd.",
      rating: "4.0",
      downloads: "1 rating",
      screenshots: [
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/5f/a1/0e/5fa10efd-b16d-572e-8ab8-f73be306ac79/image-blue.png/320x480bb.jpg",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/23/03/13/2303133f-06b5-5036-76d3-3042111aa916/pvn-new1.png/320x480bb.jpg",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/40/d6/17/40d6179c-bb11-233f-1e8b-6c5d5f6ac8f3/5.png/320x480bb.jpg",
        "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/3e/6f/c6/3e6fc6f6-1683-eb8b-8a4f-cf439eb2ce8f/3.png/320x480bb.jpg",
      ],
    },
  },
];

const companyOrder: Record<Project["company"], number> = {
  "Espirits Technologies Pvt Ltd.": 1,
  "Revalsys Technologies Pvt Ltd.": 2,
  "Mufeed Products and Services Pvt Ltd.": 3,
};

const orderedProjects = [...projects].sort(
  (a, b) => companyOrder[a.company] - companyOrder[b.company],
);

function StorePreview({ project }: { project: Project }) {
  const screenshots = project.thumbnail.screenshots?.length
    ? project.thumbnail.screenshots
    : [project.thumbnail.src];
  const isAppStore = project.thumbnail.source === "App Store";
  const storeName = isAppStore ? "App Store" : "Google Play";
  const storeAccent = isAppStore ? "#0a84ff" : "#00875f";
  const actionLabel = isAppStore ? "Get" : "Install";
  const secondaryLabel = isAppStore ? "Share" : "Share";

  return (
    <div className="flex aspect-4/3 min-h-110.5 flex-col overflow-hidden bg-[#f8fafd] text-[#202124] sm:aspect-16/16 sm:min-h-110.5">
      <div className="flex h-9 shrink-0 items-center gap-4 border-b border-[#dde2ea] bg-white px-4 text-[10px] text-[#5f6368] sm:text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-[#3c4043]">
          <span
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: project.thumbnail.accent }}
          />
          {storeName}
        </div>
        <span className="font-medium" style={{ color: storeAccent }}>
          Apps
        </span>
        <span className="hidden sm:inline">Games</span>
        <span className="hidden sm:inline">Books</span>
      </div>

      <div className="grid shrink-0 grid-cols-[1fr_auto] gap-3 px-4 pt-4 sm:gap-5 sm:px-6 sm:pt-5">
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold leading-tight text-[#202124] sm:text-3xl">
            {project.title}
          </p>
          <p className="mt-1 truncate text-xs font-semibold sm:text-sm" style={{ color: storeAccent }}>
            {project.thumbnail.developer ?? project.title}
          </p>

          <div className="mt-2 flex items-center gap-3 text-[#3c4043] sm:mt-3 sm:gap-5">
            <div>
              <p className="text-xs font-semibold sm:text-sm">
                {project.thumbnail.rating ?? "4.0"} star
              </p>
              <p className="text-[10px] text-[#5f6368]">Rating</p>
            </div>
            <div className="h-8 w-px bg-[#dde2ea]" />
            <div>
              <p className="text-xs font-semibold sm:text-sm">
                {project.thumbnail.downloads ?? project.metric.replace(" downloads", "")}
              </p>
              <p className="text-[10px] text-[#5f6368]">Downloads</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 sm:mt-4">
            <span
              className="rounded px-6 py-1.5 text-xs font-semibold text-white shadow-sm sm:px-10 sm:py-2 sm:text-sm"
              style={{ backgroundColor: storeAccent }}
            >
              {actionLabel}
            </span>
            <span className="hidden text-xs font-semibold sm:inline" style={{ color: storeAccent }}>
              {secondaryLabel}
            </span>
          </div>
        </div>

        {project.thumbnail.appIcon ? (
          <img
            src={project.thumbnail.appIcon}
            alt={`${project.title} app icon`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-14 w-14 rounded-[1rem] object-cover shadow-[0_12px_24px_rgba(60,64,67,0.2)] sm:h-24 sm:w-24 sm:rounded-[1.6rem]"
          />
        ) : null}
      </div>

      <div className="min-h-0 flex-1 px-4 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
        <div className="flex h-full items-end gap-2 overflow-hidden sm:gap-3">
        {screenshots.slice(0, 4).map((screenshot) => (
          <img
            key={screenshot}
            src={screenshot}
            alt={`${project.title} ${storeName} screenshot`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full max-h-[190px] min-h-[132px] w-[92px] shrink-0 rounded-lg border border-[#dde2ea] bg-white object-cover object-top shadow-sm sm:w-[124px]"
          />
        ))}
        </div>
      </div>
    </div>
  );
}

function ProjectThumbnail({ project }: { project: Project }) {
  return (
    <div
      className="relative overflow-hidden rounded-[1.35rem] border border-[var(--surface-border)] bg-[#07121b]"
      style={{
        boxShadow: `inset 0 0 0 1px ${project.thumbnail.accent}22, 0 20px 60px ${project.thumbnail.accent}18`,
      }}
    >
      <div className="flex h-11 items-center gap-3 border-b border-white/10 bg-[#23283a] px-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#111827] px-3 py-1.5">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: project.thumbnail.accent }}
          />
          <span className="truncate font-mono text-[10px] text-white/72">
            {project.thumbnail.previewUrl}
          </span>
        </div>
      </div>

      {project.thumbnail.source !== "Website" ? (
        <StorePreview project={project} />
      ) : (
        <div className="relative aspect-[16/9] overflow-hidden bg-[#eef1f5]">
          <div className="absolute inset-0 opacity-25 terrain-grid" />
          <img
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            className={`relative z-10 h-full w-full transition duration-500 group-hover:scale-[1.025] ${
              project.thumbnail.fit === "contain" ? "object-contain" : "object-cover"
            }`}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between bg-gradient-to-t from-black/72 to-transparent px-4 pb-3 pt-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/78">
              {project.thumbnail.source}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/78">
              {project.type}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_5%,color-mix(in_srgb,var(--color-accent)_14%,transparent),transparent_26%),radial-gradient(circle_at_86%_28%,color-mix(in_srgb,var(--color-secondary)_10%,transparent),transparent_22%)]" />
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal mode="inView" className="max-w-3xl">
          <p className="section-kicker">Projects</p>
          <h2 className="section-heading mt-4 text-[var(--color-text)]">
            Shipped products with real interfaces, not placeholder shots.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
            A company-wise collection of shipped web, Android, and iOS products,
            shown with real storefront and product interface previews.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {orderedProjects.map((project, index) => (
            <ScrollReveal
              key={project.link}
              mode="inView"
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.05}
            >
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8 }}
                className="story-card group block rounded-[1.8rem] p-4 sm:p-5"
              >
                <ProjectThumbnail project={project} />

                <div className="relative z-10 p-3 pt-5 sm:p-4 sm:pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-primary)]">
                      {project.region}
                    </p>
                    <span className="rounded-full border border-[var(--surface-border)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                      {project.platform} /{" "}
                      {project.metric}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold leading-tight text-[var(--color-text)] sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 font-mono text-[10px] tracking-[0.22em] text-amber-50">
                    Built at <strong className="text-[var(--color-primary)]">{project.company}</strong>
                  </p>
                  <p className="mt-4 leading-8 text-[var(--color-text-muted)]">
                    {project.summary}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--surface-border)] bg-[var(--control-bg)] px-3 py-1 text-xs text-[var(--color-text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--surface-border)] pt-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                      Live project
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-text)] transition-transform group-hover:translate-x-1">
                      View
                    </span>
                  </div>
                </div>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
