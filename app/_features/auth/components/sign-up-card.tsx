import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { SocialButton } from "./social-button";
import { SignUpForm } from "./sign-up-form";
import Link from "next/link";

export const SignUpCard = () => {
  return (
    <Card className="w-full py-8 lg:px-20 rounded-none bg-white border-none shadow-none">
      <CardHeader>
        <CardTitle>Create An Account</CardTitle>
        <CardDescription>
          welcome to syncal &mdash; Let&apos;s create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <SignUpForm />

        <div className="flex items-center gap-3 ">
          <Separator className="flex-1" />
          <span>or</span>
          <Separator className="flex-1" />
        </div>
        <div className="flex gap-6 flex-col lg:flex-row">
          <SocialButton
            btnText="Sign up with Google"
            imgPath="/google.svg"
            imgAlt="googl-svg"
          />
          <SocialButton
            btnText="Sign up with Github"
            imgPath="/github.svg"
            imgAlt="github-svg"
          />
        </div>
        <div className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground font-medium">
            Already have an account?{" "}
            <Link href={`/sign-in`} className="text-blue-600">
              Sign In
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
