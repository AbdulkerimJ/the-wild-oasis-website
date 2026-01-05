import { auth } from "../_lib/auth";

export const metadata = {
  title: "Login",
  description: "Manage your account settings and preferences.",
};

const page = async () => {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <div>
      {" "}
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Wellcome, {firstName}!
      </h2>
    </div>
  );
};

export default page;
