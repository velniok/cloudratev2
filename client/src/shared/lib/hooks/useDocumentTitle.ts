import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title + ' | CloudRate';

    return () => {
        document.title = 'CloudRate';
    }
  }, [title]);
}