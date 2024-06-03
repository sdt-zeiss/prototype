import Image from "next/image";

import { Container } from "@/components/landing/Container";

import avatarImageAla from "@/public/landing/avatars/ala.jpg";
import avatarImageAshish from "@/public/landing/avatars/ashish.jpg";
import avatarImageFeli from "@/public/landing/avatars/feli.jpg";
import avatarImageJan from "@/public/landing/avatars/jan.jpg";
import avatarImageJonasB from "@/public/landing/avatars/jonasb.jpg";
import avatarImageJonasS from "@/public/landing/avatars/jonass.jpg";
import avatarImageLucas from "@/public/landing/avatars/lucas.jpg";

const people = [
  {
    name: "Ala Șahada",
    role: "Master's Student in Digital Health",
    imageUrl: avatarImageAla,
    linkedinUrl: "https://www.linkedin.com/in/ala-%C5%9Fahada-b20064155/",
  },
  {
    name: "Ashish Patel",
    role: "Master's Student in Software Systems Engineering",
    imageUrl: avatarImageAshish,
    linkedinUrl: "https://www.linkedin.com/in/ashish-patel-1601/",
  },
  {
    name: "Felicitas Baur",
    role: "Master's Student in Industrial Engineering and Management",
    imageUrl: avatarImageFeli,
    linkedinUrl: "https://www.linkedin.com/in/felicitas-baur/",
  },
  {
    name: "Jan Wohlfarth",
    role: "Master's Student in Industrial Engineering and Management",
    imageUrl: avatarImageJan,
    linkedinUrl: "https://www.linkedin.com/in/janwohlfarth/",
  },
  {
    name: "Jonas Baltruschat",
    role: "Master's Student in Digital Health",
    imageUrl: avatarImageJonasB,
    linkedinUrl: "https://www.linkedin.com/in/jonas-baltruschat-07406b21b/",
  },
  {
    name: "Jonas Scholz",
    role: "Master's Student in Computer Science",
    imageUrl: avatarImageJonasS,
    linkedinUrl: "https://www.linkedin.com/in/jonas-scholz-490274163/",
  },
  {
    name: "Lucas Reisener",
    role: "Master's Student in IT Systems Engineering",
    imageUrl: avatarImageLucas,
    xUrl: "#",
    linkedinUrl: "https://www.linkedin.com/in/lucasreisener/",
  },
];

export function TheTeam() {
  return (
    <section id="team">
      <div className="bg-white py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our team
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We’re a dynamic group of master’s students from the Hasso Plattner
              Institute in Potsdam and the Karlsruhe Institute of Technology. We
              are passionate about technology and innovation, and we are excited
              to bring you InsightsOut
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {people.map((person) => (
              <li key={person.name}>
                <Image
                  className="aspect-square w-full rounded-2xl object-cover"
                  src={person.imageUrl}
                  alt=""
                />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {person.name}
                </h3>
                <p className="text-base leading-7 text-gray-600">
                  {person.role}
                </p>
                <ul role="list" className="mt-6 flex gap-x-6">
                  <li>
                    <a
                      href={person.linkedinUrl}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
