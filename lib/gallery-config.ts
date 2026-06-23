export interface GalleryImage {
  src: string;        // Path to the uploaded image, e.g., '/images/gallery/my-image.webp'
  category: string;   // Category label, e.g., 'Academic Life'
  title: string;      // Title of the photograph
  description: string; // Brief description/story of the moment
  caption?: string;   // Optional caption/quote for the moment
  span?: "wide" | "tall" | "normal"; // Optional masonry span hint
}

export interface GallerySectionConfig {
  hero: GalleryImage;
  academicLife: {
    featured: GalleryImage;
    supporting: GalleryImage[];
  };
  scholarMoments: GalleryImage[];
  campusLife: {
    hostel: GalleryImage;
    peerStudy: GalleryImage;
    library: GalleryImage;
    creative: GalleryImage;
  };
  eventsConferences: {
    featuredOne: GalleryImage;
    featuredTwo: GalleryImage;
    supportingOne: GalleryImage;
    supportingTwo: GalleryImage;
  };
  legacyArchive: {
    featuredPanorama: GalleryImage;
    photos: GalleryImage[];
  };
  heritageTimeline: {
    year: string;
    badge: string;
    src: string;
    title: string;
    description: string;
  }[];
  communityImpact: {
    introTitle: string;
    introParagraphs: string[];
    images: GalleryImage[];
  };
}

