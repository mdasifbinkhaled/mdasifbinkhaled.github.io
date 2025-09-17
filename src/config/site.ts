type SiteLinks = {
  twitter: string
  github: string
  linkedin: string
  googleScholar: string
  cv: string
  orcid?: string
}

export type SiteConfig = {
  name: string
  shortName: string
  description: string
  url: string
  ogImage: string
  links: SiteLinks
  keywords: string[]
  author: string
  email: string
  phone: string
  address: string
}

export const siteConfig: SiteConfig = {
  name: "Md Asif Bin Khaled - Academic Portfolio",
  shortName: "Md Asif Bin Khaled", // Updated shortName
  description: "The professional academic portfolio of Md Asif Bin Khaled, Senior Lecturer & Researcher. Showcasing research in Explainable AI (XAI) and Multimodal AI (MMAI) for healthcare, teaching experience, publications, and grants. Open to PhD opportunities.",
  url: "https://mdasifbinkhaled.github.io",
  ogImage: "https://mdasifbinkhaled.github.io/images/og-image.png",
  links: {
    twitter: "https://twitter.com/yourusername", 
    github: "https://github.com/mdasifbinkhaled",
    linkedin: "https://linkedin.com/in/mdasifbinkhaled/",
    googleScholar: "https://scholar.google.com/citations?user=zpcFkLAAAAAJ",
    cv: "/cv/CV_Md Asif Bin Khaled.pdf"
  },
  keywords: [
    "Md Asif Bin Khaled",
    "Senior Lecturer",
    "Researcher",
    "academic portfolio",
    "research",
    "publications",
    "teaching",
    "experience",
    "computer science",
    "machine learning",
    "Explainable AI",
    "XAI",
    "Multimodal AI",
    "MMAI",
    "Computer Vision",
    "CV",
    "Healthcare AI",
    "PhD applicant",
    "IUB",
    "BRACU",
    "Bangladesh"
  ],
  author: "Md Asif Bin Khaled",
  email: "mdasifbinkhaled@gmail.com",
  phone: "(+88) 01676076329",
  address: "Bashundhara R/A, Dhaka - 1212, Bangladesh"
};