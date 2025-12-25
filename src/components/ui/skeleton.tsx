import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-[#E5E5E5]',
        'before:absolute before:inset-0',
        'before:translate-x-[-100%]',
        'before:animate-[shimmer_1.5s_infinite]',
        'before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
        className
      )}
      {...props}
    />
  );
}

function MessageSkeleton({ isUser = false }: { isUser?: boolean }) {
  if (isUser) {
    return (
      <div className="max-w-[480px] w-full ml-auto">
        <div className="flex flex-col gap-2 bg-black/20 py-3 px-4 rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[8px]">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-12 ml-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[480px] w-full">
      <div className="flex flex-col gap-2 bg-[#F0F0F0] py-3 px-4 rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[8px]">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-12 ml-auto" />
      </div>
    </div>
  );
}

function MessageListSkeleton() {
  return (
    <div className="flex-1 flex flex-col justify-end pb-4">
      <div className="flex flex-col gap-4 px-4 max-w-[640px] mx-auto w-full">
        <MessageSkeleton />
        <MessageSkeleton isUser />
        <MessageSkeleton />
      </div>
    </div>
  );
}

export { Skeleton, MessageSkeleton, MessageListSkeleton };
