import QuotationDetail from './core/components/QuotationDetail';

interface PageProps {
  params: { quoteId: string };
}

export default function Page({ params }: PageProps) {
  return <QuotationDetail quoteId={params.quoteId} />;
}
