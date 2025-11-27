import Detail from "@/components/detail/Detail";
import { Router } from "@/router";
import { Link, Stack } from "@chakra-ui/react";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const param = await params;
  return (
    <Stack gap="2">
      <Link href={Router.HOME} mb="2" w="fit-content" variant="plain">
        Redirect to home
      </Link>
      <Detail city={param.slug} />
    </Stack>
  );
}
