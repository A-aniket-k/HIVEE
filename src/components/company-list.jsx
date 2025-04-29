import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteCompany } from "@/api/apiCompanies";

const CompanyList = ({ companies, onDelete }) => {
  const {
    loading: loadingDelete,
    error: errorDelete,
    fn: fnDeleteCompany,
  } = useFetch(deleteCompany);

  const handleDelete = async (companyId) => {
    await fnDeleteCompany(companyId);
    onDelete();
  };

  return (
    <div className="space-y-2">
      {companies.map((company) => (
        <div 
          key={company.id} 
          className="flex items-center justify-between p-2 border rounded"
        >
          <div className="flex items-center gap-2">
            <img 
              src={company.logo_url} 
              alt={company.name} 
              className="w-8 h-8 object-cover rounded"
            />
            <span>{company.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(company.id)}
            disabled={loadingDelete}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}
      {errorDelete && (
        <p className="text-red-500">Error deleting company</p>
      )}
    </div>
  );
};

export default CompanyList;