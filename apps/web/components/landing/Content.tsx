import teamPhoto from "@/public/landing/team_photo.jpg";
import Image from "next/image";

export default function Content() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <Image
              className="absolute inset-0 h-full w-full bg-gray-50 object-cover"
              src={teamPhoto}
              alt=""
            />
          </div>
        </div>
        <div className="px-6 lg:contents">
          <div className="mx-auto max-w-2xl pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Challenge
            </h2>
            <p className="mt-6">
              Established B2B companies often have the challenge of innovating
              in fields that have not been explored yet. This early innovation
              is especially challenging because companies need to consider
              various aspects like current trends. With more knowledge about a
              possible future, they could reduce the risks in early decision
              making. One source of inspiration for such processes can be the
              crowd knowledge found in public spaces, such as museums. For this
              project, we investigated how we can integrate public spaces, in
              particular museums, into the early innovation process of B2B
              companies.
            </p>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Solution
            </h2>
            <p className="mt-6">
              With <span className="font-medium">InsightsOut</span> we created
              an ecosystem that connects different stakeholders from B2B
              companies like innovators and decision-makers, museums like
              curators and artists, as well as the public. The center of{" "}
              <span className="font-medium">InsightsOut</span> is a three-step
              program that consists of panel discussions, a museum exhibition,
              and a web application that enables users to retrieve any knowledge
              generated within the ecosystem. By utilizing a chatbot they can
              gather information that emerged during discussions or was entered
              into the web app by users during or after the visit of the
              exhibition.
            </p>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
              Impact
            </h2>
            <p className="mt-6">
              We enable B2B companies to gain more external perspectives by
              utilizing collective wisdom. They can get insights into current
              societal trends and evaluate whether the decisions they are making
              go in the right direction. Also, they will get a tool with which
              they can easily collect knowledge from a broader audience and
              easily access it afterward. Museums will stay relevant as they
              bring companies that are working on state-of-the-art technologies
              into their environments. Artists benefit from the possibility to
              freely work on artworks contained in the exhibition. Furthermore,
              the public can actively participate in discussions and shape their
              future development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
