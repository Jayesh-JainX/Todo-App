import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { redirectHome } from "../components/Rediect";

export default function NewNoteRoute() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState<User | null>(null); // Provide correct type annotation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Use currentUser instead of user
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, userId: user.uid }),
      });

      if (response.ok) {
        return redirectHome();
      } else {
        console.error("Failed to create note:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>New Note</CardTitle>
            <CardDescription>Create your new note here</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                required
                type="text"
                name="title"
                id="title"
                placeholder="Title for your note"
                className="w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Describe your note"
                required
                className="w-full h-[32vh] p-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between space-x-4">
            <Button asChild variant="destructive">
              <Link href="/">Cancel</Link>
            </Button>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
