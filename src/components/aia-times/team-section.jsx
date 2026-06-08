import { BASE_URL } from "@/api/base-url";
import OptimizedImage from "@/components/common/optmized-image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Mail, Phone } from "lucide-react";
import { useMemo } from "react";

import { SERVER_NO_IMAGE, getImageBase } from "./aia-times.constants";

export default function TeamSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["aia-times-team"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/getTeamAIATime`);
      return res.data;
    },
  });

  const team = useMemo(() => {
    const imageBase = getImageBase(data, "Team");
    const noImage = getImageBase(data, "No Image") || SERVER_NO_IMAGE;
    return (data?.data || []).map((member) => ({
      id: member.id,
      name: member.team_name,
      type: member.team_type,
      mobile: member.team_mobile,
      email: member.team_email,
      image: member.team_image ? `${imageBase}${member.team_image}` : noImage,
      alt: member.team_image_alt || member.team_name,
    }));
  }, [data]);

  if (isLoading) {
    return (
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
          <div className="h-72 shimmer" />
        </div>
      </section>
    );
  }

  if (isError || !team.length) return null;

  return (
    <section className="bg-[#ECECEC] py-12 md:py-16">
      <div className="mx-auto max-w-340 px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold leading-tight text-black md:text-6xl">
          Team for Your <span className="text-[#F3831C]">Endless Support</span>
        </h2>
        <p className="mt-3 text-base italic text-slate-700 md:text-lg">
          Your support system at AIA - feel free to connect for guidance,
          queries, or assistance.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {team.map((member) => (
            <article key={member.id} className="text-center">
              <OptimizedImage
                src={member.image}
                alt={member.alt}
                width={180}
                height={180}
                className="mx-auto h-32 w-32 rounded-full object-cover"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = SERVER_NO_IMAGE;
                }}
              />
              <h3 className="mt-5 text-xl font-bold text-black">
                {member.name}
              </h3>
              <p className="mt-2 min-h-6 text-sm text-slate-700">
                {member.type}
              </p>
              <div className="mt-4 space-y-3 text-left">
                <a
                  href={`tel:${member.mobile?.replace(/\s+/g, "")}`}
                  className="mx-auto flex min-h-8 w-fit items-center gap-2 text-sm text-black transition-colors hover:text-[#F3831C]"
                >
                  <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#F3831C] text-white">
                    <Phone size={14} />
                  </span>
                  {member.mobile}
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="mx-auto flex min-h-8 w-fit items-center gap-2 break-all text-sm text-black transition-colors hover:text-[#F3831C]"
                >
                  <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#F3831C] text-white">
                    <Mail size={14} />
                  </span>
                  {member.email}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
