import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

interface Note {
  id: string;
  title: string;
  description: string;
}

const NotePage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const handleUserAuth = async (user: any) => {
    if (user) {
      setUser(user);

      try {
        await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.uid,
            email: user.email,
          }),
        });

        const response = await fetch(`/api/notes?userId=${user.uid}`);
        if (response.ok) {
          const data = await response.json();
          setNotes(data.notes);
        } else {
          console.error("Failed to fetch notes:", response.statusText);
        }
      } catch (error) {
        console.error(
          "Error during authentication or fetching notes:",
          (error as Error).message
        );
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      handleUserAuth(user);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {notes.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center p-6 rounded-md border border-dashed text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <File className="w-8 h-8 text-primary" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">
              You don&apos;t have any notes created
            </h2>
            <p className="my-4 text-sm text-muted-foreground">
              You currently don&apos;t have any notes. Please create some to see
              them here.
            </p>
            <Button asChild className="w-full">
              <Link href="/new">Create a new Note</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="p-8 pt-[15vh]">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold">Your Notes</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Manage and create new notes here.
              </p>
              <Button asChild className="mt-4">
                <Link href="/new">Create a new Note</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 pl-[2vh] pr-[2vh] justify-center pb-[10vh]">
            {notes.map((note) => (
              <Card key={note.id} className="w-[350px]">
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                </CardHeader>
                <CardContent>{note.description}</CardContent>
                <CardFooter></CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotePage;
