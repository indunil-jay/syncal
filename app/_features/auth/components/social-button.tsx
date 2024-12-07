"use client";
import { Button } from "@/app/_components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Image from "next/image";

interface SocialButtonProps {
  btnText: string;
  imgPath: string;
  svgSize?: number;
  imgAlt?: string;
  provider: "google" | "github";
}

export const SocialButton = ({
  btnText,
  imgPath,
  imgAlt = "svg-img",
  svgSize = 24,
  provider,
}: SocialButtonProps) => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <Button
      className="flex-1 border"
      variant={"secondary"}
      onClick={() => onClick(provider)}
    >
      <span className="flex items-center gap-3">
        <Image src={imgPath} alt={imgAlt} width={svgSize} height={svgSize} />
        <span> {btnText}</span>
      </span>
    </Button>
  );
};
