import type { Route } from "./+types/home";
import { MemberRepository } from "~/repository/members";
import MyHome from "../pages/myhome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trusted Training Memories" },
    { name: "description", content: "Lets' TTM!" },
  ];
}

// provides `loaderData` to the component
export async function loader({ params }: Route.LoaderArgs) {
  const memberRepository = new MemberRepository();

    let { data,error } = await memberRepository.findAll();

    if (error) {
      throw new Error(error);
    }

    return { members: data};
  }
  
// renders after the loader is done
export default function Home({ loaderData, }: Route.ComponentProps) {
  return (<div>
          <h1>Trusted Training Memories</h1>
          <MyHome members={loaderData.members} />
        </div>);
}


