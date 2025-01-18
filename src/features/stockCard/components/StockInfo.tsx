import { CompanyProfile } from '@/components/AddTransactionForm/companyProfileSchema';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

type StockInfoProps = {
  companyProfile: CompanyProfile;
};

export const StockInfo = ({ companyProfile }: StockInfoProps) => {
  const companyInfo = [
    { label: 'Ticker symbol', value: companyProfile.symbol },
    { label: 'ISIN', value: companyProfile.isin },
    { label: 'Sektor', value: companyProfile.sector },
    { label: 'Průmyslové odvětví', value: companyProfile.industry },
  ];

  return (
    <Card className="p-6">
      <CardHeader className="px-0 pb-10 text-center md:text-left">
        <CardTitle className="">Informace o společnosti</CardTitle>
      </CardHeader>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-1">
          <Table className="w-full border-collapse text-sm md:w-[80%]">
            <TableBody>
              {companyInfo.map((item, index) => (
                <TableRow
                  key={index}
                  className="transition-colors hover:bg-gray-100"
                >
                  <TableCell className="mx-0 px-0 py-2 font-medium text-muted-foreground">
                    {item.label}
                  </TableCell>
                  <TableCell className="py-2 text-muted-foreground">
                    {item.value || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex-1">
          <h2 className="text-md mb-2 font-medium text-muted-foreground">
            Popis
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {companyProfile.description || 'Popis není k dispozici.'}
          </p>
        </div>
      </div>
    </Card>
  );
};
