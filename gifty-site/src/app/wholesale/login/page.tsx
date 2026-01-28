import WholesaleLoginClient from "./WholesaleLoginClient";

type SearchParams = Record<string, string | string[] | undefined>;

export default function WholesaleLoginPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const nextParam = searchParams?.next;
  const next =
    typeof nextParam === "string" && nextParam.trim().length > 0
      ? nextParam
      : "/wholesale";

  return <WholesaleLoginClient nextUrl={next} />;
}
