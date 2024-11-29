import { Metadata } from "next";
import PageHeader from "@/app/shared/page-header";
import Image from "next/image";

// SEO metadata
export const metadata: Metadata = {
  title: "Team",
};

const pageHeader = {
  title: "Team",
  breadcrumb: [
    {
      href: "/dashboard",
      name: "Dashboard",
    },
    {
      name: "Team",
    },
  ],
};

// Team member data type
interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
}

// Sample team members data
const teamMembers: TeamMember[] = [
  { id: 1, name: "John Doe", position: "CEO", image: "https://img.freepik.com/premium-photo/black-afro-man-smiling-cheerfully-feeling-happy-showing-concept-sunglasses-headphones-concept_1194-385387.jpg?semt=ais_hybrid" },
  { id: 2, name: "Jane Smith", position: "CTO", image: "https://img.freepik.com/premium-photo/portrait-beautiful-african-american-woman-posing-pictures-walking-street_219285-148.jpg?semt=ais_hybrid" },
  { id: 3, name: "Mike Johnson", position: "Design Lead", image: "https://img.freepik.com/premium-photo/closeup-portrait-young-handsome-wellgroomed-african-guy-denim-jacket-studio_88135-50918.jpg?semt=ais_hybrid" },
  { id: 4, name: "Sarah Williams", position: "Product Manager", image: "https://img.freepik.com/free-photo/fashion-portrait-young-stylish-hipster-woman-walking-street-girl-wearing-cute-trendy-outfit-smiling-model-enjoy-her-weekends-travel-with-backpack-female-listening-music-via-headphones_158538-16103.jpg?semt=ais_hybrid" },
  { id: 5, name: "Alex Brown", position: "Senior Developer", image: "https://img.freepik.com/free-photo/man-street-business-concept-guy-with-mobile-phone_1157-48475.jpg?semt=ais_hybrid" },
  { id: 6, name: "Emily Davis", position: "Marketing Director", image: "https://img.freepik.com/free-photo/positive-camouflage-woman-posing-against-white-wall_273609-20332.jpg?semt=ais_hybrid" },
  { id: 7, name: "David Wilson", position: "Sales Manager", image: "https://img.freepik.com/free-photo/happy-african-american-young-man-colorful-shirt-wearing-glasses-looking-camera-smiling-cheerfully_141793-108881.jpg?semt=ais_hybrid" },
  { id: 8, name: "Lisa Garcia", position: "HR Manager", image: "https://img.freepik.com/free-photo/lucky-cheerful-african-american-girl-with-pleased-amused-smile-pointing-sideways-showing-left-right-copy-space-with-astonishment-joy-gladly-promote-cool-offer-indicating-product-banners_176420-35083.jpg?semt=ais_hybrid" },
  { id: 9, name: "Chris Lee", position: "Finance Director", image: "https://img.freepik.com/free-photo/front-view-man-listening-music_23-2148542668.jpg?semt=ais_hybrid" },
  { id: 10, name: "Rachel Kim", position: "Operations Lead", image: "https://img.freepik.com/premium-photo/happy-beautiful-young-black-woman-with-smile-fashionable-casual-jacket-with-jeans-sits-bench-autumn-park-with-yellow-foliage_338491-12137.jpg?semt=ais_hybrid" },
  { id: 11, name: "Tom Harris", position: "Customer Success", image: "https://img.freepik.com/free-photo/smiling-businessman-face-portrait-wearing-suit_53876-148138.jpg?semt=ais_hybrid" },
  { id: 12, name: "Anna Martinez", position: "UX Designer", image: "https://img.freepik.com/free-photo/beautiful-smiling-african-american-female-with-crisp-hair-broad-smile-shows-white-teeth-wears-casual-t-shirt-spectacles-stands-wall-rejoices-having-day-off-woman-journalist-indoor_273609-15511.jpg?semt=ais_hybrid" },
  { id: 13, name: "Ryan Clark", position: "Software Engineer", image: "https://img.freepik.com/free-photo/afro-man_1368-2735.jpg?semt=ais_hybrid" },
  { id: 14, name: "Maria Rodriguez", position: "Data Scientist", image: "https://img.freepik.com/premium-photo/head-shot-smiling-young-african-american-woman-with-blond-afro-hair-wearing-glasses-vertical_411082-220.jpg?semt=ais_hybrid" },
  { id: 15, name: "Kevin Chen", position: "DevOps Engineer", image: "https://img.freepik.com/premium-photo/adult-indian-man-portrait-with-earphones_166273-344.jpg?semt=ais_hybrid" },
  { id: 16, name: "Laura Taylor", position: "Content Strategist", image: "https://img.freepik.com/premium-photo/beautiful-african-girl-walks-park_255667-230.jpg?semt=ais_hybrid" },
  { id: 17, name: "Eric Patel", position: "Business Analyst", image: "https://img.freepik.com/free-photo/close-up-isolated-portrait-young-dark-skinned-attractive-guy-with-afro-hairstyle-grey-t-shirt-brown-jacket-smiling-with-teeth-looking-camera-with-happy-peaceful-face-expression_176420-13082.jpg?semt=ais_hybrid" },
  { id: 18, name: "Sophie Wang", position: "Product Designer", image: "https://img.freepik.com/free-photo/front-view-smiley-woman-posing_23-2148634562.jpg?semt=ais_hybrid" },
  { id: 19, name: "Daniel Murphy", position: "Support Manager", image: "https://img.freepik.com/free-photo/handsome-adult-male-posing_23-2148729714.jpg?semt=ais_hybrid" },
  { id: 20, name: "Olivia Thompson", position: "Growth Strategist", image: "https://img.freepik.com/premium-photo/excited-holding-copy-space-palm_1187-350855.jpg?semt=ais_hybrid" }
];

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      />
      
      <div className="grid grid-cols-4 md:grid-cols-5 gap-6 mt-8">
        {teamMembers.map((member) => (
          <div 
            key={member.id} 
            className="flex flex-col items-center text-center"
          >
            <div className="w-full aspect-square relative mb-2">
              <Image 
                src={member.image} 
                alt={member.name} 
                fill
                className="object-cover rounded-lg shadow-md"
              />
            </div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">
              {member.name}
            </h3>
            <p className="text-xs text-gray-500">
              {member.position}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}