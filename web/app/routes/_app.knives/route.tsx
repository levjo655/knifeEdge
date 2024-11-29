import { ActionFunctionArgs, json, LoaderFunction } from "@remix-run/node";
import React, { useState } from "react";
import { mongodb } from "~/lib/mongoDb.server";
import { Knife } from "../_app.home._index/types";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import logo from "~/Images/knifeEdgeLogo.png";
import {
  getValidatedFormData,
  parseFormData,
  useRemixForm,
} from "remix-hook-form";
import { ObjectId } from "mongodb";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Header from "~/components/Header";
import { requireUser } from "~/session/guards.server";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { cn } from "~/lib/utils";

const schema = z.object({
  intent: z.literal("createKnife").default("createKnife"),
  name: z.string(),
  type: z.string(),
  length: z.string(),
});

type FormData = z.infer<typeof schema>;
const resolver = zodResolver(schema);

// Loader function to fetch all knives from the "knives" collection
export const loader: LoaderFunction = async () => {
  const knives = await mongodb
    .db("knifeEdgeRemix")
    .collection<Knife>("knives")
    .find()
    .toArray();

  return json({
    knives: knives,
  });
};

// Action function to handle adding and removing knives from inventory
export async function action({ request }: ActionFunctionArgs) {
  await requireUser(request);
  const formData = await parseFormData<{
    intent: "removeFromInventory" | "createKnife";
    knifeId: string;
  }>(request.clone());

  switch (formData.intent) {
    case "createKnife": {
      const {
        errors,
        data,
        receivedValues: defaultValues,
      } = await getValidatedFormData<FormData>(request, resolver);
      if (errors) {
        return json({ errors, defaultValues });
      }

      const result = await mongodb
        .db("knifeEdgeRemix")
        .collection("knives")
        .insertOne({
          name: data.name,
          length: data.length,
          type: data.type,
        });

      return json({ message: "knife was created" });
    }
    case "removeFromInventory": {
      const knife = await mongodb
        .db("knifeEdgeRemix")
        .collection("knives")
        .deleteOne({ _id: new ObjectId(formData.knifeId) });

      return json({});
    }
  }
}

export const Page = () => {
  const { knives } = useLoaderData<typeof loader>();
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    defaultValues: {
      type: "Stainless",
    },
    resolver,
  });

  console.log(errors);

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6 ">
      <img
        src={logo}
        alt="Knife Edge Logo"
        className="w-32 h-32 mx-auto mb-8"
      />

      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Knifes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {knives.map((knife, index) => (
          <div
            key={index}
            className="flex flex-col items-start p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow border border-gray-200"
          >
            {/* <div className="w-full h-32 bg-gray-100 flex items-center justify-center rounded-lg mb-4">
                <span className="text-gray-500 text-sm">
                  No Image Available
                </span>
              </div> */}

            <div className="flex-grow w-full">
              <h2 className="text-lg font-semibold text-gray-800">
                {knife.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Type: <span className="font-medium">{knife.type}</span>
              </p>
              <p className="text-sm text-gray-600">
                Length: <span className="font-medium">{knife.length} cm</span>
              </p>
            </div>

            {/* Actions */}
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="destructive" size="icon">
                  <Trash />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <Form method="post">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You cannot regret this action
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <input
                    type="hidden"
                    name="intent"
                    value="removeFromInventory"
                  />
                  <input type="hidden" name="knifeId" value={knife._id} />
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className={cn(buttonVariants({ variant: "destructive" }))}
                      type="submit"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </Form>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>

      {/* Add Knife Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
            className="mt-8"
          >
            Add New Knife
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form onSubmit={handleSubmit} method="POST">
            <DialogHeader>
              <DialogTitle>Create Knife</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new knife.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input {...register("name")} />
              </div>
              <div className="grid gap-2">
                <Label>Knife Type</Label>
                <Select
                  value={watch("type")}
                  onValueChange={(value) => setValue("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Knife Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Stainless">Stainless</SelectItem>
                    <SelectItem value="Carbon">Carbon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Knife Length (cm)</Label>
                <Input {...register("length")} />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)} type="submit">
                Create
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
