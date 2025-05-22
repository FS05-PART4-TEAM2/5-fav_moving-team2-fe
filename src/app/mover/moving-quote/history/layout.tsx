import { TabBarLayout } from '@/shared/components/Layout/TabBarLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <TabBarLayout>{children}</TabBarLayout>;
}
