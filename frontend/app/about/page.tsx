"use client"

import { Button } from "@/components/ui/button"
import { Download, AtSign, Linkedin, Github, Twitter } from "lucide-react"
import Link from "next/link"
import { FadeIn, FadeInStagger } from "@/components/visual/motion-primitives"
import { TextEffect } from "@/components/motion-primitives/text-effect"

export default function AboutPage() {
  const aboutData = {
    title: "Ridwan Satria",
    subtitle: "MEng Student at The University of Tokyo",
    bio: `Graduate student with strong analytical and problem-solving capabilities in transportation planning and urban
policy. Research and internship experience developing data-driven policy recommendations for urban
development challenges in emerging markets.`,
    highlights: {
      education: [
        {
          institution: "The University of Tokyo",
          startDate: "Apr 2025",
          endDate: "Mar 2027",
          degree: "Master of Engineering, Civil Engineering",
          lab: "International Projects Lab",
          research:
            "Transportation planning, policy, and governance in emerging metropolises",
        },
        {
          institution: "Kyoto University",
          startDate: "Apr 2021",
          endDate: "Mar 2025",
          degree: "Bachelor of Engineering, Civil Engineering",
          lab: "Geoinformatics Lab",
          thesis:
            "Identifying areas vulnerable to Transit-Oriented Development-induced gentrification: Prospects for equitable TOD implementation in Jakarta.",
        },
      ],

      experience: [
        {
          company: "Oriental Consultants Global",
          role: "Transport Planning and ICT Intern",
          startDate: "Jun 2025",
          endDate: "present",
          details: [
            "Developed Python-based analysis tool to automate GPS probe data processing for 17+ bus lines, generating route adherence and schedule deviation reports for Maputo transit operations analysis.",
            "Researched and proposed data platform architecture recommendations for Bangkok traffic management project, comparing 3 solutions to streamline data sharing across 27 international research team members.",
            "Assisted in work plan development and project preparation for Manila's Intelligent Transportation Systems (ITS) implementation.",
          ],
        },
        {
          company: "Nikken Sekkei",
          role: "Urban Design Assistant (Part-time)",
          startDate: "Dec 2023",
          endDate: "present",
          details: [
            "Built web-based tool for aerial imagery and land use visualization using JavaScript, currently used by public space design team for TOD area analysis.",
            "Created 3D models and site analysis diagrams for public space design projects using SketchUp and Adobe Illustrator, supporting senior designers' client presentations.",
            "Conducted pedestrian and vehicle traffic counts at 5+ urban project sites, compiling data into analysis reports for design team review.",
          ],
        },
        {
          company: "Oriental Consultants Global",
          role: "Intern",
          startDate: "Sep 2023",
          endDate: "Sep 2023",
          details: [
            "Supported JUTPI 3 project team by developing TOD station area concept plans using QGIS for spatial analysis and visualization.",
            "Researched and proposed Non-Motorized Transportation mobility management strategies based on international best practices.",
          ],
        },
      ],

      awards: [
        {
          title: "YUPN Best Paper Presentation Award",
          year: "2025",
          organization:
            "International Conference of Asia-Pacific Planning Societies",
        },
        {
          title: "MEXT Scholarship",
          year: "2021",
          organization:
            "Ministry of Education, Culture, Sports and Technology, Japan",
        },
        {
          title: "Silver Medalist, National Science Olympiad - Geography",
          year: "2019",
          organization:
            "Ministry of Education and Culture, Indonesia",
        },
      ],

      skills: {
        languages: ["English", "Indonesian", "Japanese"],
        programming: ["Python", "R", "SQL", "JavaScript"],
        software: [
          "QGIS",
          "VISSIM",
          "Illustrator",
          "AutoCAD",
          "SketchUp",
          "Microsoft Office",
        ],
      },

      interests: [
        "Transport Systems",
        "Digital Governance",
        "International Development Policy",
        "Grand Strategy Gaming",
        "Hiking",
      ],
    },
  }

  const { title, subtitle, bio, highlights } = aboutData

  return (
    <main className="bg-background">
      <div className="max-w-[100rem] mx-auto flex flex-col md:flex-row md:h-[calc(100vh-125px)]">
        {/* Left section */}
        <div
          className="w-full md:w-[400px] md:h-full md:sticky md:top-0 px-4 sm:px-12 py-12 md:py-20 bg-background 
          bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
          dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]
          bg-[size:14px_24px]"
        >
          <FadeInStagger className="flex flex-col">
            <FadeIn>
              <TextEffect
                per="word"
                preset="fade-in-blur"
                delay={0.1}
                speedReveal={1.5}
                as="h1"
                className="text-4xl font-semibold text-foreground"
              >
                {title}
              </TextEffect>
            </FadeIn>

            <FadeIn>
              {subtitle && <p className="text-base text-muted-foreground">{subtitle}</p>}
            </FadeIn>

            <FadeIn>
              <div className="flex gap-3 mt-6">
                <a href="mailto:ridwansatria@g.ecc.u-tokyo.ac.jp" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
                  <AtSign size={16} />
                </a>
                <a href="https://github.com/riidwansatria" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                  <Github size={16} />
                </a>
                <a href="https://linkedin.com/in/ridwansatria" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                  <Linkedin size={16} />
                </a>
                <a href="https://twitter.com/riidwansatria" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                  <Twitter size={16} />
                </a>
              </div>
            </FadeIn>

            <FadeIn>
              <a className="text-sm text-muted-foreground font-mono hover:underline mt-2"
                href="https://ridwansatria.com/"
              >
                ridwansatria.com
              </a>
            </FadeIn>

            <FadeIn>
              <div className="mt-8">
                <Button asChild variant="outline">
                  <Link
                    href="/Resume_2026_01.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Download />
                    Resume
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </FadeInStagger>
        </div>

        {/* Right section */}
        <div id="about-scroll-container" className="flex-1 flex flex-col gap-12 px-4 sm:px-12 py-12 md:py-20 border-t md:border-t-0 md:border-l overflow-y-auto scrollbar-hide">
          {/* About */}
          <FadeIn delay={0.3}>
            <section>
              <h2 className="text-2xl font-semibold mb-4 pb-2 border-b text-foreground">About</h2>
              <p className="text-sm sm:text-base text-foreground">{bio}</p>
            </section>
          </FadeIn>

          {/* Education */}
          <section>
            <FadeIn delay={0.4}>
              <h2 className="text-2xl font-semibold mb-4 pb-2 border-b text-foreground">Education</h2>
            </FadeIn>
            <FadeInStagger className="space-y-6" delay={0.5}>
              {highlights.education.map((edu, i) => (
                <FadeIn key={i}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg sm:text-xl font-medium text-foreground">{edu.institution}</h3>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-medium text-foreground">{edu.degree}</p>
                  {edu.lab && <p className="text-sm sm:text-base text-muted-foreground">{edu.lab}</p>}
                  {edu.research && (
                    <p className="mt-1 text-sm sm:text-base text-foreground">
                      Research focus: {edu.research}
                    </p>
                  )}
                  {edu.thesis && (
                    <p className="mt-1 text-sm sm:text-base text-foreground">
                      Thesis: {edu.thesis}
                    </p>
                  )}
                </FadeIn>
              ))}
            </FadeInStagger>
          </section>

          {/* Experience */}
          <section>
            <FadeIn delay={0.7}>
              <h2 className="text-2xl font-semibold mb-4 pb-2 border-b text-foreground">Experience</h2>
            </FadeIn>
            <FadeInStagger className="space-y-6" delay={0.8}>
              {highlights.experience.map((job, i) => (
                <FadeIn key={i}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg sm:text-xl font-medium text-foreground">{job.company}</h3>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {job.startDate} – {job.endDate}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-medium text-foreground">{job.role}</p>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    {job.details.map((point, idx) => (
                      <li key={idx} className="text-sm sm:text-base text-foreground">
                        {point}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              ))}
            </FadeInStagger>
          </section>

          {/* Awards & Honors */}
          <section>
            <FadeIn delay={1.1}>
              <h2 className="text-2xl font-semibold mb-4 pb-2 border-b text-foreground">Awards & Honors</h2>
            </FadeIn>
            <FadeInStagger className="space-y-4" delay={1.2}>
              {highlights.awards.map((award, i) => (
                <FadeIn key={i}>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-base sm:text-lg font-medium text-foreground">{award.title}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground"> {award.year}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {award.organization}
                  </div>
                </FadeIn>
              ))}
            </FadeInStagger>
          </section>

          {/* Skills */}
          <FadeIn delay={1.5}>
            <section>
              <h2 className="text-2xl font-semibold mb-4 pb-2 border-b text-foreground">Skills</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-foreground">Languages</h3>
                  <p className="text-sm sm:text-base text-foreground">{highlights.skills.languages.join(", ")}</p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-foreground">Programming</h3>
                  <p className="text-sm sm:text-base text-foreground">{highlights.skills.programming.join(", ")}</p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-foreground">Software</h3>
                  <p className="text-sm sm:text-base text-foreground">{highlights.skills.software.join(", ")}</p>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* Interests */}
          <FadeIn delay={1.6}>
            <section>
              <h2 className="text-2xl font-semibold mb-4 pb-2 border-b text-foreground">Interests</h2>
              <p className="text-sm sm:text-base text-foreground">{highlights.interests.join(", ")}</p>
            </section>
          </FadeIn>
        </div>
      </div>
    </main>
  )
}