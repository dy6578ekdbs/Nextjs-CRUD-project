'use client';

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

export default function DetailLink() {
  let router = useRouter();
  let url = usePathname();
  let queryString = useSearchParams();
  let dynamic = useParams();

  return (
    <button
      onClick={() => {
        router.back();
      }}
    >
      버튼
    </button>
  );
}