export const GALLERY_CONFIG: GallerySectionConfig = {
  // SECTION 1 — Hero Introduction
  hero: {
    src: "/images/gellarybgbdr.webp", // Default cover background
    category: "Campus Heritage",
    title: "Badrulhuda Chronicle",
    description: "An immersive digital archive documenting the life, heritage, scholarship, and community impact of Badrulhuda Academy. Click any frame to read its story."
  },
  
  // SECTION 2 — Academic Life (Dars, Hifz, Arabic, Integrated Studies)
  academicLife: {
    featured: {
      src: "/images/gallery/20240601_165704.webp",
      category: "Academic Life",
      title: "Beginning a New Chapter",
      description: "The academic year commences with guidance from respected scholars, welcoming students into a journey of learning, character development, and Islamic scholarship."
    },
    supporting: [
      {
        src: "/images/gallery/program1_3.webp",
        category: "Hifz Program",
        title: "Hifz Batch Inauguration",
        description: "The new Hifz batch begins its journey under the guidance of respected scholars and teachers, embarking on a path of Quran memorization, discipline, and spiritual growth."
      },
      {
        src: "/images/gallery/bdr_maulid.webp",
        category: "Academic Life",
        title: "Weekly Badr Maulid Gathering",
        description: "Every Sunday, students and scholars gather for the weekly Badr Maulid program, engaging in collective recitation, remembrance, and reflection on Islamic teachings. The gathering strengthens spiritual values, unity, and the rich scholarly traditions upheld at Badrulhuda Academy."
      },
      {
        src: "",
        category: "Integrated Studies",
        title: "Integrated Academic Classroom",
        description: "Nurturing future leadership by bridging modern sciences with comprehensive Islamic scholarship."
      }
    ]
  },
  
  // SECTION 3 — Scholar Moments (Founder, Teachers, Visiting Scholars, Assemblies)
  scholarMoments: [
    {
      src: "/images/gallery/qasdhgvbjjn_full.webp",
      category: "Scholar Moments",
      title: "Knowledge, Care & Guidance",
      description: "From the inauguration of the Thajul Ulama Library & Research Centre to moments of personal care between scholars and students, Badrulhuda reflects a tradition where knowledge is accompanied by compassion, mentorship, and character building."
    },
    {
      src: "/images/gallery/grand_mufti_visit.webp",
      category: "Scholar Guidance",
      title: "Meeting the Grand Mufti of India",
      description: "Students of Badrulhuda Academy had the honor of meeting and receiving guidance from the esteemed Grand Mufti of India, gaining inspiration from his wisdom, scholarship, and lifelong service to the Muslim community."
    },
    {
      src: "/images/gallery/honoring_guest.webp",
      category: "Scholar Moments",
      title: "Honoring a Distinguished Guest",
      description: "Students and faculty gathered to honor a distinguished guest whose contributions and guidance continue to inspire the academic and spiritual growth of the Badrulhuda community."
    },
    {
      src: "",
      category: "Scholar Moments",
      title: "Recitation Assessment Panel",
      description: "Experienced scholars evaluating and grading student Quranic recitation during assessments."
    }
  ],

  // SECTION 4 — Campus Life (Hostel, Study, Library, Activities)
  campusLife: {
    hostel: {
      src: "/images/gallery/hifz_trip.webp",
      category: "Campus Life",
      title: "Hifz Students Educational & Recreational Trip",
      description: "A memorable outing for the Hifz students of Badrulhuda Academy, combining learning, brotherhood, and reflection amidst the natural beauty of Wayanad. Such experiences strengthen friendship, character, and the spirit of togetherness beyond the classroom."
    },
    peerStudy: {
      src: "/images/gallery/ramadan_iftar.webp",
      category: "Campus Life",
      title: "Ramadan Iftar Gathering",
      description: "Students gathered together for a blessed Iftar, sharing meals, prayers, and moments of gratitude during the holy month of Ramadan. The gathering reflects the spirit of brotherhood, unity, and spiritual growth that defines life at Badrulhuda Academy."
    },
    library: {
      src: "",
      category: "Campus Life",
      title: "Library & Research Archive",
      description: "Housing classical texts and reference archives, the library is a hub for research and academic exploration."
    },
    creative: {
      src: "/images/gallery/republic_day.webp",
      category: "Campus Life",
      title: "Republic Day Flag Hoisting Ceremony",
      description: "Students and faculty gathered in unity for the national flag hoisting ceremony, reflecting the values of discipline, patriotism, and responsible citizenship within the Badrulhuda Academy community."
    }
  },

  // SECTION 5 — Events & Conferences (Conference Hall, Competitions, Annual Events)
  eventsConferences: {
    featuredOne: {
      src: "/images/gallery/rendezvous_25.webp",
      category: "Events & Conferences",
      title: "Rendezvous 25 – Badrulhuda Festival",
      description: "A vibrant gathering of scholars, students, and distinguished guests during Rendezvous 25, celebrating learning, creativity, leadership, and the spirit of academic excellence at Badrulhuda Academy."
    },
    featuredTwo: {
      src: "/images/gallery/meelad_conference.webp",
      category: "Events & Conferences",
      title: "Celebrating Faith, Knowledge & Prophetic Values",
      description: "Students, scholars, and community members gathered for the annual Meelad Conference, a special program dedicated to reflecting on the life, teachings, and noble character of Prophet Muhammad ﷺ. Through recitations, speeches, and scholarly discussions, the event strengthened spiritual awareness and Islamic values among participants."
    },
    supportingOne: {
      src: "/images/gallery/hubbu_rasool_conference.webp",
      category: "Events & Conferences",
      title: "Hubbu Rasool Conference 2025 — Voices of Faith and Solidarity",
      description: "A grand spiritual gathering celebrating Hubbu Rasool Conference 2025, bringing together scholars, students, and community members in a shared reflection of faith, devotion, and collective solidarity."
    },
    supportingTwo: {
      src: "/images/gallery/annur_program.webp",
      category: "Events & Conferences",
      title: "An-Nur Program – Rabi' al-Awwal Gathering",
      description: "As part of the blessed month of Rabi' al-Awwal, students and scholars gathered for the An-Nur Program, presenting recitations, speeches, and reflections on the life and teachings of Prophet Muhammad ﷺ. The event fostered spiritual growth, love for the Prophet, and a deeper understanding of Islamic values."
    }
  },

  // SECTION 6 — Legacy in Pictures (Historical Photo Archive)
  legacyArchive: {
    featuredPanorama: {
      src: "/images/gallery/grand_mufti_keynote.webp",
      category: "Legacy",
      title: "Grand Mufti of India Keynote Address",
      caption: "Grand Mufti of India, A. P. Aboobacker Musliyar, delivering a keynote address at a major scholarly gathering hosted by Badrulhuda Academy.",
      description: "Over the years, Badrulhuda Academy has had the honor of welcoming renowned scholars and spiritual leaders. This memorable occasion features Grand Mufti of India, A. P. Aboobacker Musliyar, addressing scholars, students, and community members, reflecting the academy's enduring commitment to Islamic scholarship and guidance.",
      span: "wide"
    },
    photos: [
      {
        src: "/images/gallery/memorable_hubbur_rasool.webp",
        category: "Legacy",
        title: "Memorable Hubbur Rasool Conference",
        caption: "A memorable moment from the Hubbur Rasool Conference, bringing together scholars, students, and community members in celebration of love and reverence for the Prophet ﷺ.",
        description: "This historic gathering stands among the cherished memories of Badrulhuda Academy. The Hubbur Rasool Conference welcomed distinguished scholars, including Khalel Thangal, whose presence and guidance enriched the spiritual and educational atmosphere of the institution. Such events reflect the academy's long-standing commitment to nurturing faith, scholarship, and community values.",
        span: "normal"
      },
      {
        src: "/images/gallery/bafaqi_thangal_visit.webp",
        category: "Legacy",
        title: "Visit of Sayyid Ali Bafaqi Thangal",
        caption: "A cherished moment as Sayyid Ali Bafaqi Thangal visited Badrulhuda Academy, offering prayers and blessings alongside scholars, students, and community members.",
        description: "This memorable gathering reflects an important chapter in the history of Badrulhuda Academy. The visit of Bafaqi Thangal brought together scholars, students, and well-wishers in a moment of prayer, unity, and spiritual reflection. Such visits by respected leaders continue to inspire the academy's mission of faith, education, and community service.",
        span: "normal"
      },
      {
        src: "/images/gallery/muhammed_faizi_address.webp",
        category: "Legacy",
        title: "Address by C. Muhammed Faizi Usthad",
        caption: "A memorable moment from one of Badrulhuda Academy's historic programs, featuring an inspiring address by C. Muhammed Faizi Usthad before scholars, students, and community members.",
        description: "This archival photograph captures a significant gathering in the history of Badrulhuda Academy. The program featured a keynote speech by C. Muhammed Faizi Usthad, whose words inspired students and attendees alike. Such events played an important role in shaping the academy's scholarly environment and strengthening its tradition of Islamic learning and community engagement.",
        span: "normal"
      },
      {
        src: "/images/gallery/shreyams_kumar_visit.webp",
        category: "Legacy",
        title: "Visit of M.V. Shreyams Kumar",
        caption: "A memorable moment as M.V. Shreyams Kumar visited Badrulhuda Academy and was warmly welcomed by the academy leadership.",
        description: "This special visit marks an important moment in Badrulhuda Academy's journey. The academy had the privilege of welcoming M.V. Shreyams Kumar, fostering meaningful interactions and strengthening relationships with leaders from various sectors of society. Such occasions reflect the academy's growing engagement with the wider community and its commitment to dialogue, education, and social development.",
        span: "normal"
      },
      {
        src: "/images/gallery/rahul_gandhi_visit.webp",
        category: "Legacy",
        title: "Welcoming Shri Rahul Gandhi",
        caption: "A memorable moment as the representatives of Badrulhuda Academy welcomed and honored Shri Rahul Gandhi.",
        description: "Representatives of Badrulhuda Academy had the opportunity to welcome and honor Shri Rahul Gandhi, highlighting the institution's commitment to meaningful civic engagement, dialogue, and community leadership.",
        span: "normal"
      },
      {
        src: "/images/gallery/grand_mufti_visit.webp",
        category: "Legacy",
        title: "Meeting the Grand Mufti of India",
        caption: "A cherished meeting as students of Badrulhuda Academy received guidance from the Grand Mufti of India.",
        description: "Students of Badrulhuda Academy had the honor of meeting and receiving guidance from the esteemed Grand Mufti of India, gaining inspiration from his wisdom, scholarship, and lifelong service to the Muslim community.",
        span: "normal"
      }
    ]
  },

  // SECTION 6 (kept for backward compat) — Heritage Timeline
  heritageTimeline: [
    {
      year: "2004",
      badge: "Academy Foundation",
      src: "",
      title: "Panamaram Establishment",
      description: "Badrulhuda Academy was established with a small circle of dedicated scholars to serve the community in Wayanad."
    },
    {
      year: "2010",
      badge: "Academic Extension",
      src: "",
      title: "Launch of Programs",
      description: "Introduction of integrated high-school curriculums and the launch of the dedicated Hifz memorization course."
    },
    {
      year: "2018",
      badge: "Campus Milestones",
      src: "",
      title: "Mosque & Hall Inauguration",
      description: "Inauguration of the beautiful central mosque and the academic conference hall."
    },
    {
      year: "Present",
      badge: "Community Leadership",
      src: "",
      title: "Modern Outreach & Service",
      description: "Graduation of hundreds of scholars, and expanding community charity, outreach, and leadership projects."
    }
  ],

  // SECTION 7 — Community Impact (Outreach, Charity)
  communityImpact: {
    introTitle: "Community Impact & Public Service",
    introParagraphs: [
      "Badrulhuda Academy takes pride in developing active community leaders. Our outreach initiatives bridge scholarship and service, ensuring our students apply their learning for social good.",
      "Through charity, local educational courses, and counseling, Badrulhuda continues to support Wayanad and serve as a pillar of community guidance."
    ],
    images: [
      {
        src: "/images/gallery/campus_collage.webp",
        category: "Community Impact",
        title: "Compassion in Action",
        description: "Every act of giving carries the power to transform lives. Through community welfare programs and charitable assistance, Badrulhuda Academy continues its mission of uplifting families, supporting children, and spreading the values of mercy, service, and social responsibility."
      },
      {
        src: "/images/gallery/service_collage.webp",
        category: "Community Impact",
        title: "Community Service & Humanitarian Outreach",
        description: "Badrulhuda Academy actively engages in welfare initiatives that support students, families, and underserved communities. Through educational sponsorships, relief assistance, and outreach programs, the academy strives to promote dignity, opportunity, and social responsibility."
      },
      {
        src: "/images/gallery/rahul_gandhi_visit.webp",
        category: "Community Impact",
        title: "Welcoming Shri Rahul Gandhi",
        description: "Representatives of Badrulhuda Academy had the opportunity to welcome and honor Shri Rahul Gandhi, highlighting the institution's commitment to meaningful civic engagement, dialogue, and community leadership."
      },
      {
        src: "/images/gallery/solidarity_collage_v2.webp",
        category: "Community Impact",
        title: "Voices of Solidarity and Responsibility",
        description: "A special address highlighting humanitarian awareness, community responsibility, and collective support during Operation Toofan."
      }
    ]
  }
};
