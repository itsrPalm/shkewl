import { onSignInUser } from "@/actions/auth";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CompleteSigIn = async () => {
  const user = await currentUser();

  console.log("USER[SIGNINCALLBACK]: ", user);
  if (!user) return redirect("/sign-in");

  const authenticated = await onSignInUser(user.id);
  console.log("SIGNIN USER[SIGNINCALLBACK]: ", user);

  if (authenticated.status === 200) return redirect(`/group/create`);

  if (authenticated.status === 207)
    return redirect(
      `/group/${authenticated.groupId}/channel/${authenticated.channelId}`,
    );

  if (authenticated.status !== 200) {
    redirect("/sign-in");
  }
};

export default CompleteSigIn;

// import { onSignInUser } from "@/actions/auth"
// import { currentUser } from "@clerk/nextjs/server"
// import { redirect } from "next/navigation"

// const CompleteSigIn = async () => {
//   const user = await currentUser()
//   if (!user) return redirect("/sign-in")

//   const authenticated = await onSignInUser(user.id)

//   if (authenticated.status === 200) {
//     return redirect(
//       process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || "/group/create",
//     )
//   }

//   if (authenticated.status === 207) {
//     return redirect(
//       `/group/${authenticated.groupId}/channel/${authenticated.channelId}`,
//     )
//   }

//   return redirect("/sign-in")
// }

// export default CompleteSigIn
