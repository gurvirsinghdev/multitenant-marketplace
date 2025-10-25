import { Checkbox } from "@/components/ui/checkbox";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

interface Props {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

export default function TagsFilter(props: Props) {
  const trpc = useTRPC();
  const getTagsQuery = useInfiniteQuery(
    trpc.tags.getTags.infiniteQueryOptions(
      { limit: 10 },
      {
        getNextPageParam: (lastPage) =>
          lastPage.docs.length > 0 ? lastPage.nextPage : undefined,
      },
    ),
  );

  const onClick = (tag: string) => {
    if (props.value?.includes(tag)) {
      props.onChange(props.value?.filter((t) => t !== tag) || []);
    } else {
      props.onChange([...(props.value || []), tag]);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {getTagsQuery.isLoading ? (
        <div className="flex items-center justify-center p-4">
          <LoaderIcon className="size-4 animate-spin" />
        </div>
      ) : (
        getTagsQuery.data?.pages?.map((page) =>
          page.docs.map((tag) => (
            <div
              key={tag.id}
              onClick={() => onClick(tag.name)}
              className="flex items-center justify-between cursor-pointer"
            >
              <p className="font-medium">{tag.name}</p>
              <Checkbox
                checked={props.value?.includes(tag.name)}
                onCheckedChange={() => onClick(tag.name)}
              />
            </div>
          )),
        )
      )}

      {getTagsQuery.hasNextPage && (
        <button
          disabled={getTagsQuery.isFetchingNextPage}
          onClick={() => getTagsQuery.fetchNextPage()}
          className="undelrine font-medium justify-start text-start disabled:opacity-50"
        >
          Load more...
        </button>
      )}
    </div>
  );
}
