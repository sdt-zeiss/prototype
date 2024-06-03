import logo from "@/public/landing/logos/InsightsOut-logo-horizontal.svg";
import Image from "next/image";

export function Logo(props: React.ComponentPropsWithoutRef<"svg">) {
  console.log("logo", logo);

  return (
    <div className="flex justify-center">
      <Image src={logo} height={40} alt="Logo InsightsOut" />
    </div>
  );
}
