import QuotationDetail from './core/components/QuotationDetail';
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ quoteId: string }> }): Promise<Metadata> {
  const { quoteId } = await props.params;
  return {
    title: `견적 ${quoteId}번`,
    description: '견적 상세 정보입니다',
  };
}

export default async function Page(props: { params: Promise<{ quoteId: string }> }) {
  const { quoteId } = await props.params;
  return <QuotationDetail quoteId={quoteId} />;
}
