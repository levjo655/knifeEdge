import { ActionFunctionArgs, json, LoaderFunction } from "@remix-run/node";
import React, { useState } from "react";
import { mongodb } from "~/lib/mongoDb.server";
import { Knife } from "../home._index/types";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import logo from "~/Images/knifeEdgeLogo.png";
import {
  getValidatedFormData,
  parseFormData,
  useRemixForm,
} from "remix-hook-form";
import { ObjectId } from "mongodb";
import { Button } from "~/components/ui/button";
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
    <>
      <div className="min-h-dvh w-full flex flex-col justify-center items-center p-6">
        <img
          src={logo}
          alt="Knife Edge Logo"
          className="w-32 h-32 mx-auto mb-6"
        />
        <h1 className="text-2xl font-semibold mb-4">All Knives</h1>
        <Card>
          <CardHeader>
            <CardTitle>All Knives</CardTitle>
            <CardContent>
              <div className="flex flex-col gap-4">
                {knives.map((x, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg shadow bg-gray-50 hover:bg-gray-100 border border-gray-300 flex flex-col"
                  >
                    <div className="font-semibold text-lg text-blue-600">
                      {x.name}
                    </div>
                    <div className="text-gray-700">{x.type}</div>
                    <div className="text-gray-700">{x.length}</div>
                    <Form method="post">
                      <input
                        type="hidden"
                        name="intent"
                        value="removeFromInventory"
                      />
                      <input type="hidden" name="knifeId" value={x._id} />
                      <Button type="submit">Delete knife </Button>
                    </Form>
                  </div>
                ))}
              </div>
            </CardContent>
          </CardHeader>
        </Card>
        <Dialog open={isOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Create knife
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Form onSubmit={handleSubmit} method="POST">
              <DialogHeader>
                <DialogTitle>Create knife</DialogTitle>
                <DialogDescription>
                  Here you can create a new knife
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Name</Label>
                  <Input {...register("name")} />
                </div>
                <div className="grid gap-2">
                  <Label>Knife type </Label>
                  <Select
                    value={watch("type")}
                    onValueChange={(value) => setValue("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="" />
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
    </>
  );
};

export default Page;
