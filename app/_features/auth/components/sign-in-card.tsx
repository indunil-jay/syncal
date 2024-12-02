import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { SignInForm } from "./sign-in-form";
import { Separator } from "@/app/_components/ui/separator";
import { SocialButton } from "./social-button";

export const SignInCard = () => {
  return (
    <Card className="w-full py-8 lg:px-20 rounded-none bg-white border-none shadow-none">
      <CardHeader>
        <CardTitle>Welcom Back </CardTitle>
        <CardDescription>
          use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <SignInForm />
        </div>
        <div className="flex items-center gap-3 ">
          <Separator className="flex-1" />
          <span>or</span>
          <Separator className="flex-1" />
        </div>
        <div className="flex gap-6 flex-col lg:flex-row">
          <SocialButton
            btnText="Sign in with Google"
            imgPath="/google.svg"
            imgAlt="googl-svg"
          />
          <SocialButton
            btnText="Sign in with Github"
            imgPath="/github.svg"
            imgAlt="github-svg"
          />
        </div>
        <div className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground font-medium">
            Don&apos;t have an account?{" "}
            <Link href={`/sign-up`} className="text-blue-600">
              Sign Up
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
