"use client";

import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <header>
        Convex + Next.js + Clerk
        <SignInAndSignUpButtons />
      </header>
      <main>
        <h1>Convex + Next.js + Clerk Auth</h1>
        <Authenticated>
          <SignedInContent />
        </Authenticated>
        <Unauthenticated>
          <p>Click one of the buttons in the top right corner to sign in.</p>
        </Unauthenticated>
      </main>
    </>
  );
}

function SignInAndSignUpButtons() {
  return (
    <div>
      <Authenticated>
        <UserButton afterSignOutUrl="#" />
      </Authenticated>
      <Unauthenticated>
        <SignInButton mode="modal">
          <button>Sign in</button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button>Sign up</button>
        </SignUpButton>
      </Unauthenticated>
    </div>
  );
}

function SignedInContent() {
  const createVision = useMutation(api.vision.createVisionBoard);

  return (
    <>
      <h2>Your Vision Board</h2>
      <Button
        onClick={() =>
          createVision({
            name: "My Vision Board",
          })
        }
      >
        Create a Vision Board
      </Button>
    </>
  );
}
