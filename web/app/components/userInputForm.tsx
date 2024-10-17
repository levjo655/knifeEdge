import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const App = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black-100">
    <form
      className="bg-white p-8 rounded shadow-md w-full max-w-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {/* Email input */}
      <div className="mb-4">
        <input
          {...register("email")}
          type="text"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        {errors.email && (
          <div className="text-red-500 mt-1">{errors.email.message}</div>
        )}
      </div>

      {/* Password input */}
      <div className="mb-4">
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        {errors.password && (
          <div className="text-red-500 mt-1">{errors.password.message}</div>
        )}
      </div>

      {/* Submit button */}
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </button>

      {/* Root error */}
      {errors.root && (
        <div className="text-red-500 mt-4 text-center">
          {errors.root.message}
        </div>
      )}
    </form>
  </div>
);
};


export default App;
