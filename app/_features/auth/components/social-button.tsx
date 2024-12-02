import { Button } from "@/app/_components/ui/button";
import Image from "next/image";

interface SocialButtonProps {
  btnText: string;
  imgPath: string;
  svgSize?: number;
  imgAlt?: string;
}

export const SocialButton = ({
  btnText,
  imgPath,
  imgAlt = "svg-img",
  svgSize = 24,
}: SocialButtonProps) => {
  return (
    <Button className="flex-1 border" variant={"secondary"}>
      <span className="flex items-center gap-3">
        <Image src={imgPath} alt={imgAlt} width={svgSize} height={svgSize} />
        <span> {btnText}</span>
      </span>
    </Button>
  );
};
