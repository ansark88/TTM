

export default function MyHome({ members }) {
return <p>{members.map((member) => member.name)}</p>;
}
